import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const lojaSchema = z.object({
  nome: z.string().min(1).optional(),
});

export const validateLoja = (data, partial = false) =>
  partial ? lojaSchema.partial().safeParse(data) : lojaSchema.safeParse(data);

export async function createLoja(data) {
  return await prisma.loja.create({ data });
}

export async function getLojaById(id) {
  return await prisma.loja.findUnique({ where: { id } });
}

export async function getLojas() {
  return await prisma.loja.findMany();
}

export async function updateLoja(id, data) {
  return await prisma.loja.update({ where: { id }, data });
}

export async function deleteLoja(id) {
  return await prisma.loja.delete({ where: { id } });
}
