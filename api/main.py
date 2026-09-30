from fastapi import FastAPI, Depends
from sqlmodel import Session, select

from database.database import get_session
from models.build import Build

app = FastAPI(title="Hardware Build Manager", version="1.0.0")

@app.get("/api/v1/builds/", response_model=list[Build])
def get_builds(session: Session = Depends(get_session)):
    builds = session.exec(select(Build)).all()

    return builds
