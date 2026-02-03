-- AlterTable student_profiles: add cpf, rg, dateOfBirth, profession
ALTER TABLE "student_profiles" ADD COLUMN IF NOT EXISTS "cpf" TEXT;
ALTER TABLE "student_profiles" ADD COLUMN IF NOT EXISTS "rg" TEXT;
ALTER TABLE "student_profiles" ADD COLUMN IF NOT EXISTS "dateOfBirth" TIMESTAMP(3);
ALTER TABLE "student_profiles" ADD COLUMN IF NOT EXISTS "profession" TEXT;
