# Hardware Build Manager

> ✅ **Status: Completed**

A full-stack application for creating, managing, and tracking computer builds.

The **Hardware Build Manager** provides a structured way to manage computer configurations, hardware specifications, build types, and maintenance information.

The current version provides a fully functional application with a React frontend, FastAPI backend, MariaDB database, and Docker-based development environment.

---

## About the Project

The Hardware Build Manager is designed to provide a central place for managing computer systems and their hardware configurations.

Instead of relying on spreadsheets or scattered notes, the application provides a structured way to create and maintain computer builds.

Builds can represent different types of computer systems, including:

* Gaming PCs
* Office PCs
* Workstations
* Streaming PCs
* Video Editing PCs
* AI PCs

The current implementation focuses on the core functionality required to manage these configurations. The project may be extended with additional functionality over time.

---

## Features

### Build Management

Computer builds can be created and managed through the application.

A build can contain information about:

* Build name
* Build type
* CPU
* GPU
* Mainboard
* RAM
* Storage
* CPU cooler
* Power supply
* Case
* Sound card
* Operating system
* Creation date
* Last maintenance date
* Next maintenance date
* Maintenance comments

Builds support complete CRUD functionality:

* Create
* Read
* Update
* Delete

### Build Types

Build types can be used to categorize computer builds.

Examples include:

* Gaming PC
* Office PC
* Workstation
* Streaming PC
* Video Editing PC
* AI PC

Build types also support complete CRUD functionality.

### REST API

The backend provides a versioned REST API for managing the application's data.

The API is built with **FastAPI** and provides automatic interactive API documentation through Swagger UI.

### Data Validation

Request and response data is validated using structured models with **Pydantic** and **SQLModel**.

### Database

Application data is stored persistently in a **MariaDB** relational database.

Database schema changes are managed using **Alembic** migrations.

### Testing

The backend includes API tests using **pytest** and **HTTPX**.

The current test suite covers the CRUD lifecycle of the main API resources, including:

* Retrieving collections
* Retrieving individual resources
* Creating resources
* Updating resources
* Deleting resources
* Validating API responses
* Verifying HTTP status codes

---

## Architecture

The application consists of a React frontend, a FastAPI backend, and a MariaDB database.

```text
┌─────────────────────┐
│      Frontend       │
│ React + TypeScript  │
└──────────┬──────────┘
           │
           │ REST API
           ▼
┌─────────────────────┐
│       Backend       │
│ Python + FastAPI    │
└──────────┬──────────┘
           │
           │ SQL
           ▼
┌─────────────────────┐
│      Database       │
│      MariaDB        │
└─────────────────────┘
```

The frontend communicates with the backend through the REST API.

The backend is responsible for API handling, data validation, application logic, and database access.

MariaDB provides persistent storage for the application.

All required services can be run using Docker and Docker Compose.

---

## Tech Stack

### Backend

* ⚡ **Python + FastAPI** — REST API framework
* 📐 **Pydantic** — Data validation and settings management
* 🗃️ **SQLModel** — ORM and database models
* 🔄 **Alembic** — Database migrations
* 🗄️ **MariaDB** — Relational database
* 🧪 **pytest + HTTPX** — API testing

### Frontend

* ⚛️ **React + TypeScript** — User interface
* 🧰 **Redux Toolkit** — State management
* 🔄 **RTK Query** — API communication and data fetching
* 🎨 **Tailwind CSS** — UI styling
* 🌼 **daisyUI** — UI components

### Infrastructure

* 🐳 **Docker** — Containerization
* 🐳 **Docker Compose** — Development environment and service orchestration

---

## Project Structure

```text
hardware-build-manager/
│
├── api/                    # Python + FastAPI backend
│
└── web/                    # React + TypeScript frontend
```

The `api/` directory contains the backend application, database models, migrations, and tests.

The `web/` directory contains the frontend application and client-side state management.

---

## Development

The application is designed to run in a Docker-based development environment using Docker Compose.

The main components are:

```text
React
  │
  ▼
FastAPI
  │
  ▼
MariaDB
```

This provides a self-contained environment for running the frontend, backend, and database together.

---

## API Documentation

The FastAPI backend automatically provides interactive API documentation through **Swagger UI**.

The API documentation can be used to explore and test the available endpoints directly.

---

## Future Development

The current implementation provides the foundation of the Hardware Build Manager.

The project may be extended with additional functionality in the future as new ideas and requirements emerge.

The exact scope and direction of future development are intentionally left open.

