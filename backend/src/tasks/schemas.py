from datetime import datetime
from pydantic import BaseModel


class AddTask(BaseModel):
    name: str
    description: str
    tags: str


class OperationCreate(BaseModel):
    id: int
    date: datetime
    type: str


class TaskCreate(BaseModel):
    name: str
    description: str
    date: datetime
    priority: str
