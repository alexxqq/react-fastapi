# FastAPI + React Vite (TypeScript) CRUD & Chat Application

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
  - [Backend (FastAPI)](#backend-fastapi)
  - [Frontend (React Vite)](#frontend-react-vite)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Overview
This project is a full-stack web application that combines FastAPI on the backend and React Vite (TypeScript) on the frontend. It includes CRUD functionality for managing resources and a real-time chat feature. PostgreSQL is used as the database, and SQLAlchemy is the ORM. FastAPI Users provides user authentication.

## Features
- User authentication and authorization
- CRUD operations for managing resources
- Real-time chat functionality

## Setup

### Backend (FastAPI)
1. Clone the repository: `git clone https://github.com/yourusername/fastapi-react-vite-crud-chat.git`
2. Navigate to the `backend` directory: `cd backend`
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
    - On Windows: `venv\Scripts\activate`
    - On macOS/Linux: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Set up the database: `alembic upgrade head`
7. Run the FastAPI server: `uvicorn main:app --reload`

### Frontend (React Vite)
1. Navigate to the `frontend` directory: `cd frontend/src`
2. Install dependencies: `npm install`
3. Start the React Vite development server: `npm run dev`

## Usage
1. Open your browser and go to `http://localhost:3000` to access the React Vite application.
2. The FastAPI server is running at `http://localhost:8000/docs` for API documentation and `http://localhost:8000/redoc` for a user-friendly documentation interface.

## API Endpoints
- `/api/users`: User registration, login, and profile retrieval
- `/api/resources`: CRUD operations for managing resources
- `/api/chat`: Real-time chat functionality
