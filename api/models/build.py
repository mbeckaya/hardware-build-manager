from datetime import date
from sqlmodel import Field, SQLModel

class Build(SQLModel, table=True):
    __tablename__ = "builds"

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(unique=True)
    build_type_id: int = Field(foreign_key="build_types.id", index=True)

    # CPU
    cpu_name: str
    cpu_service_at: date | None = Field(default=None)
    
    # GPU
    gpu_name: str
    gpu_service_at: date | None = Field(default=None)
    
    # RAM
    ram_name: str
    ram_service_at: date | None = Field(default=None)
    
    # Storage
    storage_name: str
    storage_service_at: date | None = Field(default=None)
    
    # PSU
    psu_name: str
    psu_service_at: date | None = Field(default=None)
    
    # Mainboard
    mainboard_name: str
    mainboard_service_at: date | None = Field(default=None)
    
    # CPU-Cooler
    cpu_cooler_name: str
    cpu_cooler_service_at: date | None = Field(default=None)

    # Case
    case_name: str
    case_service_at: date | None = Field(default=None)
    
    # Operating System
    os_name: str
    os_service_at: date | None = Field(default=None)

    # Sound card
    sound_card_name: str | None = Field(default=None)
    sound_card_service_at: date | None = Field(default=None)
    
    # Maintenance
    last_maintenance_at: date | None = Field(default=None)
    last_maintenance_comment: str | None = Field(default=None)
    next_maintenance_at: date | None = Field(default=None)
    next_maintenance_comment: str | None = Field(default=None)

    created_at: date = Field(default_factory=date.today)