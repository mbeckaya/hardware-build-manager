from fastapi import Depends
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError

from controllers.base_controller import BaseController
from database.database import get_session
from models.build_type import BuildType

class BuildTypeController(BaseController):
    def __init__(self, session: Session = Depends(get_session)):
        super().__init__("Build", session)

    def index(self) -> list[BuildType]:
        return self._session.exec(select(BuildType)).all()

    def show(self, build_type_id: int) -> BuildType:
        build_type = self._session.get(BuildType, build_type_id)

        if not build_type: 
            self.err_not_found(build_type_id)

        return build_type

    def store(self, build_new: BuildType) -> BuildType:
        build_type = BuildType.model_validate(build_new)

        try:
            self._session.add(build_type)
            self._session.commit()
            self._session.refresh(build_type)

            return build_type
        except IntegrityError:
            self._session.rollback()
            self.err_res_conflict()
        except:
            self._session.rollback()
            self.err_default()

    def update(self, build_type_id: int, build_update: BuildType) -> BuildType:
        build_type = self._session.get(BuildType, build_type_id)
        
        if not build_type: 
            self.err_not_found(build_type_id)

        try:
            update_data = build_update.model_dump(
                exclude_unset=True,
                mode="python",
            )

            build_type.sqlmodel_update(update_data)

            self._session.add(build_type)
            self._session.commit()
            self._session.refresh(build_type)

            return build_type
        except:
            self._session.rollback()
            self.err_default()

    def destroy(self, build_type_id: int) -> None:
        build_type = self._session.get(BuildType, build_type_id)

        if not build_type:
            self.err_not_found(build_type_id)
        
        try:
            self._session.delete(build_type)
            self._session.commit()
        except Exception:
            self._session.rollback()
            self.err_default()