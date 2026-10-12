import httpx
import json
from datetime import date, datetime
from pathlib import Path

BASE_API_URL = "http://localhost:8000/api/v1"
BASE_BUILDS_URL = f"{BASE_API_URL}/builds/"
BASE_LIFECYCLES_URL = f"{BASE_API_URL}/lifecycles/"

class LifecycleChecker:
    def __init__(self, fields: list):
        self._fields = fields

    def get_builds(self) -> list:
        try:
            with httpx.Client(base_url=BASE_BUILDS_URL) as client:
                response = client.get("/")

            response.raise_for_status()
            return response.json()

        except (httpx.HTTPError, ValueError) as error:
            print(f"Error: Could not retrieve builds: {error}")
            return []

    def get_lifecycles(self) -> list:
        try:
            with httpx.Client(base_url=BASE_LIFECYCLES_URL) as client:
                response = client.get("/")

            response.raise_for_status()
            return response.json()

        except (httpx.HTTPError, ValueError) as error:
            print(f"Error: Could not retrieve lifecycles: {error}")
            return []

    def get_status(self, date_value: str, rules: tuple) -> int:
        try:
            service_date = datetime.strptime(
                date_value, "%Y-%m-%d"
            ).date()

            age_years = date.today().year - service_date.year

            if age_years >= rules[0]:
                return 2
            elif age_years >= rules[1]:
                return 1

        except (ValueError, TypeError):
            return 0

        return 0

    def create_lifecycle(self, payload: dict) -> bool:
        try:
            with httpx.Client(base_url=BASE_LIFECYCLES_URL) as client:
                response = client.post("/", json=payload)

            if response.status_code not in (200, 201):
                print(
                    "Error: Could not create lifecycle "
                    f"(Status: {response.status_code})"
                )
                return False

            lifecycle = response.json()
            print(
                "[LIFECYCLE CREATED] | "
                f"ID: {lifecycle.get('id', 'N/A')}"
            )
            return True

        except (httpx.HTTPError, ValueError) as error:
            print(f"Error: Could not create lifecycle: {error}")
            return False

    def validate(self) -> None:
        builds = self.get_builds()

        if not builds:
            print("No builds available.")
            return

        for build in builds:
            for name, col_name, rules in self._fields:
                date_value = build.get(col_name)

                if not date_value:
                    continue

                status = self.get_status(date_value, rules)

                payload = {
                    "build_id": build["id"],
                    "component_name": name,
                    "component_status": status,
                }

                self.create_lifecycle(payload)

    def report(self) -> str:
        status_names = {
            0: "OK",
            1: "Warning",
            2: "Critical",
        }

        lifecycles = self.get_lifecycles()

        report_data = []

        for lifecycle in lifecycles:
            created_at = lifecycle.get("created_at")

            if created_at:
                created_at = str(created_at)[:10]

            report_data.append({
                "build_id": lifecycle.get("build_id"),
                "component_name": lifecycle.get("component_name"),
                "component_status": status_names.get(
                    lifecycle.get("component_status"),
                    lifecycle.get("component_status"),
                ),
                "created_at": created_at,
            })

        export_dir = Path("exports")
        export_dir.mkdir(parents=True, exist_ok=True)

        timestamp = datetime.now().strftime(
            "%Y-%m-%d-%H-%M-%S"
        )
        output_path = export_dir / f"lifecycles_{timestamp}.json"

        with open(output_path, "w", encoding="utf-8") as file:
            json.dump(
                report_data,
                file,
                indent=4,
                ensure_ascii=False,
            )

        print(f"[LIFECYCLE REPORT] JSON saved: {output_path}")

        return str(output_path)


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