from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database import get_db

from models import Collection

from schemas import CollectionCreate

router = APIRouter()

@router.post("/collections")
def create_collection(
    collection: CollectionCreate,
    db: Session = Depends(get_db)
):

    new_collection = Collection(
        name=collection.name,
        description=collection.description,
        user_id=1
    )

    db.add(new_collection)

    db.commit()

    db.refresh(new_collection)

    return new_collection

@router.get("/collections")
def get_collections(
    db: Session = Depends(get_db)
):

    return db.query(Collection).all()