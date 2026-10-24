from contextlib import asynccontextmanager

from fastapi import FastAPI

from database.migrations import run_migrations
from database.seed import seed_database
from routes.build_routes import router as build_router
from routes.build_types_routes import router as build_type_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    run_migrations()
    seed_database()
    yield


app = FastAPI(
    title="Hardware Build Manager",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(build_router)
app.include_router(build_type_router)

@app.get("/")
def root():
    return {"message": "API is running"}