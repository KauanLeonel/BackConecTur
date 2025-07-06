import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const favoritoSchema = z.object({
  cidadaoId: z.number().int().positive(),
  eventoId: z.number().int().positive(),
});

export const validateFavorito = (data, partial = false) =>
  partial ? favoritoSchema.partial().safeParse(data) : favoritoSchema.safeParse(data);

export async function createFavorito(data) {
  return await prisma.favorito.create({ data });
}

export async function getFavoritoById(id) {
  return await prisma.favorito.findUnique({ where: { id } });
}

export async function getFavoritos() {
  return await prisma.favorito.findMany();
}

export async function updateFavorito(id, data) {
  return await prisma.favorito.update({ where: { id }, data });
}

export async function deleteFavorito(id) {
  return await prisma.favorito.delete({ where: { id } });
}
