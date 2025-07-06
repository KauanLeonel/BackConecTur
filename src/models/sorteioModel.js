import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const sorteioSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
  dataSorteio: z.string().refine(d => !isNaN(Date.parse(d)), { message: "Data inválida" }),
  lojaId: z.number().int().positive(),
});

export const validateSorteio = (data, partial = false) =>
  partial ? sorteioSchema.partial().safeParse(data) : sorteioSchema.safeParse(data);

export async function createSorteio(data) {
  return await prisma.sorteio.create({ data });
}

export async function getSorteioById(id) {
  return await prisma.sorteio.findUnique({ where: { id } });
}

export async function getSorteios() {
  return await prisma.sorteio.findMany();
}

export async function updateSorteio(id, data) {
  return await prisma.sorteio.update({ where: { id }, data });
}

export async function deleteSorteio(id) {
  return await prisma.sorteio.delete({ where: { id } });
}
