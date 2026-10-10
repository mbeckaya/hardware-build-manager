from datetime import date, datetime
import httpx

BASE_API_URL = "http://localhost:8000/api/v1"
BASE_BUILDS_URL = f"{BASE_API_URL}/builds/"
BASE_LIFECYCLES_URL = f"{BASE_API_URL}/lifecycles/"

def create_lifecycle_entry(payload: dict):
    with httpx.Client(base_url=BASE_LIFECYCLES_URL) as client:
        response = client.post("/", json=payload)

        if response.status_code not in (200, 201):
            print(f"Error: Could not create lifecycle (Status: {response.status_code})")
            return

        lifecycle = response.json()
        print(f"New lifecycle added | ID: {lifecycle.get('id')}")


def check_lifecycle(fields: list):
    with httpx.Client(base_url=BASE_BUILDS_URL) as client:
        response = client.get("/")

    if response.status_code != 200:
        print("Error: Not available builds")
        return

    builds = response.json()
    year_now = date.today().year

    for build in builds:
        for field in fields:
            name, col_name, rules = field

            date_value = build.get(col_name)
            if not date_value:
                continue

            try:
                year_field = datetime.strptime(
                    date_value, "%Y-%m-%d"
                ).date().year

                age_years = year_now - year_field
                status = 0

                if age_years >= rules[0]:
                    status = 2
                elif age_years >= rules[1]:
                    status = 1
            except (ValueError, TypeError):
                continue

            create_lifecycle_entry({
                "build_id": build["id"],
                "component_name": name,
                "component_status": status,
            })


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

    check_lifecycle(fields)