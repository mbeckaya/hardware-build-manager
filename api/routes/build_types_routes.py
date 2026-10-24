from fastapi import APIRouter, Depends, status

from controllers.build_type_controller import BuildTypeController
from models.build_type import BuildType

router = APIRouter(
    prefix="/api/v1/build-types",
    tags=["BuildTypes"]
)

@router.get(
    "/", 
    response_model=list[BuildType],
)
async def get_build_types(
    controller: BuildTypeController = Depends(BuildTypeController),
) -> list[BuildType]:
    return controller.index()

@router.get(
    "/{build_id}", 
    response_model=BuildType,
)
async def get_build_type(
    build_id: int, 
    controller: BuildTypeController = Depends(BuildTypeController),
) -> BuildType:
    return controller.show(build_id)

@router.post(
    "/", 
    response_model=BuildType, 
    status_code=status.HTTP_201_CREATED,
)
async def create_build_type(
    build_new: BuildType,
    controller: BuildTypeController = Depends(BuildTypeController),
) -> BuildType:
    return controller.store(build_new)

@router.put(
    "/{build_id}", 
    response_model=BuildType,
)
async def update_build_type(
    build_id: int,
    build_update: BuildType,
    controller: BuildTypeController = Depends(BuildTypeController),
) -> BuildType:
    return controller.update(build_id, build_update)

@router.delete(
     "/{build_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_build_type(
    build_id: int,
    controller: BuildTypeController = Depends(BuildTypeController),
) -> None:
    return controller.destroy(build_id)