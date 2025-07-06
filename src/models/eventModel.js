import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const eventoSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
  dataHora: z.string().refine(d => !isNaN(Date.parse(d)), { message: "Data inválida" }),
  categoria: z.string().optional(),
});

export const validateEvento = (data, partial = false) =>
  partial ? eventoSchema.partial().safeParse(data) : eventoSchema.safeParse(data);

export async function createEvento(data) {
  return await prisma.evento.create({ data });
}

export async function getEventoById(id) {
  return await prisma.evento.findUnique({ where: { id } });
}

export async function getEventos() {
  return await prisma.evento.findMany();
}

export async function updateEvento(id, data) {
  return await prisma.evento.update({ where: { id }, data });
}

export async function deleteEvento(id) {
  return await prisma.evento.delete({ where: { id } });
}
