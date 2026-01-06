# Database Setup - Feature Branch

## ✅ Completed

1. ✅ Created backend folder structure
2. ✅ Installed dependencies (Prisma, Express, TypeScript, etc.)
3. ✅ Created Prisma schema with all models:
   - User (with roles: STUDENT, TEACHER, ADMIN)
   - StudentProfile
   - TeacherProfile
   - Course
   - Lesson
   - Material (PDFs, audio, slides)
   - Enrollment
   - Assignment
   - Submission
   - Progress
   - Announcement
   - ClassSchedule
4. ✅ Generated Prisma Client
5. ✅ Created seed script with sample data
6. ✅ Configured TypeScript
7. ✅ Created basic Express server

## 📋 Next Steps

### 1. Set up PostgreSQL Database

You have two options:

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (if not installed)
# macOS: brew install postgresql
# Then start PostgreSQL service

# Create database
createdb fluencyon

# Or using psql:
psql -U postgres
CREATE DATABASE fluencyon;
```

#### Option B: Cloud Database (Recommended for production)
- Use services like:
  - [Supabase](https://supabase.com) (Free tier available)
  - [Railway](https://railway.app) (Free tier)
  - [Neon](https://neon.tech) (Free tier)
  - [Render](https://render.com) (Free tier)

### 2. Configure Environment Variables

Copy `env.example` to `.env`:
```bash
cp env.example .env
```

Update `DATABASE_URL` in `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/fluencyon?schema=public"
```

### 3. Run Migrations

```bash
npm run prisma:migrate
```

This will:
- Create all tables in the database
- Set up relationships
- Create indexes

### 4. Seed Database (Optional)

```bash
npm run prisma:seed
```

This creates:
- A default teacher user (email: `teacher@fluencyon.com`, password: `admin123`)
- Sample courses (A1, A2, B1, B2-C1, Conversation, etc.)
- Sample class schedules

### 5. Verify Setup

```bash
# Start the server
npm run dev

# In another terminal, check health endpoint
curl http://localhost:3001/health
```

### 6. Open Prisma Studio (Optional)

```bash
npm run prisma:studio
```

This opens a GUI to view and edit your database.

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts           # Express server entry point
│   ├── routes/            # API routes (to be created)
│   ├── controllers/       # Route handlers (to be created)
│   ├── middleware/        # Express middleware (to be created)
│   └── utils/
│       └── prisma.ts      # Prisma Client instance
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
├── .env                   # Environment variables (create from env.example)
├── tsconfig.json          # TypeScript config
└── package.json
```

## 🔗 Database Schema Overview

### Core Models
- **User**: Authentication and basic user info
- **StudentProfile**: Additional student information
- **TeacherProfile**: Additional teacher information

### Content Models
- **Course**: Course catalog (A1, A2, B1, etc.)
- **Lesson**: Individual lessons within courses
- **Material**: PDFs, audio files, slides

### Relationship Models
- **Enrollment**: Links students to courses
- **Assignment**: Homework and exercises
- **Submission**: Student submissions
- **Progress**: Tracks student progress per lesson

### Other Models
- **Announcement**: System announcements
- **ClassSchedule**: Class schedules

## 🚀 Ready for Next Feature

Once the database is set up and migrations are run, you can proceed to:
- **Next branch**: `feature/authentication` - Set up JWT authentication

## 📝 Notes

- The schema uses `cuid()` for IDs (better than auto-increment for distributed systems)
- All relationships use `onDelete: Cascade` for data integrity
- The seed script creates a default teacher account for testing

