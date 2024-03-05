from datetime import datetime
from .schemas import AddTask
from sqlalchemy import select, delete as delete_sql
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends
from database import User, get_async_session
from auth.base_config import fastapi_users
from .models import Task, Tag, Task_Tag

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

current_user = fastapi_users.current_user()

@router.get('')
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

        if task.id not in {t.id for t in tasks}:
            task.user = {'username': username,
                         'email': user_email, 'id': user_id}
            task.tag = []  
            tasks.append(task)


        if tag_id is not None:
            tasks[-1].tag.append(tag_name)

    return tasks


@router.post('/add_task')
async def add_task(task: AddTask, user: User = Depends(current_user), session: AsyncSession = Depends(get_async_session)):
    tags = task.tags
    name = task.name
    description = task.description

    tag_names = [i for i in tags.split(' ') if len(i)]

    tag_objects = []

    for tag_name in tag_names:

        tag = await session.execute(select(Tag).filter(Tag.tag_name == tag_name))
        tag = tag.scalar_one_or_none()

        if not tag:

            tag = Tag(tag_name=tag_name)
            session.add(tag)
            await session.flush()

        tag_objects.append(tag)

    new_task = Task(name=name, description=description,
                    date=datetime.now().date(), user_id=user.id)
    session.add(new_task)
    await session.flush()

    # link the task with tags in the Task_Tag linking table!!
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
    query = select(Task, User.email, User.id, User.username, Task_Tag.tag_id, Tag.tag_name).where(Task.name==query).\
        join(User).\
        outerjoin(Task_Tag, Task.id == Task_Tag.task_id).\
        outerjoin(Tag, Task_Tag.tag_id == Tag.id)

    result = await session.execute(query)

    rows = result.fetchall()
    tasks = []
    for task, user_email, user_id, username, tag_id, tag_name in rows:

        if task.id not in {t.id for t in tasks}:
            task.user = {'username': username,
                         'email': user_email, 'id': user_id}
            task.tag = []  
            tasks.append(task)


        if tag_id is not None:
            tasks[-1].tag.append(tag_name)

    return tasks


@router.delete('/delete/{id}')
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


@router.put('/update/{id}')
async def update(id: int,updateData:AddTask ,user: User = Depends(current_user), session: AsyncSession = Depends(get_async_session)):

    name = updateData.name
    description=updateData.description
    tags = updateData.tags

    tag_names = [i for i in tags.split(' ') if len(i)]
    task = await session.execute(select(Task).filter(Task.id == id))
    task = task.scalar_one_or_none()
    if task.user_id != user.id:
        return {'status':'error, wrong user'}
    if task is None:
        return {'status':'error, no task'}
    task.name = name
    task.description = description
    existing_tags = await session.execute(select(Task_Tag).filter(Task_Tag.task_id == id))
    existing_tags = existing_tags.scalars().all()
    for existing_tag in existing_tags:
        await session.delete(existing_tag)
    for tag_name in tag_names:

        tag = await session.execute(select(Tag).filter(Tag.tag_name == tag_name))
        tag= tag.scalar_one_or_none()
        if not tag:

            tag = Tag(tag_name=tag_name)
            session.add(tag)
            await session.flush()

        task_tag_entry = Task_Tag(tag_id=tag.id, task_id=task.id)
        session.add(task_tag_entry)

    await session.commit()


    return {'update':'success'}

@router.get('/getone/{id}')
async def getonetask(id:int,session: AsyncSession = Depends(get_async_session)):
    query = select(Task, User.email, User.id, User.username, Task_Tag.tag_id, Tag.tag_name).where(Task.id==id).\
    join(User).\
    outerjoin(Task_Tag, Task.id == Task_Tag.task_id).\
    outerjoin(Tag, Task_Tag.tag_id == Tag.id)

    result = await session.execute(query)

    rows = result.fetchall()
    tasks = []
    for task, user_email, user_id, username, tag_id, tag_name in rows:

        if task.id not in {t.id for t in tasks}:
            task.user = {'username': username,
                         'email': user_email, 'id': user_id}
            task.tag = [] 
            tasks.append(task)


        if tag_id is not None:
            tasks[-1].tag.append(tag_name)



    return tasks
