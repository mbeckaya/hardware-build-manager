from fastapi import FastAPI, Depends

from controllers.build_controller import BuildController
from models.build import Build
from routes.build_routes import router as build_router
from routes.build_types_routes import router as build_type_router
from routes.lifecycle_routes import router as lifecylce_router

app = FastAPI(title="Hardware Build Manager", version="1.0.0")

app.include_router(build_router)
app.include_router(build_type_router)
app.include_router(lifecylce_router)

@app.get("/")
def root():
    return {"message": "API is running"}