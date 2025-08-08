Event Management CRUD App (Django + PostgreSQL + Next.js)

Overview
- Backend: Django REST Framework (function-based views), PostgreSQL, CORS enabled
- Frontend: Next.js (App Router + Pages), Axios for API calls, Tailwind CSS styles

Project structure
```
django_event_management_task/
├─ backend/
│  └─ event_management/        # Django project (DRF, events app)
└─ frontend/                   # Next.js app
```

Prerequisites
- Python 3.10+ (tested with 3.12)
- Node.js 18+ and npm
- PostgreSQL 17+

Backend (Django + DRF + PostgreSQL)
1) Create and activate a virtual environment
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
```

2) Install dependencies
```powershell
pip install --upgrade pip
pip install -r Requirements.txt
```

3) Configure database
- Default settings (in `backend/event_management/event_management/settings.py`) expect:
  - NAME: eventdb
  - USER: postgres
  - PASSWORD: root
  - HOST: localhost
  - PORT: 5432

Create DB and user (run in psql):
```sql
CREATE DATABASE eventdb;
-- If you already use the default postgres superuser, skip user creation
-- Example for a custom user instead of postgres:
-- CREATE USER event WITH PASSWORD 'root';
-- GRANT ALL PRIVILEGES ON DATABASE eventdb TO event;
```

4) Run migrations and start server
```powershell
cd event_management
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

API endpoints
- Base URL: `http://127.0.0.1:8000/api/`
- Endpoints (function-based views):
  - GET  `event_list_create`           → List all events
  - POST `event_list_create`           → Create a new event
  - GET  `event_detail/<uuid>/`        → Retrieve a single event
  - PUT  `event_detail/<uuid>/`        → Update an event
  - DELETE `event_detail/<uuid>/`      → Delete an event

Request/response examples
- Create event
```bash
curl -X POST http://127.0.0.1:8000/api/event_list_create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Meetup",
    "description": "Community meetup",
    "venue": "City Hall",
    "date": "2025-09-25",
    "time": "18:30:00"
  }'
```

- List events
```bash
curl http://127.0.0.1:8000/api/event_list_create
```

- Get one
```bash
curl http://127.0.0.1:8000/api/event_detail/<event_uuid>/
```

- Update
```bash
curl -X PUT http://127.0.0.1:8000/api/event_detail/<event_uuid>/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Meetup (Updated)",
    "description": "Updated description",
    "venue": "City Hall",
    "date": "2025-09-26",
    "time": "19:00:00"
  }'
```

- Delete
```bash
curl -X DELETE http://127.0.0.1:8000/api/event_detail/<event_uuid>/
```

Notes
- CORS: enabled in settings. During development `CORS_ALLOW_ALL_ORIGINS = True` is set; you can restrict with `CORS_ALLOWED_ORIGINS` for production.
- PostgreSQL driver: the project uses `psycopg[binary]` v3 for Windows compatibility.

Frontend (Next.js)
1) Install dependencies
```powershell
cd frontend
npm install
```

2) Start the dev server
```powershell
npm run dev
# open http://localhost:3000
```

3) API configuration
- The frontend uses `src/services/api.js` with base URL `http://127.0.0.1:8000/api`.
- To point to a different backend, edit `src/services/api.js` and change `API_BASE`.

Available screens
- Home: quick navigation to Events and Create
- Events: list of events (card layout), edit/delete actions
- Create: form to add a new event
- Edit: form to update an existing event

Using the API in code (Axios example)
```javascript
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

export const getEvents = async () => {
  const res = await axios.get(`${API_BASE}/event_list_create`);
  return res.data;
};

export const createEvent = async (data) => {
  const res = await axios.post(`${API_BASE}/event_list_create`, data);
  return res.data;
};
```

Run both apps together (development)
- Backend: `backend/event_management`: `python manage.py runserver`
- Frontend: `frontend`: `npm run dev`

Production/Deployment tips
- Backend: can be hosted on Render/Railway. Set environment variables or update `settings.py` DB config.
- Frontend: deploy on Vercel. Ensure the API base URL points to your hosted backend.
- Allowed hosts/CORS: add your deployment domains to `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`.

Common issues & fixes
- psycopg2 DLL error on Windows → use `psycopg[binary]` (already in `Requirements.txt`). Reinstall:
```powershell
cd backend
venv\Scripts\activate
pip install -r Requirements.txt
```

- PostgreSQL not running/connection refused → start PostgreSQL service, verify credentials/port.

- CORS errors from frontend → ensure backend running on `127.0.0.1:8000`, and `CORS_ALLOW_ALL_ORIGINS=True` (dev) or set your frontend URL in `CORS_ALLOWED_ORIGINS`.

License
- For interview/demo purposes.


