#!/bin/bash
if [ "$DATABASE" = "postgres" ]; then
    echo "Waiting for postgres..."
    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
      sleep 0.1
    done
    echo "PostgreSQL started"
fi

APP_MODULE="wsgi:app"
HOST="0.0.0.0"
PORT="5000"
WORKERS=4

exec gunicorn --bind $HOST:$PORT --workers $WORKERS $APP_MODULE