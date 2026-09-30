from datetime import date
from sqlmodel import Field, SQLModel

class Build(SQLModel, table=True):
    __tablename__ = "builds"

    id: int | None = Field(default=None, primary_key=True)
    name: str
    build_type_id: int = Field(foreign_key="build_types.id", index=True)
    cpu: str
    gpu: str
    ram: str
    storage: str
    psu: str
    mainboard: str
    cpu_cooler: str
    case: str
    os: str

    sound_card: str | None = Field(default=None)
    warranty: date | None = Field(default=None)
    last_maintenance_at: date | None = Field(default=None)
    last_maintenance_comment: str | None = Field(default=None)
    next_maintenance_at: date | None = Field(default=None)
    next_maintenance_comment: str | None = Field(default=None)
    created_at: date = Field(default_factory=date.today)