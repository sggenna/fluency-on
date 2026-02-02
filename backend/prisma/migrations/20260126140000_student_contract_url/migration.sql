-- AlterTable student_profiles: add contractUrl
ALTER TABLE "student_profiles" ADD COLUMN IF NOT EXISTS "contractUrl" TEXT;
