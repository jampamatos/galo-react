# DEVELOPMENT DIARY - THE GALO REACT PROJECT

This **Development Diary** will document each milestone and key decision made during the implementation of **Galo React**, ensuring a **clear progression log** for future reference and potential recruiters, or people who are generally interested in the project.

---

## 📅 Date: 02/05/2025

### 🚀 Feature Implemented: Project Setup & Initial Repository Configuration

- [X] Created an **Action Plan** to to track development progress.
- [X] Created **GitHub repository** (`galo-react`), including `README.md` and .`gitignore`.
- [X] Set up a **GitHub Project (Kanban style)** to manage development tasks via GitHub Issues.
- [X] Structured the project folders (`backend` for FastAPI, `frontend` for React).
- [X] Created and activated a **Python virtual environment**, then installed required dependencies.

### 📖 Personal Notes for Day 1

Since I’ve never worked with React before, nor explicitly handled external API calls while maintaining a database, I’m really excited to get my feet wet. To move forward, I did some research on optimizing the architecture and carefully planned how to approach each step.

So far, the [Action Plan](ACTION_PLAN.md) looks well-structured, and by leveraging [GitHub Project](https://github.com/users/jampamatos/projects/5/) for organization, I feel confident in staying on track and pulling this off.

### 🛠 Challenges faced

- Defining the architecture and selecting the right tools for the job.
- Learning on the fly, as many of these technologies are new to me, so I’m adapting as I go.

⏭ Next Steps:

- Set up **PostgreSQL** in Railway and obtain `DATABASE_URL`.
- Define **SQLAlchemy models** (`Season`, `Team`, `Match`, etc.).
- Initialize **Alembic**, configure `env.py`, and generate migrations.
- Run **database migrations** to create tables.

🔗 **Commit Reference**: [Initial Commit](https://github.com/jampamatos/galo-react/commit/6bca3b194eea4b8cbbcff58c90f8d8fb3624324f).

---

## 📅 Date: 02/05/2025 and 02/06/2025

### 🚀 Feature Implemented: Database & ORM Models Setup

These days were all about setting up **PostgreSQL**, defining **SQLAlchemy** models, and configuring **Alembic** to handle database migrations.

- [X] **Set up PostgreSQL locally** using Docker, ensuring a stable local database environment for development.
- [X] Successfully started and restarted the PostgreSQL container when needed (`docker start pg_local`).
- [X] **Configured the project to use SQLAlchemy ORM**, structuring all models (`League`, `Season`, `Team`, `Match`, `Player`, etc.) in `backend/db/models.py`.
- [X] Organized SQLAlchemy models and relationships, ensuring `ForeignKey` and `relationship()` were correctly implemented.
- [X] **Initialized Alembic** (`alembic init`), configured `env.py`, and ensured it properly detected our `Base.metadata`.
- [X] Created and successfully applied **database migrations** to PostgreSQL using Alembic.
- [X] Troubleshot and resolved multiple Alembic migration issues, including:
  - Missing model imports in `env.py`.
  - Ensuring Alembic detected models correctly.
  - Resetting the migration history when necessary.
  - Manually fixing directory structure issues preventing migration generation.
- [X] Verified that **all tables were successfully created** in PostgreSQL (`\dt` command confirmed).

### 📖 Personal Notes for Databasing

Today was a deep dive into database management! 🚀 This was my first time handling SQLAlchemy, Alembic, and PostgreSQL in Docker, and while I faced a lot of issues, I learned how to properly structure and apply database migrations.

I now feel way more confident working with database migrations and debugging common problems in Alembic + SQLAlchemy workflows.

However, I can't shake the feeling that there must be some kind of messing up in the database relationships, or data types, or something else entirely. I don't feel 100% confident, but, if bugs come along the way, we might as well crush them!

### 🛠 Challenges Faced & Debugging Wins

- **Alembic not detecting models** → Fixed by ensuring `from backend.db import models` was explicitly imported in `env.py`.
- **Migrations not being applied** → Fixed by completely resetting `alembic_version` in the database and regenerating migrations.
- **Database connection issues (Railway)** → Decided to use a local PostgreSQL instance via Docker to speed up development.
- **Migration directory errors** → Manually recreated `migrations/versions/` to allow Alembic to generate new migrations.

### Next Steps for Week 2

- Create `main.py`, define FastAPI instance and `/healthcheck` endpoint.
- Implement `update_data.py`:
  - Fetch **football data** via API request.
  - Clean & process using **Pandas**.
  - Store **computed statistics** in PostgreSQL.
- Create `/update-data` endpoint to trigger data updates.
- Implement `/team-stats` and `/season-stats` endpoints.
- **Write unit tests** for API requests and data processing.

🔗 Commit Reference: (To be added once committed to GitHub)
