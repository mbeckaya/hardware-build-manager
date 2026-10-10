import logging
import httpx
import os
from datetime import date, datetime

os.makedirs("logs", exist_ok=True)

logging.basicConfig(
    filename="logs/lifecycle.log",
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

BASE_API_URL = "http://localhost:8000/api/v1"
BASE_BUILDS_URL = f"{BASE_API_URL}/builds/"
BASE_LIFECYCLES_URL = f"{BASE_API_URL}/lifecycles/"

class LifecycleChecker:
    def __init__(self, fields: list):
        self._fields = fields

    def get_builds(self) -> list:
        with httpx.Client(base_url=BASE_BUILDS_URL) as client:
            response = client.get("/")
        
        if response.status_code != 200:
            print("Error: Not available builds")
            return
    
        return response.json()

    def get_lifecycles(self) -> list:
        with httpx.Client(base_url=BASE_LIFECYCLES_URL) as client:
            response = client.get("/")
        
        if response.status_code != 200:
            print("Error: Not available lifecycles")
            return
    
        return response.json()

    def get_status(self, date_value: str, rules: tuple) -> int:
        year_now = date.today().year

        try:
            year_field = datetime.strptime(
                date_value, "%Y-%m-%d"
            ).date().year

            age_years = year_now - year_field
            
            if age_years >= rules[0]:
                return 2
            elif age_years >= rules[1]:
                return 1
        except (ValueError, TypeError):
            return

        return 0

    def create_lifecycle(self, payload: dict):
        with httpx.Client(base_url=BASE_LIFECYCLES_URL) as client:
            response = client.post("/", json=payload)
    
            if response.status_code not in (200, 201):
                print(f"Error: Could not create lifecycle (Status: {response.status_code})")
                return
    
            lifecycle = response.json()
            print(f"[LIFECYCLE CREATED] | ID: {lifecycle.get('id')}")

    def validate(self):
        builds = self.get_builds()

        for build in builds:
            for field in fields:
                name, col_name, rules = field
    
                date_value = build.get(col_name)
                if not date_value:
                    continue

                status = self.get_status(
                    date_value,
                    rules
                )
                
                self.create_lifecycle({
                    "build_id": build["id"],
                    "component_name": name,
                    "component_status": status,
                })

    def report(self):
        status_names = {
            1: "Warning",
            2: "Critical",
        }

        lifecycles = self.get_lifecycles()
        
        for lifecycle in lifecycles:
            logger.info(
                "ID: %s | Build ID: %s | Status: %s | Component: %s | Created at: %s",
                lifecycle["id"],
                lifecycle["build_id"],
                status_names.get(lifecycle["component_status"], lifecycle["component_status"]),
                lifecycle["component_name"],
                lifecycle["created_at"],
            )

            print(
                f"[LIFECYCLE REPORT] | "
                f"ID: {lifecycle.get('id')} | "
                f"Component: {lifecycle.get('component_name')} | "
                f"Status: {status_names.get(lifecycle.get('component_status'), lifecycle.get('component_status'))}"
            )

if __name__ == "__main__":
    fields = [
        ("cpu", "cpu_service_at", (12, 8)),
        ("gpu", "gpu_service_at", (8, 5)),
        ("ram", "ram_service_at", (12, 8)),
        ("storage", "storage_service_at", (7, 4)),
        ("psu", "psu_service_at", (10, 6)),
        ("mainboard", "mainboard_service_at", (10, 6)),
        ("cpu_cooler", "cpu_cooler_service_at", (10, 5)),
        ("case", "case_service_at", (15, 10)),
        ("os", "os_service_at", (5, 3)),
        ("sound_card", "sound_card_service_at", (10, 6)),
    ]

    lifecycle_checker = LifecycleChecker(fields)
    lifecycle_checker.validate()
    lifecycle_checker.report()