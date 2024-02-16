from sqlalchemy import Column, Integer, String, create_engine,MetaData,Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker,Mapped,mapped_column,relationship
from sqlalchemy import ForeignKey
from typing import List

metadata= MetaData()
Base = declarative_base()

# Define your model
class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(320), index=True, nullable=False)
    email = Column(String(320), unique=True, index=True, nullable=False)
    hashed_password = Column(String(1024), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)



    def __repr__(self):
        return f'USER: \nemail:{self.email}'

# Create an engine
DATABASE_URL = "postgresql://postgres:postgres@16.171.23.55:5432/postgres"
engine = create_engine(DATABASE_URL)

# Bind the engine to the metadata
Base.metadata.create_all(bind=engine)

# Create a session to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

