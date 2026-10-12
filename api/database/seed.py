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
                cpu_name="AMD Ryzen 7 7800X3D",
                cpu_service_at=date(2026, 1, 1),
                gpu_name="NVIDIA GeForce RTX 4080 Super",
                gpu_service_at=date(2026, 1, 1),
                ram_name="32GB DDR5-6000",
                ram_service_at=date(2026, 1, 1),
                storage_name="2TB NVMe PCIe 4.0 SSD",
                storage_service_at=date(2026, 1, 1),
                psu_name="850W 80+ Gold",
                psu_service_at=date(2026, 1, 1),
                mainboard_name="MSI MAG B650 TOMAHAWK WIFI",
                mainboard_service_at=date(2026, 1, 1),
                cpu_cooler_name="Thermalright Peerless Assassin 120",
                cpu_cooler_service_at=date(2026, 1, 1),
                case_name="Corsair 4000D Airflow",
                case_service_at=date(2026, 1, 1),
                os_name="Windows 11 Pro",
                os_service_at=date(2026, 1, 1),
                sound_card_name="Creative Sound Blaster Z SE",
                sound_card_service_at=date(2026, 1, 1),
                last_maintenance_at=date(2026, 2, 10),
                next_maintenance_at=date(2026, 8, 10),
            ),

            Build(
                name="Budget Battlestation",
                build_type_id=gaming_type.id,
                cpu_name="AMD Ryzen 5 5600",
                cpu_service_at=date(2025, 4, 15),
                gpu_name="AMD Radeon RX 6600",
                gpu_service_at=date(2025, 4, 15),
                ram_name="16GB DDR4-3200",
                ram_service_at=date(2025, 4, 15),
                storage_name="1TB NVMe SSD",
                storage_service_at=date(2025, 4, 15),
                psu_name="550W 80+ Bronze",
                psu_service_at=date(2025, 4, 15),
                mainboard_name="Gigabyte B450M K",
                mainboard_service_at=date(2025, 4, 15),
                cpu_cooler_name="Stock Cooler",
                cpu_cooler_service_at=date(2025, 4, 15),
                case_name="Endorfy Signum 300 Air",
                case_service_at=date(2025, 4, 15),
                os_name="Windows 11 Home",
                os_service_at=date(2025, 4, 15),
                sound_card_name=None,
                sound_card_service_at=None,
                last_maintenance_at=date(2026, 4, 15),
                next_maintenance_at=date(2027, 4, 15),
            ),

            Build(
                name="Titan Workstation",
                build_type_id=workstation_type.id,
                cpu_name="Intel Core i9-14900K",
                cpu_service_at=date(2024, 9, 1),
                gpu_name="NVIDIA GeForce RTX 4090",
                gpu_service_at=date(2024, 9, 1),
                ram_name="64GB DDR5-6400",
                ram_service_at=date(2024, 9, 1),
                storage_name="4TB NVMe PCIe 4.0 SSD",
                storage_service_at=date(2024, 9, 1),
                psu_name="1200W 80+ Platinum",
                psu_service_at=date(2024, 9, 1),
                mainboard_name="ASUS ROG Strix Z790-E",
                mainboard_service_at=date(2024, 9, 1),
                cpu_cooler_name="NZXT Kraken 360 AIO",
                cpu_cooler_service_at=date(2024, 9, 1),
                case_name="Corsair 5000D Airflow",
                case_service_at=date(2024, 9, 1),
                os_name="Windows 11 Pro",
                os_service_at=date(2024, 9, 1),
                sound_card_name="ASUS Xonar AE",
                sound_card_service_at=date(2024, 9, 1),
                last_maintenance_at=date(2026, 3, 1),
                next_maintenance_at=date(2026, 9, 1),
            ),

            Build(
                name="Office Standard PC",
                build_type_id=office_type.id,
                cpu_name="Intel Core i5-12400",
                cpu_service_at=date(2024, 4, 10),
                gpu_name="Intel UHD Graphics 730",
                gpu_service_at=date(2024, 4, 10),
                ram_name="16GB DDR4-3200",
                ram_service_at=date(2024, 4, 10),
                storage_name="500GB NVMe SSD",
                storage_service_at=date(2024, 4, 10),
                psu_name="400W 80+ Bronze",
                psu_service_at=date(2024, 4, 10),
                mainboard_name="ASUS Prime H610M-A",
                mainboard_service_at=date(2024, 4, 10),
                cpu_cooler_name="Intel Boxed Cooler",
                cpu_cooler_service_at=date(2024, 4, 10),
                case_name="Sharkoon V1000",
                case_service_at=date(2024, 4, 10),
                os_name="Windows 10 Pro",
                os_service_at=date(2024, 4, 10),
                sound_card_name=None,
                sound_card_service_at=None,
                last_maintenance_at=date(2025, 4, 10),
                next_maintenance_at=date(2027, 4, 10),
            ),

            Build(
                name="Shadow Strike Gaming",
                build_type_id=gaming_type.id,
                cpu_name="AMD Ryzen 5 5600X",
                cpu_service_at=date(2021, 5, 20),
                gpu_name="NVIDIA GeForce RTX 3060 Ti",
                gpu_service_at=date(2021, 5, 20),
                ram_name="16GB DDR4-3600",
                ram_service_at=date(2021, 5, 20),
                storage_name="1TB SATA SSD",
                storage_service_at=date(2021, 5, 20),
                psu_name="650W 80+ Gold",
                psu_service_at=date(2021, 5, 20),
                mainboard_name="MSI MAG B550 TOMAHAWK",
                mainboard_service_at=date(2021, 5, 20),
                cpu_cooler_name="be quiet! Pure Rock 2",
                cpu_cooler_service_at=date(2021, 5, 20),
                case_name="Fractal Design Meshify C",
                case_service_at=date(2021, 5, 20),
                os_name="Windows 11 Home",
                os_service_at=date(2021, 5, 20),
                sound_card_name=None,
                sound_card_service_at=None,
                last_maintenance_at=date(2025, 5, 20),
                next_maintenance_at=date(2026, 11, 20),
            ),

            Build(
                name="Office Workhorse 2021",
                build_type_id=office_type.id,
                cpu_name="Intel Core i5-10400",
                cpu_service_at=date(2021, 2, 10),
                gpu_name="Intel UHD Graphics 630",
                gpu_service_at=date(2021, 2, 10),
                ram_name="16GB DDR4-2666",
                ram_service_at=date(2021, 2, 10),
                storage_name="512GB SATA SSD",
                storage_service_at=date(2021, 2, 10),
                psu_name="450W 80+ Bronze",
                psu_service_at=date(2021, 2, 10),
                mainboard_name="MSI B460M PRO-VDH",
                mainboard_service_at=date(2021, 2, 10),
                cpu_cooler_name="Intel Boxed Cooler",
                cpu_cooler_service_at=date(2021, 2, 10),
                case_name="Cooler Master MasterBox Q300L",
                case_service_at=date(2021, 2, 10),
                os_name="Windows 10 Pro",
                os_service_at=date(2021, 2, 10),
                sound_card_name=None,
                sound_card_service_at=None,
                last_maintenance_at=date(2024, 2, 10),
                next_maintenance_at=date(2027, 2, 10),
            ),

            Build(
                name="Retro Gaming Beast",
                build_type_id=gaming_type.id,
                cpu_name="Intel Core i7-6700K",
                cpu_service_at=date(2016, 7, 15),
                gpu_name="NVIDIA GeForce GTX 1070",
                gpu_service_at=date(2016, 7, 15),
                ram_name="16GB DDR4-3000",
                ram_service_at=date(2016, 7, 15),
                storage_name="500GB SATA SSD",
                storage_service_at=date(2016, 7, 15),
                psu_name="650W 80+ Gold",
                psu_service_at=date(2016, 7, 15),
                mainboard_name="ASUS Z170 PRO GAMING",
                mainboard_service_at=date(2016, 7, 15),
                cpu_cooler_name="Cooler Master Hyper 212 EVO",
                cpu_cooler_service_at=date(2016, 7, 15),
                case_name="NZXT S340",
                case_service_at=date(2016, 7, 15),
                os_name="Windows 10 Pro",
                os_service_at=date(2016, 7, 15),
                sound_card_name="Creative Sound Blaster Z",
                sound_card_service_at=date(2016, 7, 15),
                last_maintenance_at=date(2023, 7, 15),
                next_maintenance_at=date(2026, 7, 15),
            ),

            Build(
                name="Office Legacy 2016",
                build_type_id=office_type.id,
                cpu_name="Intel Core i5-6500",
                cpu_service_at=date(2016, 3, 1),
                gpu_name="Intel HD Graphics 530",
                gpu_service_at=date(2016, 3, 1),
                ram_name="8GB DDR4-2133",
                ram_service_at=date(2016, 3, 1),
                storage_name="256GB SATA SSD",
                storage_service_at=date(2016, 3, 1),
                psu_name="400W 80+ Bronze",
                psu_service_at=date(2016, 3, 1),
                mainboard_name="ASUS H110M-K",
                mainboard_service_at=date(2016, 3, 1),
                cpu_cooler_name="Intel Boxed Cooler",
                cpu_cooler_service_at=date(2016, 3, 1),
                case_name="Sharkoon VS4-V",
                case_service_at=date(2016, 3, 1),
                os_name="Windows 10 Pro",
                os_service_at=date(2016, 3, 1),
                sound_card_name=None,
                sound_card_service_at=None,
                last_maintenance_at=date(2022, 3, 1),
                next_maintenance_at=date(2026, 11, 1),
            ),

            Build(
                name="Legacy Engineering Workstation",
                build_type_id=workstation_type.id,
                cpu_name="Intel Core i7-5820K",
                cpu_service_at=date(2016, 1, 20),
                gpu_name="NVIDIA GeForce GTX 980 Ti",
                gpu_service_at=date(2016, 1, 20),
                ram_name="32GB DDR4-2400",
                ram_service_at=date(2016, 1, 20),
                storage_name="1TB SATA SSD",
                storage_service_at=date(2016, 1, 20),
                psu_name="750W 80+ Gold",
                psu_service_at=date(2016, 1, 20),
                mainboard_name="ASUS X99-A II",
                mainboard_service_at=date(2016, 1, 20),
                cpu_cooler_name="Noctua NH-D15",
                cpu_cooler_service_at=date(2016, 1, 20),
                case_name="Fractal Design Define R5",
                case_service_at=date(2016, 1, 20),
                os_name="Windows 10 Pro",
                os_service_at=date(2016, 1, 20),
                sound_card_name="Creative Sound Blaster Z",
                sound_card_service_at=date(2016, 1, 20),
                last_maintenance_at=date(2024, 1, 20),
                next_maintenance_at=date(2027, 1, 20),
            ),

            Build(
                name="Vintage Office System",
                build_type_id=office_type.id,
                cpu_name="Intel Core i5-2500",
                cpu_service_at=date(2011, 6, 1),
                gpu_name="Intel HD Graphics 2000",
                gpu_service_at=date(2011, 6, 1),
                ram_name="8GB DDR3-1333",
                ram_service_at=date(2011, 6, 1),
                storage_name="500GB HDD",
                storage_service_at=date(2011, 6, 1),
                psu_name="400W 80+ Bronze",
                psu_service_at=date(2011, 6, 1),
                mainboard_name="ASUS P8H67-M",
                mainboard_service_at=date(2011, 6, 1),
                cpu_cooler_name="Intel Boxed Cooler",
                cpu_cooler_service_at=date(2011, 6, 1),
                case_name="Cooler Master Elite 342",
                case_service_at=date(2011, 6, 1),
                os_name="Windows 7 Professional",
                os_service_at=date(2011, 6, 1),
                sound_card_name=None,
                sound_card_service_at=None,
                last_maintenance_at=date(2020, 6, 1),
                next_maintenance_at=date(2026, 12, 1),
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