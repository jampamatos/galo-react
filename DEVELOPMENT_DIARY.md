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

### 📖 Personal Notes

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

🔗 **Commit Reference**: [Initial Commit](https://github.com/jampamatos/galo-react/commit/4d5ba77454a24c15eadafad7203c6087dfaf86e5).
