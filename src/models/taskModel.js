import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const taskSchema = z.object({
  title: z.string({
    invalid_type_error: "O título deve ser uma string.",
    required_error: "O título é obrigatório."
  }).min(1, { message: "O título não pode ser vazio." })
    .max(255, { message: "O título deve ter no máximo 255 caracteres." }),

  description: z.string({
    invalid_type_error: "A descrição deve ser uma string.",
    required_error: "A descrição é obrigatória."
  }).min(1, { message: "A descrição não pode ser vazia." }),

  complet: z.boolean({
    invalid_type_error: "Validação deve ser booleano.",
    required_error: "O campo complet é obrigatório."
  }),

  userId: z.string({
    invalid_type_error: "O userId deve ser uma string.",
    required_error: "O userId é obrigatório."
  }).min(24, { message: "userId inválido." })
});

export const taskValidator = (task, partial = false) => {
  if (partial) {
    return taskSchema.partial().safeParse(task);
  }
  return taskSchema.safeParse(task);
};

export async function create(task) {
  const result = await prisma.task.create({
    data: task
  });
  return result;
}

export async function remove(id) {
  const result = await prisma.task.delete({
    where: { id }
  });
  return result;
}

export async function getList() {
  const result = await prisma.task.findMany({
    include: { user: true }
  });
  return result;
}

export async function update(id, task) {
  const result = await prisma.task.update({
    where: { id },
    data: task
  });
  return result;
}

export async function getById(id) {
  const result = await prisma.task.findUnique({
    where: { id },
    include: { user: true }
  });
  return result;
}
