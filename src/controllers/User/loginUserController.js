import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function loginUserController(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha são obrigatórios!" });
        }

        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        // Confere a senha
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Senha incorreta!" });
        }

        // Login bem-sucedido
        return res.json({
            message: "Login realizado com sucesso!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
}
