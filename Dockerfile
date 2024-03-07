FROM python:3.11.7-slim

WORKDIR /src

COPY backend/src /src

RUN pip3 install -r requirements.txt
