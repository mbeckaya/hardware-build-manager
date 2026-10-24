from csv import writer
from datetime import datetime
from fastapi import Depends
from fastapi.responses import FileResponse
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError

from controllers.base_controller import BaseController
from database.database import get_session
from models.build import Build
from utils.csv_exporter import CsvExporter

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

    def export_csv(self) -> FileResponse:
        fields = [
            "id",
            "name",
            "build_type_id",
            "cpu_name",
            "gpu_name",
            "ram_name",
            "storage_name",
            "psu_name",
            "mainboard_name",
            "cpu_cooler_name",
            "case_name",
            "os_name",
            "sound_card_name",
            "last_maintenance_at",
            "last_maintenance_comment",
            "next_maintenance_at",
            "next_maintenance_comment",
            "created_at",
        ]

        builds = self._session.exec(select(Build)).all()

        rows = []
        
        for build in builds:
            row = []

            for field in fields:
                value = getattr(build, field)
                row.append(value)

            rows.append(row)

        headers = fields

        csv_exporter = CsvExporter("builds")
        csv_exporter.generate(headers, rows)

        return FileResponse(
            path=csv_exporter.get_path(),
            media_type="text/csv",
            filename=csv_exporter.get_filename(),
        )