import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Esquema Zod para validação
const historicoSchema = z.object({
  cidadaoId: z.number().int().positive({ message: "ID do cidadão inválido" }),
  eventoId: z.number().int().positive({ message: "ID do evento inválido" }),
  dataAcesso: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      { message: "Data de acesso inválida" }
    ),
});

// Validação externa
export const validateHistorico = (data, partial = false) =>
  partial ? historicoSchema.partial().safeParse(data) : historicoSchema.safeParse(data);

// Funções CRUD

export async function createHistorico(data) {
  return await prisma.historico.create({ data });
}

export async function getHistoricoById(id) {
  return await prisma.historico.findUnique({ where: { id } });
}

export async function getHistoricos() {
  return await prisma.historico.findMany();
}

export async function updateHistorico(id, data) {
  return await prisma.historico.update({ where: { id }, data });
}

export async function deleteHistorico(id) {
  return await prisma.historico.delete({ where: { id } });
}
