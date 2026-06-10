# AI Document Intelligence Platform

AI-powered document intelligence platform built using React.js, FastAPI, LangChain, ChromaDB, PostgreSQL, Ollama, and Docker. The platform enables users to upload documents, create knowledge collections, and interact with their content through Retrieval-Augmented Generation (RAG), semantic search, and conversational AI.

## Features

* Document Upload and Management
* Collection-Based Knowledge Organization
* Retrieval-Augmented Generation (RAG)
* Semantic Search using Vector Embeddings
* Conversational Document Q&A
* Source Citation and Reference Tracking
* Chat Session Management
* ChromaDB Vector Storage
* PostgreSQL Data Persistence
* Dockerized Full-Stack Deployment

## Tech Stack

### Frontend

* React.js
* Material UI
* Axios

### Backend

* FastAPI
* Python
* LangChain
* Ollama

### Database

* PostgreSQL
* SQLAlchemy

### Vector Database

* ChromaDB

### DevOps

* Docker
* Docker Compose
* GitHub

## Workflow

1. Users create document collections.
2. Documents are uploaded and processed.
3. Text is extracted and split into chunks.
4. Chunks are converted into vector embeddings.
5. Embeddings are stored in ChromaDB.
6. User questions trigger semantic retrieval.
7. Relevant document context is passed to Ollama.
8. AI-generated answers are returned with source references.

## Architecture

```text
React.js Frontend
        │
        ▼
FastAPI Backend
        │
        ▼
Document Processing Pipeline
        │
        ▼
Text Extraction
        │
        ▼
Chunking Strategy
        │
        ▼
Vector Embeddings
        │
        ▼
ChromaDB Vector Store
        │
        ▼
Semantic Retrieval
        │
        ▼
Ollama LLM
        │
        ▼
Context-Aware Response Generation
```

## Running with Docker

### Clone Repository

```bash
git clone https://github.com/ShreyashMhashilkar/AI-Document-Intelligence-Platform.git

cd ai-document-intelligence-platform
```

### Pull Ollama Model

```bash
ollama pull llama3
```

### Start Application

```bash
docker compose up --build
```

### Access Application

Frontend:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:8000/docs
```

## Author

Shreyash Mhashilkar

