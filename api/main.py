from fastapi import FastAPI, Depends

from controllers.build_controller import BuildController
from models.build import Build
from routes.build_routes import router as build_router

app = FastAPI(title="Hardware Build Manager", version="1.0.0")

app.include_router(build_router)

@app.get("/")
def root():
    return {"message": "API is running"}