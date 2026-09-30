# Hardware Build Manager

<!-- > 🚧 **Status: In Planning** -->


> 🚧 **Status: In Progress**


<!--
> ✅ **Status: Completed**
-->

<!--
> 🔄 **Status: Maintenance**
-->

A full-stack application for creating, managing, and tracking computer builds, hardware components, compatibility, purchases, maintenance, and upgrades.

## About the Project

The project aims to provide a structured way to manage computer systems and their hardware components instead of relying on spreadsheets or scattered notes.

The application is designed to support different types of computer systems, such as:

* Gaming PCs
* Office PCs
* Workstations
* Streaming PCs
* Video Editing PCs
* AI PCs

## Project Status

The project is currently in the planning phase.

The initial MVP will focus on the core concepts of:

* **Builds**
* **Hardware Components**

The exact domain model, features, architecture, and technology stack are still being explored and will evolve during development.

## MVP

The initial version is planned to provide a foundation for:

* Creating and managing computer builds
* Creating and managing hardware components
* Associating components with builds
* Storing relevant hardware information

Additional functionality will be defined as the project evolves.

## Tech Stack

### Backend

- ⚡ **Python + FastAPI** — High-performance asynchronous REST API
- 📐 **Pydantic** — Data validation and settings management
- 🗃️ **SQLModel & Alembic** — Modern Python ORM (built on SQLAlchemy) & database migrations
- 🗄️ **MariaDB** — Relational database
- 🧪 **pytest & HTTPX** — API testing

### Frontend

- ⚛️ **React + TypeScript**
- 🧰 **Redux Toolkit + RTK Query** — State management & efficient data fetching
- 🎨 **Tailwind CSS + daisyUI** — UI styling & components

### Infrastructure

- 🐳 **Docker + Docker Compose**

## Project Structure

```text
hardware-build-manager/
├── api/   # Python + FastAPI + SQLModel + Alembic
└── web/   # React + TypeScript + Redux Toolkit
```

<!-- ```shell
    python -m venv .venv

    .venv\Scripts\Activate.ps1

    pip install fastapi uvicorn sqlmodel pymysql alembic

    pip freeze > requirements.txt 

    alembic init alembic    

    alembic revision --autogenerate -m "create tasks table"

    alembic upgrade head 

    alembic downgrade base

    python -m database.seed

    uvicorn main:app --reload
``` -->