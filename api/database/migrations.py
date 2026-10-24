from pathlib import Path

from alembic import command
from alembic.config import Config
from sqlalchemy import inspect

from database.database import engine


def run_migrations() -> None:
    config = Config(str(Path(__file__).resolve().parent.parent / "alembic.ini"))
    existing_tables = set(inspect(engine).get_table_names())

    if (
        "alembic_version" not in existing_tables
        and {"build_types", "builds"}.issubset(existing_tables)
    ):
        command.stamp(config, "head")

    command.upgrade(config, "head")
