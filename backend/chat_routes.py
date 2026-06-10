from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database import get_db

from models import ChatSession
from models import Message
from schemas import CreateChatSession

router = APIRouter()

@router.post("/chat")
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):

    user_message = Message(
        session_id=request.session_id,
        role="user",
        content=request.question
    )

    db.add(user_message)

    db.commit()

    result = ask_question(
        collection_id=request.collection_id,
        question=request.question
    )

    ai_message = Message(
        session_id=request.session_id,
        role="assistant",
        content=result["answer"]
    )

    db.add(ai_message)

    db.commit()

    return result

@router.get("/chat-sessions")
def get_chat_sessions(
    db: Session = Depends(get_db)
):

    return db.query(
        ChatSession
    ).all()


@router.get("/messages/{session_id}")
def get_messages(
    session_id: int,
    db: Session = Depends(get_db)
):

    return db.query(Message).filter(
        Message.session_id == session_id
    ).all()