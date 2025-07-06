import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const missaoSchema = z.object({
  descricao: z.string().min(1),
  premio: z.string().optional(),
  concluido: z.boolean().optional(),
  conquistasId: z.number().int().positive(),
});

export const validateMissao = (data, partial = false) =>
  partial ? missaoSchema.partial().safeParse(data) : missaoSchema.safeParse(data);

export async function createMissao(data) {
  return await prisma.missao.create({ data });
}

export async function getMissaoById(id) {
  return await prisma.missao.findUnique({ where: { id } });
}

export async function getMissoes() {
  return await prisma.missao.findMany();
}

export async function updateMissao(id, data) {
  return await prisma.missao.update({ where: { id }, data });
}

export async function deleteMissao(id) {
  return await prisma.missao.delete({ where: { id } });
}
