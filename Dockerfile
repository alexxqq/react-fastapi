FROM python:3.11.7-slim

WORKDIR /backend/src

COPY . /backend/src

RUN pip3 install -r requirements.txt
