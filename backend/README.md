# FluencyOn Backend API

Backend API for FluencyOn platform built with Node.js, Express, TypeScript, and Prisma.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `env.example` to `.env` and update with your database credentials:

```bash
cp env.example .env
```

Update the `DATABASE_URL` in `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/fluencyon?schema=public"
```

### 3. Set up Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed database with sample data
npm run prisma:seed
```

### 4. Start Development Server

```bash
npm run dev
```

The server will run on `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:seed` - Seed database with sample data

## Database Schema

The database schema is defined in `prisma/schema.prisma`. Key models include:

- **User** - Authentication and user management
- **Course** - Course catalog
- **Lesson** - Individual lessons within courses
- **Material** - PDFs, audio files, slides
- **Enrollment** - Student-course relationships
- **Assignment** - Homework and exercises
- **Progress** - Student progress tracking
- **Announcement** - System announcements

## Project Structure

```
backend/
├── src/
│   ├── routes/       # API routes
│   ├── controllers/  # Route handlers
│   ├── models/       # Data models (if needed)
│   ├── middleware/   # Express middleware
│   ├── utils/        # Utility functions
│   └── index.ts      # Entry point
├── prisma/
│   ├── schema.prisma # Database schema
│   └── seed.ts       # Database seed script
└── package.json
```

## Next Steps

1. Set up authentication endpoints
2. Create API routes for courses, lessons, students
3. Implement file upload functionality
4. Add progress tracking endpoints

