import os
from sqlalchemy.engine import URL
from sqlmodel import create_engine, Session


def _required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Environment variable {name} must be set.")
    return value


try:
    DB_PORT = int(os.getenv("DB_PORT", "3306"))
except ValueError as error:
    raise RuntimeError("Environment variable DB_PORT must be an integer.") from error

DATABASE_URL = URL.create(
    "mysql+pymysql",
    username=_required_env("DB_USER"),
    password=_required_env("DB_PASSWORD"),
    host=os.getenv("DB_HOST", "localhost"),
    port=DB_PORT,
    database=_required_env("DB_NAME"),
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    connect_args={"connect_timeout": 10},
)

def get_session():
    with Session(engine) as session:
        yield session