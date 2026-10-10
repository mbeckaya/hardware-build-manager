from fastapi import Depends
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError

from controllers.base_controller import BaseController
from database.database import get_session
from models.lifecycle import Lifecycle

class LifecycleController(BaseController):
    def __init__(self, session: Session = Depends(get_session)):
            super().__init__("Lifecycle", session)

    def index(self) -> list[Lifecycle]:
        return self._session.exec(
            select(Lifecycle)
            .where(Lifecycle.component_status > 0)
            .order_by(
                Lifecycle.build_id.asc(),
                Lifecycle.created_at.desc()
            )
        ).all()
  
    def store(self, lifecycle_new: Lifecycle) -> Lifecycle:
        try:
            lifecycle = Lifecycle.model_validate(lifecycle_new)

            self._session.add(lifecycle)
            self._session.commit()
            self._session.refresh(lifecycle)

            return lifecycle

        except IntegrityError as e:
            self._session.rollback()
            self.err_res_conflict()

        except Exception as e:
            self._session.rollback()
            self.err_default()