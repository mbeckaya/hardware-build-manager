from datetime import date
from sqlmodel import Session, select, text
from database.database import engine
from models import Build, BuildType

def seed_database():
    print("Starting database seeding...")
    
    with Session(engine) as session:
        print("Clearing existing data...")
        session.exec(text("SET FOREIGN_KEY_CHECKS = 0;"))
        session.exec(text("TRUNCATE TABLE builds;"))
        session.exec(text("TRUNCATE TABLE build_types;"))
        session.exec(text("SET FOREIGN_KEY_CHECKS = 1;"))
        session.commit()
        print("Tables cleared successfully.")

        build_types = [
            BuildType(name="Gaming PC"),
            BuildType(name="Office PC"),
            BuildType(name="Workstation"),
            BuildType(name="Streaming PC"),
            BuildType(name="Video Editing PC"),
            BuildType(name="AI PC"),
        ]

        for bt in build_types:
            session.add(bt)
        session.commit()
        print(f"Successfully inserted {len(build_types)} records for BuildType!")

        gaming_type = session.exec(select(BuildType).where(BuildType.name == "Gaming PC")).first() # type: ignore
        office_type = session.exec(select(BuildType).where(BuildType.name == "Office PC")).first() # type: ignore
        workstation_type = session.exec(select(BuildType).where(BuildType.name == "Workstation")).first() # type: ignore

        builds = [
            Build(
                name="Apex Predator Gaming",
                build_type_id=gaming_type.id if gaming_type else 1,
                cpu="AMD Ryzen 7 7800X3D",
                gpu="NVIDIA GeForce RTX 4080 Super",
                ram="32GB DDR5-6000",
                storage="2TB NVMe PCIe 4.0 SSD",
                psu="850W 80+ Gold",
                mainboard="MSI MAG B650 TOMAHAWK WIFI",
                cpu_cooler="Thermalright Peerless Assassin 120",
                case="Corsair 4000D Airflow",
                os="Windows 11 Pro",
                sound_card=None,
                warranty=date(2029, 6, 15),
                last_maintenance_at=date(2025, 1, 10),
                next_maintenance_at=date(2026, 7, 10)
            ),
            Build(
                name="Office Workhorse Basic",
                build_type_id=office_type.id if office_type else 2,
                cpu="Intel Core i5-13400",
                gpu="Intel UHD Graphics 730",
                ram="16GB DDR4-3200",
                storage="512GB NVMe SSD",
                psu="500W 80+ Bronze",
                mainboard="Gigabyte B760M DS3H",
                cpu_cooler="Boxed Cooler",
                case="BeQuiet Pure Base 500",
                os="Windows 11 Home",
                sound_card=None,
                warranty=date(2028, 3, 20),
                last_maintenance_at=None,
                next_maintenance_at=None
            ),
            Build(
                name="DeepLearning Beast",
                build_type_id=workstation_type.id if workstation_type else 3,
                cpu="AMD Ryzen Threadripper 7960X",
                gpu="NVIDIA RTX 6000 Ada Generation",
                ram="128GB DDR5 ECC",
                storage="4TB PCIe 5.0 NVMe SSD",
                psu="1600W 80+ Titanium",
                mainboard="ASUS ProArt TRX50-SAFE WIFI",
                cpu_cooler="Noctua NH-U14S TR5-SP5",
                case="Fractal Design Torrent",
                os="Ubuntu 24.04 LTS",
                sound_card="Creative Sound Blaster Z",
                warranty=date(2031, 1, 1),
                last_maintenance_at=date(2026, 2, 1),
                next_maintenance_at=date(2027, 2, 1)
            )
        ]

        for build in builds:
            session.add(build)

        session.commit()
        print(f"Successfully inserted {len(builds)} records for Build!")

        print("Database seeding completed.")

if __name__ == "__main__":
    seed_database()