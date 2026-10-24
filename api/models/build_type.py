from datetime import date
from sqlmodel import Field, SQLModel

class BuildType(SQLModel, table=True):
    __tablename__ = "build_types"

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(unique=True)
    created_at: date = Field(default_factory=date.today)