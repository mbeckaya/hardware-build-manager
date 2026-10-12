# Hardware Build Manager

A full-stack web application for managing computer builds, tracking hardware maintenance, and exporting structured build data.

The project demonstrates end-to-end application development using a modern TypeScript frontend, a Python REST API, and a relational database, with a focus on **clean architecture, data integrity, API design, and automated testing**.

## Tech Stack

- **Frontend:** React, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS, daisyUI
- **Backend:** Python, FastAPI, Pydantic, SQLModel
- **Database:** MariaDB, Alembic, relational modeling, foreign keys, indexes, and database constraints
- **Testing:** pytest, HTTPX
- **Infrastructure:** Docker, Docker Compose
- **API:** Versioned REST API, OpenAPI, Swagger UI
- **Data Export & Reporting:** CSV export, JSON lifecycle reports

## Key Features

### Build Management

- Full CRUD functionality for computer builds.
- Structured hardware data covering CPU, GPU, RAM, storage, power supply, mainboard, CPU cooler, case, operating system, and optional sound cards.
- Build metadata, including unique names, build types, and creation dates.
- Configurable build types with full CRUD operations, such as Gaming PC, Office PC, Workstation, Streaming PC, Video Editing PC, and AI PC.

### Maintenance Tracking

- Component-specific service dates for all supported hardware categories.
- Last and upcoming maintenance dates.
- Maintenance comments and history.

### Lifecycle Checker

- **Automated Lifecycle Analysis:** A manually triggered Python job evaluates hardware component lifecycles and identifies warning and critical states based on service life thresholds.
- **JSON Reporting:** Generates structured lifecycle reports and stores them in the backend for further processing.
- **Proactive Maintenance Insights:** Helps identify aging hardware components and assess potential maintenance needs.

### CSV Export

- Exports structured build data to CSV.
- Includes build information, hardware components, component service dates, maintenance dates, comments, and optional components.
- Supports further processing in spreadsheet applications and external systems.

### REST API

- Versioned REST API built with FastAPI.
- CRUD endpoints for builds and build types.
- Structured request and response models with Pydantic validation.
- Automatic OpenAPI documentation and interactive Swagger UI.

### Database & Data Integrity

- MariaDB for persistent relational storage.
- SQLModel for ORM and typed database models.
- Alembic for database schema migrations.
- Foreign-key relationships between builds and build types.
- Unique constraints, indexed references, and validated data models.

### Automated API Testing

Backend API tests use **pytest and HTTPX** to cover:

- Collection and individual resource retrieval.
- Resource creation, updates, and deletion.
- Response validation and HTTP status codes.

## Architecture

```text
┌─────────────────────────────────┐
│ React + TypeScript              │
│ Redux Toolkit + RTK Query       │
│ Tailwind CSS + daisyUI          │
└────────────────┬────────────────┘
                 │ REST API
                 ▼
┌─────────────────────────────────┐
│ FastAPI                          │
│ Pydantic + SQLModel              │
│ Build & Maintenance Management   │
│ Lifecycle Checker Reports        │
│ CSV Export                       │
└────────────────┬────────────────┘
                 │ SQL
                 ▼
┌─────────────────────────────────┐
│ MariaDB                          │
│ Alembic Migrations               │
└─────────────────────────────────┘
```

The frontend communicates with the backend through the REST API. The backend handles request validation, build management, maintenance data, persistence, lifecycle reports, and CSV exports.

The application services run in a Docker Compose development environment.

## Project Structure

```text
hardware-build-manager/
├── api/    # FastAPI backend, models, migrations, jobs and tests
└── web/    # React + TypeScript frontend
```

- **`api/`** contains the backend application, database models, migrations, API logic, lifecycle checker, report handling, CSV export functionality, and tests.
- **`web/`** contains the React frontend, UI components, and client-side state management.

## Development

Start the application stack using Docker Compose:

```bash
docker compose up --build -d
```

### Run Lifecycle Checker

Manually execute the hardware lifecycle analysis and generate JSON reports:

```bash
docker compose exec api python ./jobs/lifecycle_checker.py
```

### Run Backend Tests

Execute the backend test suite using pytest:

```bash
docker compose exec api python -m pytest
```

## API Documentation

FastAPI automatically provides interactive **Swagger/OpenAPI documentation** for exploring and testing available endpoints.

The documentation exposes the API operations and structured request and response models.

## Engineering Highlights

- End-to-end development across frontend, backend, and database layers.
- Type-safe frontend development and structured backend data models.
- REST API design with automatic OpenAPI documentation.
- Relational database design, integrity constraints, and schema versioning.
- Automated API testing with pytest and HTTPX.
- Python-based lifecycle analysis with threshold evaluation and JSON report generation.
- CSV export and structured report handling.
- Containerized development using Docker and Docker Compose.

## Project Status

The project is complete and demonstrates a full-stack application with hardware build management, maintenance tracking, lifecycle analysis, data exports, and automated API testing.