from langchain_community.document_loaders import PyPDFLoader

from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

from langchain_ollama import (
    OllamaEmbeddings
)

from langchain_chroma import Chroma
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from models import Message
embeddings = OllamaEmbeddings(
    model="nomic-embed-text"
)

vector_store = Chroma(
    collection_name="documents",
    embedding_function=embeddings,
    persist_directory="./chroma_db"
)

def process_pdf(
    file_path: str,
    document_id: int,
    collection_id: int
):

    loader = PyPDFLoader(
        file_path
    )

    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = splitter.split_documents(
        docs
    )

    for chunk in chunks:

        chunk.metadata["document_id"] = document_id

        chunk.metadata["collection_id"] = collection_id

    vector_store.add_documents(
        chunks
    )
    print(
    f"Stored {len(chunks)} chunks"
    )

    print(
        f"Total vectors: {vector_store._collection.count()}"
    )

llm = ChatOllama(
    model="llama3",
    temperature=0
)

def ask_question(
    collection_id: int,
    question: str
):

    results = vector_store.similarity_search(
    question,
    k=4,
    filter={
        "collection_id": collection_id
    }
)

    context = "\n\n".join(
        [doc.page_content for doc in results]
    )

    prompt = ChatPromptTemplate.from_template(
        """
        Answer the question using only the provided context.

        If the answer is not present in the context,
        say "I could not find that information in the uploaded documents."

        Context:
        {context}

        Question:
        {question}
        """
    )

    chain = prompt | llm

    response = chain.invoke(
        {
            "context": context,
            "question": question
        }
    )

    unique_sources = {}

    for doc in results:

        key = (
            doc.metadata.get("source"),
            doc.metadata.get("page")
        )

        unique_sources[key] = {
            "file_name": doc.metadata.get("source"),
            "page": doc.metadata.get("page")
        }

    sources = list(unique_sources.values())

    return {
        "answer": response.content,
        "sources": sources
    }