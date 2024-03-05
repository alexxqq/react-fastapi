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
This project is a full-stack web application that combines FastAPI on the backend and React Vite (TypeScript) on the frontend. It includes CRUD functionality for managing resources and a real-time chat feature. PostgreSQL is used as the database, and SQLAlchemy is the ORM. User authentication is implemented using FastAPI Users.

## Features
- User authentication and authorization
- CRUD operations for managing resources
- Real-time chat functionality

## Setup

### Backend (FastAPI)
1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/fastapi-react-vite-crud-chat.git
    ```

2. **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```

3. **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

4. **Activate the virtual environment:**
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```

5. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

6. **Set up the database:**
    ```bash
    alembic upgrade head
    ```

7. **Run the FastAPI server:**
    ```bash
    uvicorn main:app --reload
    ```

### Frontend (React Vite)
1. **Navigate to the `frontend` directory:**
    ```bash
    cd frontend/src
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the React Vite development server:**
    ```bash
    npm run dev
    ```

## Usage
1. Open your browser and go to `http://localhost:5173` to access the React Vite application.
2. The FastAPI server is running at `http://localhost:8000/docs` for API documentation.

## API Endpoints
- `/auth/login`: Login user
- `/auth/logout`: Logout user
- `/auth/register`: Register user
- `/tasks`: Get all tasks
- `/tasks/add_task`: Add a new task
- `/tasks/verify`: Verify user
- `/tasks/search/{query}`: Search by name
- `/tasks/delete/{id}`: Delete by ID
- `/tasks/update/{id}`: Update task
- `/tasks/getone/{id}`: Get a specific task
- `/chat/last_messages`: Get chat messages from the database
