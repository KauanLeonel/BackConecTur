import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const notificacaoSchema = z.object({
  mensagem: z.string().min(1),
  dataHoraEnvio: z.string().optional(),
  cidadaoId: z.number().int().positive(),
});

export const validateNotificacao = (data, partial = false) =>
  partial ? notificacaoSchema.partial().safeParse(data) : notificacaoSchema.safeParse(data);

export async function createNotificacao(data) {
  return await prisma.notificacao.create({ data });
}

export async function getNotificacaoById(id) {
  return await prisma.notificacao.findUnique({ where: { id } });
}

export async function getNotificacoes() {
  return await prisma.notificacao.findMany();
}

export async function updateNotificacao(id, data) {
  return await prisma.notificacao.update({ where: { id }, data });
}

export async function deleteNotificacao(id) {
  return await prisma.notificacao.delete({ where: { id } });
}
