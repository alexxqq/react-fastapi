from fastapi import Depends, FastAPI, Cookie
from tasks.router import router as tasks_router
from pydantic import BaseModel, Field
from typing import List, Optional
from fastapi import FastAPI, APIRouter
from fastapi_users import FastAPIUsers, fastapi_users
from auth.base_config import auth_backend, fastapi_users
from auth.manager import get_user_manager
from auth.schemas import UserCreate, UserRead
from database import User
from redis import asyncio as aioredis
from fastapi import FastAPI
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from chat.router import router as router_chat
from tasks.router import router as tasks_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    print('start')
    yield
    print('end')

app = FastAPI(title='FastAPI Study', lifespan=lifespan)
origins = ["http://localhost:5173",
           "http://localhost:5174",
           "http://localhost:8000",
           "http://127.0.0.1:5173",
           "http://127.0.0.1:5174",
           "http://51.20.6.182"
           ]

current_user = fastapi_users.current_user()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth",
    tags=["Auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["Auth"],
)


app.include_router(router_chat)
app.include_router(tasks_router)
#ahahahhah zalupa develop reset
