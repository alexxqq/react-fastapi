from datetime import datetime
from sqlalchemy import Table, Column, Integer, String,create_engine, TIMESTAMP, MetaData,ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker,Mapped,mapped_column,relationship
from database import User
from typing import List
metadata = MetaData()
Base = declarative_base()
class Operation(Base):
    __tablename__ = 'operation'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    date:Mapped[datetime] = mapped_column(TIMESTAMP,nullable=False)
    type :Mapped[str] =mapped_column(String,nullable=False)
    
class Task_Tag(Base):
  __tablename__ = 'task_tag'
  tag_id: Mapped[int] = mapped_column(
        ForeignKey("tags.id", ondelete="CASCADE"),
        primary_key=True,
    )
  task_id: Mapped[int] = mapped_column(   
        ForeignKey("tasks.id", ondelete="CASCADE"),
        primary_key=True,
    )



class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True,autoincrement= True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    date = Column(TIMESTAMP, nullable=False)

    tags: Mapped[list["Tag"]] = relationship(
        back_populates="tasks",
        secondary="task_tag",
    )

    user_id: Mapped[int] = mapped_column(ForeignKey(User.id,ondelete='CASCADE'))


class Tag(Base):
    __tablename__ = "tags"

    tasks: Mapped[list["Task"]] = relationship(
        back_populates="tags",
        secondary="task_tag",
    )
    tag_name = Column(String,nullable= False)
    id: Mapped[int] = mapped_column(primary_key=True,autoincrement= True)


DATABASE_URL = "postgresql://postgres:postgres@16.171.23.55:5432/postgres"
engine = create_engine(DATABASE_URL)

# Bind the engine to the metadata
Base.metadata.create_all(bind=engine)

# Create a session to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)