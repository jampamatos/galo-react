# THE GALO REACT PROJECT

Galo React is going to be a website that displays statistics from Clube Atlético Mineiro (**Galo**), integrating with the [API-Football](https://www.api-football.com/). The backend (FastAPI + PostgreSQL) will process and store the data, while the frontend (React + TypeScript) will display interactive graphs and tables. The project will be hosted on [Railway](https://railway.com/) (backend and DB) and [Netlify](https://www.netlify.com/) (frontend), with automatic data updating.

## 1. Project Overview

### 1.1. Main Objective

Develop a **football statistics website** focused on **Clube Atlético Mineiro**, integrating with the API-Football to:

1. **Collect** data for all available seasons.
2. **Process** the data using **Python + Pandas** for cleaning and statistical calculations.
3. **Store** the processed data in **PostgreSQL**.
4. **Expose** the data through a **FastAPI REST API**.
5. **Consume** the API in a **React + TypeScript** frontend to display charts, tables, and insights.

### 1.2. Expected Results

- **Fully responsive**, structured, and functional website.
- **Interactive pages** displaying tables, charts, and relevant insights.
- **Automated updates** following the API’s update frequency.
- Clean **architecture**, showcasing skills in **Data Engineering**, **Backend**, and **Frontend Development**.

### 1.3. Hosting Setup

- **Backend & Database**: Hosted on **Railway** (PostgreSQL + FastAPI).
- **Frontend**: Hosted on **Netlify** (static site deployment).

### 1.4. Tech Stack

- **Backend**: FastAPI, Python, Pandas, SQLAlchemy, Alembic, pytest.
- **Database**: PostgreSQL (hosted on Railway).
- **Frontend**: React, TypeScript, Vite, React Query, Recharts, CSS Modules.
- **Version Control**: Git + GitHub.

---

## 2. Project Architecture

### 2.1. Data Layer (PostgreSQL)

- Railway provides a managed **PostgreSQL instance** with a `DATABASE_URL`.
- The project will use **SQLAlchemy** to interface with the database.
- Migrations will be handled with **Alembic**.

### 2.2. Processing Layer (Python + Pandas)

- Python scripts will:
  - **Fetch** raw football data from API-Football.
  - **Load** into Pandas DataFrames.
  - **Clean & transform** the data.
  - **Compute additional statistics** (goal averages, performance metrics).
  - **Store processed data** into PostgreSQL.

### 2.3. API Layer (FastAPI)

- Exposes REST endpoints:
  - `/update-data` → Triggers API data retrieval and processing.
  - `/team-stats`, `/season-stats`, etc. → Provides processed data for the frontend.
- **Automatic documentation** available at `/docs`.

### 2.4. Frontend Layer (React + TypeScript)

- **Frontend**: Pages displaying statistics, tables, and interactive charts.
- **React Query**: Caching and revalidation of backend data.
- **CSS Modules**: Isolated styling per component.

### 2.5. Hosting and Deployment Workflow

- **Railway**:
  - **Service 1**: PostgreSQL database.
  - **Service 2**: FastAPI backend (automatic deploy from GitHub).
- **Netlify**: Deploying the React frontend (static site hosting).

---

## 3. Recommended Project Structure

The GitHub repository will follow this structure:

```plaintext
galo-react/
├── backend/
│   ├── requirements.txt
│   ├── main.py               # FastAPI entry point
│   ├── update_data.py        # Data retrieval & processing script
│   ├── db/
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── database.py       # Database engine and session setup
│   │   └── migrations/       # Alembic migrations
│   ├── core/
│   │   ├── config.py         # Environment variable management
│   │   └── logging.py        # Logging setup
│   └── tests/
│       └── ...               # pytest unit and integration tests
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tsconfig.json
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── components/
│   │   └── pages/
│   └── public/
├── .gitignore
├── README.md
└── ...
```

---

## 4. Roadmap (Phases & Tasks)

### Phase 0: Environment Setup

- [X] Create **GitHub repository** (`galo-react`), initialize README and `.gitignore`.
- [X] Install **Python 3.9+, Node.js (LTS)**, and **PostgreSQL** (optional for local dev).
- [ ] Organize project folders (backend for FastAPI, frontend for React).
- [ ] Create and activate a **Python virtual environment**, install dependencies.

**Completion Criteria**: Project environment is set up, GitHub repository is configured.

---

### Phase 1: Database and ORM Models

- [ ] Set up **PostgreSQL** in Railway and obtain `DATABASE_URL`.
- [ ] Define **SQLAlchemy models** (`Season`, `Team`, `Match`, etc.).
- [ ] Initialize **Alembic**, configure `env.py`, and generate migrations.
- [ ] Run **database migrations** to create tables.

**Completion Criteria**: Database is structured and accessible through SQLAlchemy.

---

### Phase 2: Backend (FastAPI) and Data Processing

- [ ]  Create `main.py`, define FastAPI instance and `/healthcheck` endpoint.
- [ ]  Implement `update_data.py`:
  - [ ] Fetch **football data** via API request.
  - [ ] Clean & process using **Pandas**.
  - [ ] Store **computed statistics** in PostgreSQL.
- [ ] Create `/update-data` endpoint to trigger data updates.
- [ ] Implement `/team-stats` and `/season-stats` endpoints.
- [ ] **Write unit tests** for API requests and data processing.

**Completion Criteria**: Backend is functional locally, capable of fetching, processing, and storing data.

---

### Phase 3: Deploy Backend on Railway

- [ ] Link Railway project to **GitHub repository** (`backend` folder).
- [ ] Configure **Build Command**: `pip install -r requirements.txt`.
- [ ] Configure **Start Command**:

```bash
alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port $PORT
```

- [ ] Define `DATABASE_URL` and API credentials as environment variables.
- [ ] Validate API endpoints (`/healthcheck`, `/team-stats`) in production.

**Completion Criteria**: FastAPI backend is running on Railway, accessible publicly.

---

### Phase 4: Frontend Development (React + TypeScript)

- [ ] Initialize React project using **Vite + TypeScript**.
- [ ] Install dependencies:

```bash
npm install react-query recharts axios
```

- [ ] Set up API connection (`VITE_API_URL`).
- [ ] Implement reusable **components**:
  - [ ] Table for statistics.
  - [ ] Card for key highlights.
  - [ ] Charts using **Recharts**.
- [ ] Build pages:
  - [ ] **Home Page**: Key insights.
  - [ ] **Season Stats**: Historical data view.

**Completion Criteria**: React frontend is functional locally, integrating with the backend.

---

### Phase 5: Deploy Frontend on Netlify

- [ ] Connect Netlify to GitHub (`frontend` folder).
- [ ] **Set Build Command**: `npm run build`, **Publish Directory**: `dist`.
- [ ] Configure `_redirects` file for React Router:

```bash
/* /index.html 200
```

- [ ]  Validate frontend functionality in production.

**Completion Criteria**: Frontend is live on Netlify, fetching backend data.

---

### Phase 6: Automation & Optimization

- [ ] Schedule a **CRON job** to call `/update-data`.
- [ ] Monitor logs on Railway.
- [ ] Optimize API response times & caching strategies.

---

## 5. Conclusion

This action plan provides a clear and structured roadmap to follow, ensuring that the project is built in a scalable, efficient, and maintainable way. By completing this plan, the Galo React project will serve as a strong portfolio piece demonstrating backend, frontend, and data engineering skills.

🚀 Let's build it!
