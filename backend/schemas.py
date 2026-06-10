from pydantic import BaseModel
from pydantic import EmailStr


class UserRegister(BaseModel):

    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):

    email: EmailStr
    password: str


class TokenResponse(BaseModel):

    access_token: str
    token_type: str

class CollectionCreate(BaseModel):

    name: str

    description: str | None = None


class QuestionRequest(BaseModel):

    question: str



class CreateChatSession(BaseModel):

    title: str

    collection_id: int

class MessageResponse(BaseModel):

    role: str

    content: str

class ChatRequest(BaseModel):

    collection_id: int

    question: str

