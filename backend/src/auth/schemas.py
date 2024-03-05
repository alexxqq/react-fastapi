from fastapi_users import schemas, models
from pydantic import EmailStr
from typing import Optional


class UserRead(schemas.BaseUser[int]):
    id: models.ID
    username: str
    email: EmailStr
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    class Config:
        orm_mode = True


class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    username: str
    password: str
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False


class UserUpdate(schemas.BaseUserUpdate):
    pass
