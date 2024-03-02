from datetime import datetime
from .schemas import AddTask
from sqlalchemy import select, delete as delete_sql
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends
from database import User, get_async_session
from auth.base_config import fastapi_users
from .models import Task, Tag, Task_Tag
import json
router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

current_user = fastapi_users.current_user()


@router.get('/')
async def get_tasks(session: AsyncSession = Depends(get_async_session)):
    query = select(Task, User.email, User.id, User.username, Task_Tag.tag_id, Tag.tag_name).\
        join(User).\
        outerjoin(Task_Tag, Task.id == Task_Tag.task_id).\
        outerjoin(Tag, Task_Tag.tag_id == Tag.id)

    result = await session.execute(query)

    rows = result.fetchall()
    tasks = []
    for task, user_email, user_id, username, tag_id, tag_name in rows:
        # If the task is not already in the tasks list, add it
        if task.id not in {t.id for t in tasks}:
            task.user = {'username': username,
                         'email': user_email, 'id': user_id}
            task.tag = []  # Initialize the tag list for the task
            tasks.append(task)

        # If there is a tag for the current row, add it to the task's tag list
        if tag_id is not None:
            tasks[-1].tag.append(tag_name)

    return tasks


@router.post('/add_task')
async def add_task(task: AddTask, user: User = Depends(current_user), session: AsyncSession = Depends(get_async_session)):
    print('add task: ',task)
    tags = task.tags
    name = task.name
    description = task.description

    tag_names = [i for i in tags.split(' ') if len(i)]
    # List to store Tag objects associated with the task
    tag_objects = []

    for tag_name in tag_names:
        # Check if the tag already exists in the database
        tag = await session.execute(select(Tag).filter(Tag.tag_name == tag_name))
        tag = tag.scalar_one_or_none()

        if not tag:
            # If the tag doesn't exist, create a new one
            tag = Tag(tag_name=tag_name)
            session.add(tag)
            await session.flush()

        tag_objects.append(tag)

    new_task = Task(name=name, description=description,
                    date=datetime.now().date(), user_id=user.id)
    session.add(new_task)
    await session.flush()

    # Manually link the task with tags in the Task_Tag linking table!
    for tag in tag_objects:
        task_tag_entry = Task_Tag(tag_id=tag.id, task_id=new_task.id)
        session.add(task_tag_entry)
    await session.commit()

    return {'status': 'success'}


@router.get('/verify')
def verify(user: User = Depends(current_user)):

    data = {'username': user.username, 'email': user.email, 'id': user.id}

    return data


@router.get('/search/{query}')
async def search(query: str, session: AsyncSession = Depends(get_async_session)):
    query = select(Task).where(Task.name == query)
    result = await session.execute(query)
    rows = result.fetchall()
    rows = [i[0] for i in rows]

    return rows


@router.delete('/{id}')
async def delete(id: int, user: User = Depends(current_user), session: AsyncSession = Depends(get_async_session)):
    query = select(Task).where(Task.id == id)
    result = await session.execute(query)
    rows = result.fetchall()
    rows = [i[0] for i in rows]
    if rows[0].user_id != user.id:
        return {'status': 'error, bad user id and task id'}

    stmt = delete_sql(Task).where(Task.id == id)
    await session.execute(stmt)
    await session.commit()

    return {'status': 'succesful delete'}


@router.delete('/zalupa')
def zalupa():


    return {'test': 'successful'}
