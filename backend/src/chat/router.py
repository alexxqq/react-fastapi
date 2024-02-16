from typing import List
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession
from auth.base_config import fastapi_users
from chat.models import Messages
from chat.schemas import MessagesModel
from database import  async_session_maker, get_async_session

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)
current_user = fastapi_users.current_user()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, add_to_db: bool):
        if add_to_db:
            await self.add_messages_to_database(message)
        for connection in self.active_connections:
            await connection.send_text(message)

    @staticmethod
    async def add_messages_to_database(message: str):
        async with async_session_maker() as session:
            stmt = insert(Messages).values(
                message=message
            )
            await session.execute(stmt)
            await session.commit()


manager = ConnectionManager()


@router.get("/last_messages")
async def get_last_messages(
        session: AsyncSession = Depends(get_async_session),
) -> List[MessagesModel]:
    query = select(Messages).order_by(Messages.id.asc())
    messages = await session.execute(query)
    return messages.scalars().all()


@router.websocket("/ws/{user_email}")
async def websocket_endpoint(websocket: WebSocket, user_email: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"{user_email} says: {data}", add_to_db=True)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        #await manager.broadcast(f"{user_email} left the chat", add_to_db=False)