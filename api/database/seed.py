from datetime import date

from sqlmodel import Session, select, text

from database.database import engine
from models import Build, BuildType

def seed_database():
    print("Starting database seeding...")

    with Session(engine) as session:
        print("Clearing existing data...")

        # Disable foreign key checks temporarily so dependent tables
        # can be truncated safely.
        session.exec(text("SET FOREIGN_KEY_CHECKS = 0;"))

        try:
            session.exec(text("TRUNCATE TABLE builds;"))
            session.exec(text("TRUNCATE TABLE build_types;"))
            session.commit()
        finally:
            session.exec(text("SET FOREIGN_KEY_CHECKS = 1;"))
            session.commit()

        print("Tables cleared successfully.")

        # ------------------------------------------------------------------
        # Build Types
        # ------------------------------------------------------------------

        build_types = [
            BuildType(name="Gaming PC"),
            BuildType(name="Office PC"),
            BuildType(name="Workstation"),
            BuildType(name="Streaming PC"),
            BuildType(name="Video Editing PC"),
            BuildType(name="AI PC"),
        ]

        session.add_all(build_types)
        session.commit()

        # Refresh objects so generated IDs are available.
        for build_type in build_types:
            session.refresh(build_type)

        print(
            f"Successfully inserted "
            f"{len(build_types)} records for BuildType!"
        )

        # ------------------------------------------------------------------
        # Build Type IDs
        # ------------------------------------------------------------------

        gaming_type = next(
            bt for bt in build_types if bt.name == "Gaming PC"
        )

        office_type = next(
            bt for bt in build_types if bt.name == "Office PC"
        )

        workstation_type = next(
            bt for bt in build_types if bt.name == "Workstation"
        )

        # ------------------------------------------------------------------
        # Builds
        # ------------------------------------------------------------------

        builds = [
            Build(
                name="Apex Predator Gaming",
                build_type_id=gaming_type.id,
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
                last_maintenance_at=date(2025, 1, 10),
                next_maintenance_at=date(2026, 7, 10),
            ),
            Build(
                name="Office Workhorse Basic",
                build_type_id=office_type.id,
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
                last_maintenance_at=None,
                next_maintenance_at=None,
            ),
            Build(
                name="DeepLearning Beast",
                build_type_id=workstation_type.id,
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
                last_maintenance_at=date(2026, 2, 1),
                next_maintenance_at=date(2027, 2, 1),
            ),
        ]

        session.add_all(builds)
        session.commit()

        print(
            f"Successfully inserted "
            f"{len(builds)} records for Build!"
        )

        print("Database seeding completed.")

if __name__ == "__main__":
    seed_database()