from fastapi import HTTPException, status, Depends
from sqlmodel import Session
from database.database import get_session

class BaseController:
    def __init__(self, resource_name: str, session: Session = Depends(get_session)):
        self._resource_name = resource_name
        self._session = session

    def err_not_found(self, id: int):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{self._resource_name} ID: {id} not found."
        )

    def err_res_conflict(self):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Resource ({self._resource_name}) conflicts with existing data"
        )

    def err_default(self):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )