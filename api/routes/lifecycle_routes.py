from fastapi import APIRouter, Depends, status

from controllers.lifecycle_controller import LifecycleController
from models.lifecycle import Lifecycle

router = APIRouter(
    prefix="/api/v1/lifecycles",
    tags=["Lifecycles"]
)

@router.post("/", response_model=Lifecycle, status_code=status.HTTP_201_CREATED)
async def create_lifecycle(
    lifecycle_new: Lifecycle,
    controller: LifecycleController = Depends(LifecycleController),
) -> Lifecycle:
    return controller.store(lifecycle_new)