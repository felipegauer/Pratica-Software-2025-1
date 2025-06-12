import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const prisma = new PrismaClient();

async function main() {
  // Criar um professor
  const novoProfessor = await prisma.professor.create({
    data: {
      nome: 'Lucas',
      matricula: '123456',
    },
  });

  console.log('Professor criado:', novoProfessor);

  // Buscar todos os professores
  const professores = await prisma.professor.findMany();
  console.log('Professores no banco:', professores);
}

main()
  .catch((e) => {
    console.error('Erro:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
