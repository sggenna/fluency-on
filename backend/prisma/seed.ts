import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a default teacher/admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@fluencyon.com' },
    update: {},
    create: {
      email: 'teacher@fluencyon.com',
      password: hashedPassword,
      role: UserRole.TEACHER,
      firstName: 'Jamile',
      lastName: 'Oliveira',
      teacherProfile: {
        create: {
          bio: 'Professora de inglês há 15 anos, especializada em desenvolvimento de fluência.',
        },
      },
    },
  });

  console.log('✅ Created teacher user:', teacher.email);

  // Create a sample student user (for testing Portal do Aluno)
  const studentPassword = await bcrypt.hash('student123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@fluencyon.com' },
    update: {},
    create: {
      email: 'student@fluencyon.com',
      password: studentPassword,
      role: UserRole.STUDENT,
      firstName: 'Ana',
      lastName: 'Maria',
      studentProfile: {
        create: {
          level: 'B1',
          notes: 'Aluna de teste',
        },
      },
    },
  });
  console.log('✅ Created student user:', student.email);

  // Create sample courses
  const courses = [
    {
      title: 'Beginner (A1)',
      level: 'A1',
      description: 'Curso para iniciantes absolutos',
    },
    {
      title: 'Elementary (A2)',
      level: 'A2',
      description: 'Curso para alunos com conhecimento básico',
    },
    {
      title: 'Intermediate (B1)',
      level: 'B1',
      description: 'Curso intermediário',
    },
    {
      title: 'Upper Intermediate to Advanced (B2-C1)',
      level: 'B2-C1',
      description: 'Curso avançado',
    },
    {
      title: 'Conversação',
      level: 'Conversation 1',
      description: 'Foco em conversação',
    },
    {
      title: 'Conversação Avançada',
      level: 'Conversation 2',
      description: 'Conversação para alunos avançados',
    },
    {
      title: 'Inglês para Viagens',
      level: 'Travel English',
      description: 'Inglês focado em situações de viagem',
    },
    {
      title: 'Inglês para Negócios',
      level: 'Business English',
      description: 'Inglês corporativo e profissional',
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { id: course.level },
      update: {},
      create: course,
    });
  }

  console.log('✅ Created sample courses');

  // Create sample class schedules
  const schedules = [
    { dayOfWeek: 'Segunda', time: '19:00', level: 'B1' },
    { dayOfWeek: 'Terça', time: '19:00', level: 'A2' },
    { dayOfWeek: 'Quarta', time: '19:00', level: 'Conversation' },
    { dayOfWeek: 'Quinta', time: '19:00', level: 'B2-C1' },
    { dayOfWeek: 'Sexta', time: '19:00', level: 'A1' },
  ];

  for (const schedule of schedules) {
    await prisma.classSchedule.create({
      data: schedule,
    });
  }

  console.log('✅ Created sample class schedules');

  console.log('✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

