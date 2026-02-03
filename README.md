# Fluency On

A learning management platform for Fluency On, an english teaching course managed by Jamile Oliveira. She can manage students and content; students log in to access lessons, materials, homework, and track their progress (Khan Academy–style).

It includes a **landing page** (courses, methodology, pricing, testimonials, FAQ, contact), a **teacher portal** (students, courses, materials, schedule, announcements), and a **student portal** (dashboard, lesson library, progress, homework, materials, calendar, settings).

**Live demo:** [https://fluency-on-deploy.vercel.app/app](https://fluency-on-deploy.vercel.app/)

---

## How to use it

**Prerequisites:** Node.js 18+, PostgreSQL.

1. **Clone and install (frontend)**
   ```bash
   git clone <repo-url>
   cd fluencyon-1
   npm install
   ```

2. **Backend**
   ```bash
   cd backend
   cp env.example .env
   ```
   Edit `.env`: set `DATABASE_URL` (PostgreSQL) and `JWT_SECRET`. Optionally set `RESEND_API_KEY` and `RESEND_FROM` so invitation emails are sent (see `backend/EMAIL_SETUP.md`).
   ```bash
   npm install
   npm run prisma:generate
   npm run prisma:migrate
   npm run dev
   ```
   API runs at **http://localhost:3001**.

3. **Frontend**
   From the project root (in another terminal):
   ```bash
   npm run dev
   ```
   Open **http://localhost:5173**. Make sure the backend is running; set `VITE_API_URL` to the API URL (e.g. `http://localhost:3001`) if needed.

4. **Production build:** `npm run build` (output in `build/`).
