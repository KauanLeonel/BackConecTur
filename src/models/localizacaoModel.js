import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const localizacaoSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  endereco: z.string().min(1),
  eventoId: z.number().int().positive(),
});

export const validateLocalizacao = (data, partial = false) =>
  partial ? localizacaoSchema.partial().safeParse(data) : localizacaoSchema.safeParse(data);

export async function createLocalizacao(data) {
  return await prisma.localizacao.create({ data });
}

export async function getLocalizacaoById(id) {
  return await prisma.localizacao.findUnique({ where: { id } });
}

export async function getLocalizacoes() {
  return await prisma.localizacao.findMany();
}

export async function updateLocalizacao(id, data) {
  return await prisma.localizacao.update({ where: { id }, data });
}

export async function deleteLocalizacao(id) {
  return await prisma.localizacao.delete({ where: { id } });
}
