// src/utils/prisma.js
import { PrismaClient } from '@prisma/client';

// Instancia o PrismaClient uma única vez
const prisma = new PrismaClient();

// Exporta a instância única do Prisma Client
export default prisma;