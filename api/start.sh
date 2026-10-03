#!/bin/sh

echo "Waiting for database..."

until python -c "
import pymysql
import os

pymysql.connect(
    host=os.getenv('DB_HOST', 'db'),
    port=int(os.getenv('DB_PORT', '3306')),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_NAME')
)
" 2>/dev/null
do
    sleep 2
done

echo "Database is ready."

echo "Running migrations..."
alembic upgrade head

echo "Running database seeder..."
python -m database.seed

echo "Starting FastAPI..."
exec fastapi dev main.py --host 0.0.0.0 --port 8000