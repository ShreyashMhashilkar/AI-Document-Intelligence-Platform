from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from sqlalchemy.orm import Session

from database import get_db
from models import Document
from rag import process_pdf
import shutil
import os
from schemas import ChatRequest
from rag import ask_question
router = APIRouter()


@router.post("/upload/{collection_id}")
def upload_document(
    collection_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    upload_dir = "uploads"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_dir,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    document = Document(
        filename=file.filename,
        file_path=file_path,
        collection_id=collection_id
    )

    db.add(document)

    db.commit()

    db.refresh(document)
    if file.filename.endswith(".pdf"):

        process_pdf(
        file_path=file_path,
        document_id=document.id,
        collection_id=collection_id
        )

    return {
        "message": "File uploaded successfully",
        "document_id": document.id
    }

@router.post("/chat")
def chat(
    request: ChatRequest
):

    return ask_question(
        collection_id=request.collection_id,
        question=request.question
    )

@router.get("/documents/{collection_id}")
def get_documents(
    collection_id: int,
    db: Session = Depends(get_db)
):

    return db.query(Document).filter(
        Document.collection_id == collection_id
    ).all()

@router.get("/documents")
def get_all_documents(
    db: Session = Depends(get_db)
):

    return db.query(
        Document
    ).all()