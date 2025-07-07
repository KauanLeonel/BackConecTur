// test_db_connection.js
import { PrismaClient } from '@prisma/client';

async function testConnection() {
    const prisma = new PrismaClient();

    try {
        console.log('Tentando conectar ao banco de dados...');
        await prisma.$connect();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');

        // Tenta uma operação simples para ver se o modelo 'usuarios' é reconhecido
        const usersCount = await prisma.usuario.count(); // Use 'usuario' com 'u' minúsculo se seu modelo for assim
        console.log(`Número de usuários na tabela: ${usersCount}`);

    } catch (error) {
        console.error('Erro ao conectar ou executar query:', error);
        // Este erro aqui será o detalhe que precisamos!
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();