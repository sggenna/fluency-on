# Backend integration

## Setup

1. **Backend**
   - Copy `backend/env.example` to `backend/.env` and set `DATABASE_URL` and `JWT_SECRET`.
   - From `backend/`: `npm install`, `npx prisma generate`, `npx prisma migrate dev`, `npx prisma db seed`.
   - Run: `npm run dev` (API on http://localhost:3001).

2. **Frontend**
   - From project root: `npm run dev`.
   - Optional: set `VITE_API_URL=http://localhost:3001/api` in `.env` if the API is on another host.

## Auth

- **Student login:** `/app` → "Portal do Aluno" → email + password (role `STUDENT`).
- **Professor login:** `/app` → "Portal do Professor" → email + password (role `TEACHER`).
- Seed users:
  - Teacher: `teacher@fluencyon.com` / `admin123`
  - Student: `student@fluencyon.com` / `student123`

## API (all require `Authorization: Bearer <token>` except POST `/api/auth/login` and POST `/api/auth/register`)

| Area        | Endpoints |
|------------|-----------|
| Auth       | `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me` |
| Courses    | `GET/POST /api/courses`, `GET/PATCH/DELETE /api/courses/:id` |
| Lessons    | `GET /api/lessons?courseId=`, `GET/POST/PATCH/DELETE /api/lessons/:id` |
| Materials  | `GET /api/materials?courseId=&lessonId=`, `POST/PATCH/DELETE /api/materials/:id` |
| Students   | `GET/POST /api/students`, `GET/PATCH/DELETE /api/students/:id` (teacher) |
| Enrollments| `GET /api/enrollments`, `POST/PATCH/DELETE /api/enrollments/:id` |
| Assignments| `GET /api/assignments?lessonId=`, `GET/POST/PATCH/DELETE /api/assignments/:id` |
| Submissions| `GET /api/submissions?assignmentId=`, `POST /api/submissions`, `PATCH /api/submissions/:id` (grade) |
| Progress   | `GET /api/progress`, `POST /api/progress`, `PATCH /api/progress/:id` |
| Announcements | `GET/POST/PATCH/DELETE /api/announcements` |
| Schedules  | `GET/POST/PATCH/DELETE /api/schedules` |

## Frontend wiring status

- **Student:** Dashboard (enrollments, progress, lessons, schedules), Notifications (announcements), Sidebar (user + logout). LessonLibrary, Homework, Materials, Calendar, Analytics, InteractiveResources still use local/mock data; they can be wired to the same APIs.
- **Professor:** StudentManagement (list, create via AddStudentWizard, delete), AddStudentWizard (create student + enrollments). CourseManagement, LessonManagement, MaterialManagement, AssignmentManagement, ProgressTracking, AnnouncementManagement, ScheduleManagement can be wired to the corresponding API modules in `src/api/`.
