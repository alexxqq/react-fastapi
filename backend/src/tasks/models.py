from sqlalchemy import Column, Integer, String, create_engine, TIMESTAMP, MetaData, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Mapped, mapped_column, relationship
from database import User
from config import DB_HOST,DB_NAME,DB_PASS,DB_PORT,DB_USER

metadata = MetaData()
Base = declarative_base()


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
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    date = Column(TIMESTAMP, nullable=False)

    tags: Mapped[list["Tag"]] = relationship(
        back_populates="tasks",
        secondary="task_tag",
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(User.id, ondelete='CASCADE'))

    def __str__(self):
        return {'id': self.id, 'name': self.name, 'description': self.description, 'date': self.date, 'user_id': self.user_id, 'tags': self.tags}


class Tag(Base):
    __tablename__ = "tags"

    tasks: Mapped[list["Task"]] = relationship(
        back_populates="tags",
        secondary="task_tag",
    )
    tag_name = Column(String, nullable=False)
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)


DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(DATABASE_URL)

# Bind the engine to the metadata
Base.metadata.create_all(bind=engine)

# Create a session to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
