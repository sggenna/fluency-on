# Platform (Student & Professor)

After the **landing page** (`/`), users go to **`/app`** and choose:

- **Platform — Student** (Portal do Aluno)
- **Platform — Professor** (Portal do Professor)

---

## Structure

```
platform/
├── App.tsx              # Selector: choose Student or Professor
├── PlatformApp.tsx      # Wrapper for /app (body class, styles)
├── styles/              # Shared: tokens, semantic CSS (selector + student UI)
│
├── student/             # Platform — Student
│   ├── App.tsx          # Student app root (sidebar + main)
│   └── components/      # Dashboard, Sidebar, LessonLibrary, Homework,
│                        # Materials, Calendar, Notifications, Analytics,
│                        # InteractiveResources, ProgressTracking, ui/, figma/
│
└── professor/           # Platform — Professor
    ├── App.tsx          # Professor app root (sidebar + main)
    └── components/      # TeacherSidebar, TeacherDashboard, StudentManagement,
                         # CourseManagement, LessonManagement, MaterialManagement,
                         # ProgressTracking, AssignmentManagement,
                         # AnnouncementManagement, ScheduleManagement, AddStudentWizard
```

---

## Roles

| Part | Role |
|------|------|
| **Selector** (`App.tsx`) | Renders the choice screen; then renders `student/App` or `professor/App`. |
| **Student** (`student/`) | All student-facing UI and flows. |
| **Professor** (`professor/`) | All professor-facing UI and flows. |

---

See **PROJECT_STRUCTURE.md** (repo root) for the full picture: Landing page, Platform Student, Platform Professor.
