FROM postgres:latest

ENV POSTGRES_USER=defaultuser
ENV POSTGRES_PASSWORD=defaultpassword
ENV POSTGRES_DB=defaultdb

EXPOSE 5432

COPY ./init.sql /docker-entrypoint-initdb.d/

