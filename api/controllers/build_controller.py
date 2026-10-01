from fastapi import Depends
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError

from controllers.base_controller import BaseController
from database.database import get_session
from models.build import Build

class BuildController(BaseController):
    def __init__(self, session: Session = Depends(get_session)):
        super().__init__("Build", session)

    def index(self) -> list[Build]:
        return self._session.exec(select(Build)).all()

    def show(self, build_id: int) -> Build:
        build = self._session.get(Build, build_id)

        if not build: 
            self.err_not_found(build_id)

        return build

    def store(self, build_new: Build) -> Build:
        build = Build.model_validate(build_new)

        try:
            self._session.add(build)
            self._session.commit()
            self._session.refresh(build)

            return build
        except IntegrityError:
            self._session.rollback()
            self.err_res_conflict()
        except:
            self._session.rollback()
            self.err_default()

    def update(self, build_id: int, build_update: Build) -> Build:
        build = self._session.get(Build, build_id)
        
        if not build: 
            self.err_not_found(build_id)

        try:
            update_data = build_update.model_dump(
                exclude_unset=True,
                mode="python",
            )

            build.sqlmodel_update(update_data)

            self._session.add(build)
            self._session.commit()
            self._session.refresh(build)

            return build
        except:
            self._session.rollback()
            self.err_default()

    def destroy(self, build_id: int) -> None:
        build = self._session.get(Build, build_id)

        if not build:
            self.err_not_found(build_id)
        
        try:
            self._session.delete(build)
            self._session.commit()
        except Exception:
            self._session.rollback()
            self.err_default()