from datetime import date
from sqlmodel import Field, SQLModel
from sqlalchemy import CheckConstraint

class Lifecycle(SQLModel, table=True):
    __tablename__ = "lifecycles"
    
    __table_args__ = (
        CheckConstraint(
            "component_status BETWEEN 0 AND 2",
            name="check_component_status_range",
        ),
    )

    id: int | None = Field(default=None, primary_key=True)
    build_id: int = Field(foreign_key="builds.id", index=True)

    component_name: str
    component_status: int = Field(ge=0, le=2)

    created_at: date = Field(default_factory=date.today)