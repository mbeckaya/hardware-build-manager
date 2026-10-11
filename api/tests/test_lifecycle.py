import httpx
import random
import string
from fastapi import status

from models.lifecycle import Lifecycle

BASE_URL = "http://127.0.0.1:8000/api/v1/lifecycles"


def get_payload():
    random_name = "".join(
        random.choices(string.ascii_uppercase + string.digits, k=6)
    )

    return {
        "build_id": 1,
        "component_name": f"cpu_{random_name}",
        "component_status": 1,
    }


def create_lifecycle():
    payload = get_payload()

    with httpx.Client(base_url=BASE_URL) as client:
        response = client.post("/", json=payload)

    assert response.status_code == status.HTTP_201_CREATED

    return response.json()


def test_get_lifecycles():
    with httpx.Client(base_url=BASE_URL) as client:
        response = client.get("/")

    assert response.status_code == status.HTTP_200_OK

    data = response.json()

    assert isinstance(data, list)

    for lifecycle_data in data:
        lifecycle = Lifecycle.model_validate(lifecycle_data)
        assert isinstance(lifecycle, Lifecycle)


def test_create_lifecycle():
    payload = get_payload()

    with httpx.Client(base_url=BASE_URL) as client:
        response = client.post("/", json=payload)

    assert response.status_code == status.HTTP_201_CREATED

    lifecycle = Lifecycle.model_validate(response.json())

    assert isinstance(lifecycle, Lifecycle)
    assert lifecycle.build_id == payload["build_id"]
    assert lifecycle.component_name == payload["component_name"]
    assert lifecycle.component_status == payload["component_status"]