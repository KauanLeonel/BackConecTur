import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function createCidadao(data) {
  return await prisma.cidadao.create({ data });
}

export async function getCidadaoByUsuarioId(usuarioId) {
  return await prisma.cidadao.findUnique({ where: { usuarioId } });
}

export async function getCidadaos() {
  return await prisma.cidadao.findMany();
}

export async function updateCidadao(usuarioId, data) {
  return await prisma.cidadao.update({ where: { usuarioId }, data });
}

export async function deleteCidadao(usuarioId) {
  return await prisma.cidadao.delete({ where: { usuarioId } });
}
