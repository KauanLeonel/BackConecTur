import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const conquistaSchema = z.object({
  cidadaoId: z.number().int().positive(),
  moedas: z.number().int().nonnegative().optional(),
  nivel: z.number().int().positive().optional(),
  progresso: z.number().min(0).max(1).optional(),
});

export const validateConquista = (data, partial = false) =>
  partial ? conquistaSchema.partial().safeParse(data) : conquistaSchema.safeParse(data);

export async function createConquista(data) {
  return await prisma.conquista.create({ data });
}

export async function getConquistaByCidadaoId(cidadaoId) {
  return await prisma.conquista.findUnique({ where: { cidadaoId } });
}

export async function getConquistas() {
  return await prisma.conquista.findMany();
}

export async function updateConquista(cidadaoId, data) {
  return await prisma.conquista.update({ where: { cidadaoId }, data });
}

export async function deleteConquista(cidadaoId) {
  return await prisma.conquista.delete({ where: { cidadaoId } });
}
