import httpx
import random
import string
from fastapi import status

from models.build_type import BuildType

BASE_URL = "http://127.0.0.1:8000/api/v1/build-types"

def get_payload():
    payload = {
        "created_at": "2026-10-01",
    }

    random_name = ''.join(
        random.choices(string.ascii_uppercase + string.digits, k=6)
    )

    payload["name"] = f"Build Type Random {random_name}"

    return payload

def create_build_type():
    payload = get_payload()

    with httpx.Client(base_url=BASE_URL) as client:
        response = client.post("/", json=payload)

    assert response.status_code == status.HTTP_201_CREATED

    return response.json()

def test_get_build_types():
    with httpx.Client(base_url=BASE_URL) as client:
        response = client.get("/")

    assert response.status_code == status.HTTP_200_OK

    data = response.json()

    assert isinstance(data, list)
    assert len(data) > 0

def test_get_build_type():
    with httpx.Client(base_url=BASE_URL) as client:
        response = client.get("/1")

    assert response.status_code == status.HTTP_200_OK

    build_type = BuildType.model_validate(response.json())

    assert isinstance(build_type, BuildType)
    assert build_type.id == 1

def test_create_build_type():
    build_type = BuildType.model_validate(create_build_type())
    
    assert isinstance(build_type, BuildType)

def test_update_build_type():
    payload = get_payload()
    payload["name"] = "Expected Type 123"

    with httpx.Client(base_url=BASE_URL) as client:
        response = client.put("/1", json=payload)

    assert response.status_code == status.HTTP_200_OK

    build_type = BuildType.model_validate(response.json())
        
    assert isinstance(build_type, BuildType)
    assert build_type.name == "Expected Type 123"

def test_delete_build_type():
    build_type = create_build_type()

    with httpx.Client(base_url=BASE_URL) as client:
        response = client.delete(f"/{build_type["id"]}")

    assert response.status_code == status.HTTP_204_NO_CONTENT