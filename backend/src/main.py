from fastapi import  FastAPI
from tasks.router import router as tasks_router
from fastapi import FastAPI
from fastapi_users import  fastapi_users
from auth.base_config import auth_backend, fastapi_users
from auth.schemas import UserCreate, UserRead
from fastapi import FastAPI
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
           "http://51.20.6.182",
           "https://51.20.60.12",
           "http://51.20.60.12",
           "http://deployment.pp.ua",
           "https://deployment.pp.ua",
           "https://alexxqqq.space",
           "http://alexxqqq.space",
           "https://back.api.kubernetis.fun",
           "http://back.api.kubernetis.fun",
           ]

current_user = fastapi_users.current_user()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET","POST","OPTIONS","HEAD","PUT","PATCH","DELETE"],
    allow_headers=["Access-Control-Allow-Headers",
                   'Content-Type',
                   'Authorization',
                   'Access-Control-Allow-Origin',
                   "Set-Cookie"],
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
#pipeline v4
