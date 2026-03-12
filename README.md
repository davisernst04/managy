# Managy

Full-stack booking and operations platform for hospitality and community venues. The project includes a Django REST backend and a Next.js frontend for managing amenities, events, bookings, and user accounts.

## Overview

Managy is designed for small venues that need a structured way to manage space usage without relying on ad hoc spreadsheets or manual coordination. The system supports:

- user registration and authentication
- amenity and event management
- booking workflows
- administrative tools for user and venue operations

## Architecture

- `backend/` - Django and Django REST Framework API
- `frontend/` - Next.js application

## Stack

### Frontend

- Next.js 15
- React 18
- Tailwind CSS

### Backend

- Django 5
- Django REST Framework
- Simple JWT
- PostgreSQL-compatible Django data layer

## Core Features

- Account registration and login
- Role-aware administrative flows
- Amenity creation, editing, search, and deletion
- Event creation, scheduling, and registration
- Booking records for amenities and events
- Password reset and account management endpoints

## Repository Structure

```text
managy/
├── backend/
│   ├── api/
│   ├── backend/
│   ├── data/
│   └── users/
├── frontend/
│   ├── public/
│   └── src/
├── git-u.bash
└── README.md
```

## Getting Started

### Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The Django API runs on the default local development port unless configured otherwise.

### Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## API Areas

The backend exposes endpoints for:

- notes
- amenities
- amenity bookings
- events
- event registrations
- user administration
- password reset
- media and file uploads

See `backend/api/urls.py` and `backend/backend/urls.py` for the current route definitions.

## Frontend Scripts

Run these from `frontend/`:

- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm run start` - run the production build
- `npm run lint` - run linting

## Notes

The repository also includes a helper script, `git-u.bash`, for streamlined local commits. Project-specific configuration, environment variables, and deployment details should be documented alongside the frontend and backend environments as the system evolves.
