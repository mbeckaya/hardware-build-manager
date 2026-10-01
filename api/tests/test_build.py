import httpx
import random
import string
from fastapi import status

from models.build import Build

BASE_URL = "http://127.0.0.1:8000/api/v1/builds"

def get_payload():
    payload = {
        "storage": "2TB NVMe PCIe 4.0 SSD",
        "last_maintenance_at": "2025-01-10",
        "psu": "850W 80+ Gold",
        "last_maintenance_comment": None,
        "build_type_id": 1,
        "mainboard": "MSI MAG B650 TOMAHAWK WIFI",
        "next_maintenance_at": "2026-07-10",
        "cpu_cooler": "Thermalright Peerless Assassin 120",
        "next_maintenance_comment": None,
        "case": "Corsair 4000D Airflow",
        "created_at": "2026-09-30",
        "cpu": "AMD Ryzen 7 7800X3D",
        "gpu": "NVIDIA GeForce RTX 4085 Super",
        "os": "Windows 11 Pro",
        "sound_card": None,
        "ram": "32GB DDR5-6000",
        "warranty": "2029-06-15"
    }

    random_name = ''.join(
        random.choices(string.ascii_uppercase + string.digits, k=6)
    )

    payload["name"] = f"Apex Predator Gaming {random_name}"

    return payload

def create_build():
    payload = get_payload()

    with httpx.Client(base_url=BASE_URL) as client:
        response = client.post("/", json=payload)

    assert response.status_code == status.HTTP_201_CREATED

    return response.json()

def test_get_builds():
    with httpx.Client(base_url=BASE_URL) as client:
        response = client.get("/")

    assert response.status_code == status.HTTP_200_OK

    data = response.json()

    assert isinstance(data, list)
    assert len(data) > 0

def test_get_build():
    with httpx.Client(base_url=BASE_URL) as client:
        response = client.get("/1")

    assert response.status_code == status.HTTP_200_OK

    build = Build.model_validate(response.json())

    assert isinstance(build, Build)
    assert build.id == 1

def test_create_build():
    build = Build.model_validate(create_build())
    
    assert isinstance(build, Build)

def test_update_build():
    payload = get_payload()
    payload["cpu"] = "AMD AI 10000"

    with httpx.Client(base_url=BASE_URL) as client:
        response = client.put("/1", json=payload)

    assert response.status_code == status.HTTP_200_OK

    build = Build.model_validate(response.json())
        
    assert isinstance(build, Build)
    assert build.cpu == "AMD AI 10000"

def test_delete_build():
    build = create_build()

    with httpx.Client(base_url=BASE_URL) as client:
        response = client.delete(f"/{build["id"]}")

    assert response.status_code == status.HTTP_204_NO_CONTENT
