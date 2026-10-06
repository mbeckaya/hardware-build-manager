from fastapi import APIRouter, Depends, status
from fastapi.responses import FileResponse

from controllers.build_controller import BuildController
from models.build import Build

router = APIRouter(
    prefix="/api/v1/builds",
    tags=["Builds"]
)

@router.get("/", response_model=list[Build])
async def get_builds(
    controller: BuildController = Depends(BuildController),
) -> list[Build]:
    return controller.index()

@router.get("/export")
async def get_export_builds(
    controller: BuildController = Depends(BuildController),
) -> FileResponse:
    return controller.export_csv()

@router.get("/{build_id}", response_model=Build)
async def get_build(
    build_id: int, 
    controller: BuildController = Depends(BuildController),
) -> Build:
    return controller.show(build_id)

@router.post("/", response_model=Build, status_code=status.HTTP_201_CREATED)
async def create_build(
    build_new: Build,
    controller: BuildController = Depends(BuildController),
) -> Build:
    return controller.store(build_new)

@router.put("/{build_id}", response_model=Build)
async def update_build(
    build_id: int,
    build_update: Build,
    controller: BuildController = Depends(BuildController),
) -> Build:
    return controller.update(build_id, build_update)

@router.delete("/{build_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_build(
    build_id: int,
    controller: BuildController = Depends(BuildController),
) -> None:
    return controller.destroy(build_id)