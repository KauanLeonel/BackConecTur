import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const userSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
});

export const validateUser = (data, partial = false) =>
  partial ? userSchema.partial().safeParse(data) : userSchema.safeParse(data);

export async function createUser(data) {
  return await prisma.usuario.create({ data });
}

export async function getUserById(id) {
  return await prisma.usuario.findUnique({ where: { id } });
}

export async function getUsers() {
  return await prisma.usuario.findMany();
}

export async function updateUser(id, data) {
  return await prisma.usuario.update({ where: { id }, data });
}

export async function deleteUser(id) {
  return await prisma.usuario.delete({ where: { id } });
}
