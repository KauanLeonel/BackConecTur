import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const cupomSchema = z.object({
  descricao: z.string().min(1),
  dataValidade: z.string().refine(d => !isNaN(Date.parse(d)), { message: "Data inválida" }),
  lojaId: z.number().int().positive(),
});

export const validateCupom = (data, partial = false) =>
  partial ? cupomSchema.partial().safeParse(data) : cupomSchema.safeParse(data);

export async function createCupom(data) {
  return await prisma.cupom.create({ data });
}

export async function getCupomById(id) {
  return await prisma.cupom.findUnique({ where: { id } });
}

export async function getCupons() {
  return await prisma.cupom.findMany();
}

export async function updateCupom(id, data) {
  return await prisma.cupom.update({ where: { id }, data });
}

export async function deleteCupom(id) {
  return await prisma.cupom.delete({ where: { id } });
}
