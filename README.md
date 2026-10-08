# Hardware Build Manager

A full-stack application for creating, managing, maintaining, and exporting computer builds.

The project demonstrates a modern web application architecture with a **React + TypeScript frontend**, **FastAPI backend**, **MariaDB database**, and **Docker-based development environment**.

---

## Features

### Build Management

Computer builds support full **CRUD functionality** and contain structured hardware and maintenance data.

Each Build includes:

**General**
- Unique build name
- Build type
- Creation date

**CPU**
- CPU name
- CPU service date

**GPU**
- GPU name
- GPU service date

**RAM**
- RAM name
- RAM service date

**Storage**
- Storage name
- Storage service date

**Power Supply**
- PSU name
- PSU service date

**Mainboard**
- Mainboard name
- Mainboard service date

**CPU Cooler**
- CPU cooler name
- CPU cooler service date

**Case**
- Case name
- Case service date

**Operating System**
- Operating system name
- OS service date

**Sound Card**
- Optional sound card
- Sound card service date

**Maintenance**
- Last maintenance date
- Last maintenance comment
- Next maintenance date
- Next maintenance comment

The model uses structured relationships, validation, optional fields, unique constraints, and indexed foreign keys.

---

## Tech Stack

### Frontend
- ⚛️ **React + TypeScript** — Component-based user interface
- 🧰 **Redux Toolkit** — Application state management
- 🔄 **RTK Query** — API communication and server-state management
- 🎨 **Tailwind CSS** — Utility-first styling
- 🌼 **daisyUI** — Reusable UI components

### Backend
- 🐍 **Python + FastAPI** — Versioned REST API
- 📐 **Pydantic** — Request and response validation
- 🗃️ **SQLModel** — ORM and typed database models
- 📄 **CSV Export** — Structured Build data export

### Database & Persistence
- 🗄️ **MariaDB** — Relational database
- 🔄 **Alembic** — Database schema migrations
- 🔗 **Foreign Keys & Indexes** — Relational data modeling
- ✅ **Constraints & Validation** — Data integrity and consistency

### Testing
- 🧪 **pytest** — Backend/API testing
- 🌐 **HTTPX** — HTTP client for API tests

### Infrastructure
- 🐳 **Docker** — Containerization
- 🐳 **Docker Compose** — Multi-service development environment

### API & Documentation
- 📖 **OpenAPI / Swagger UI** — Interactive API documentation
- 🔌 **REST** — Communication between frontend and backend

---

### Build Types

Builds can be categorized using configurable build types, for example:

- Gaming PC
- Office PC
- Workstation
- Streaming PC
- Video Editing PC
- AI PC

Build types support full **CRUD operations**.

---

### CSV Export

Build data can be exported as a **structured CSV file**.

The export includes the extended Build data model, including:

- Build information
- Hardware components
- Component service dates
- Maintenance dates
- Maintenance comments
- Optional components

This provides a standardized format for further processing, reporting, spreadsheet applications, or external systems.

---

### REST API

The backend provides a **versioned REST API** built with FastAPI.

Key capabilities include:

- CRUD operations for Builds
- CRUD operations for Build Types
- Structured request and response models
- Pydantic validation
- Extended Build data support
- CSV export
- Automatic Swagger/OpenAPI documentation

---

### Database & Persistence

- **MariaDB** for persistent relational storage
- **SQLModel** for ORM and database models
- **Alembic** for database migrations
- Foreign-key relationship between Builds and Build Types
- Unique constraint for Build names
- Indexed Build Type references
- Extended Build schema supporting hardware and maintenance data

### Testing

Backend API tests use **pytest + HTTPX** and cover:

- Collection retrieval
- Individual resource retrieval
- Resource creation
- Resource updates
- Resource deletion
- Response validation
- HTTP status codes

---

## Architecture

```text
┌─────────────────────────┐
│ React + TypeScript      │
│ Redux Toolkit           │
│ RTK Query               │
│ Tailwind CSS + daisyUI  │
└────────────┬────────────┘
             │ REST API
             ▼
┌─────────────────────────┐
│ FastAPI                 │
│ Pydantic + SQLModel     │
│ Build Management        │
│ Maintenance Data        │
│ CSV Export              │
└────────────┬────────────┘
             │ SQL
             ▼
┌─────────────────────────┐
│ MariaDB                 │
│ Alembic Migrations      │
└─────────────────────────┘
```

The frontend communicates with the backend through the REST API.

The backend handles:

- API requests
- Data validation
- Build management
- Persistence
- Maintenance data
- CSV export

MariaDB provides persistent relational storage.

All services can be run using **Docker Compose**.

---

## Project Structure

```text
hardware-build-manager/
├── api/    # FastAPI backend, models, migrations and tests
└── web/    # React + TypeScript frontend
```

The `api/` directory contains the backend application, database models, migrations, API logic, CSV export functionality, and tests.

The `web/` directory contains the React frontend, UI components, and client-side state management.

---

## API Documentation

FastAPI automatically provides interactive **Swagger/OpenAPI documentation** for exploring and testing the available endpoints.

The API documentation exposes the structured Build data model and its available operations.

---

## Development

The complete development environment can be started using **Docker Compose**:

```text
React → FastAPI → MariaDB
```

The containerized setup provides a consistent development environment for frontend, backend, and database services.

---

## Future Development

The current implementation provides the foundation for further functionality around:

- Computer build management
- Component maintenance tracking
- Data export
- Reporting and analysis
- External integrations
- Additional build and maintenance features