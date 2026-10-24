"""Create initial build tables.

Revision ID: 20261024_0001
Revises:
Create Date: 2026-10-24
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20261024_0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "build_types",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.Date(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name"),
    )
    op.create_table(
        "builds",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("build_type_id", sa.Integer(), nullable=False),
        sa.Column("cpu_name", sa.String(length=255), nullable=False),
        sa.Column("cpu_service_at", sa.Date(), nullable=True),
        sa.Column("gpu_name", sa.String(length=255), nullable=False),
        sa.Column("gpu_service_at", sa.Date(), nullable=True),
        sa.Column("ram_name", sa.String(length=255), nullable=False),
        sa.Column("ram_service_at", sa.Date(), nullable=True),
        sa.Column("storage_name", sa.String(length=255), nullable=False),
        sa.Column("storage_service_at", sa.Date(), nullable=True),
        sa.Column("psu_name", sa.String(length=255), nullable=False),
        sa.Column("psu_service_at", sa.Date(), nullable=True),
        sa.Column("mainboard_name", sa.String(length=255), nullable=False),
        sa.Column("mainboard_service_at", sa.Date(), nullable=True),
        sa.Column("cpu_cooler_name", sa.String(length=255), nullable=False),
        sa.Column("cpu_cooler_service_at", sa.Date(), nullable=True),
        sa.Column("case_name", sa.String(length=255), nullable=False),
        sa.Column("case_service_at", sa.Date(), nullable=True),
        sa.Column("os_name", sa.String(length=255), nullable=False),
        sa.Column("os_service_at", sa.Date(), nullable=True),
        sa.Column("sound_card_name", sa.String(length=255), nullable=True),
        sa.Column("sound_card_service_at", sa.Date(), nullable=True),
        sa.Column("last_maintenance_at", sa.Date(), nullable=True),
        sa.Column("last_maintenance_comment", sa.String(length=255), nullable=True),
        sa.Column("next_maintenance_at", sa.Date(), nullable=True),
        sa.Column("next_maintenance_comment", sa.String(length=255), nullable=True),
        sa.Column("created_at", sa.Date(), nullable=False),
        sa.ForeignKeyConstraint(["build_type_id"], ["build_types.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name"),
    )
    op.create_index(
        "ix_builds_build_type_id",
        "builds",
        ["build_type_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index("ix_builds_build_type_id", table_name="builds")
    op.drop_table("builds")
    op.drop_table("build_types")
