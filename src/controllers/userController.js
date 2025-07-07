import prisma from "../utils/prisma.js";


// Pega todos os usuários
export async function getAllUsers(req, res) {
  try {
    const users = await prisma.usuario.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
}

// Pega um usuário pelo ID
export async function getUserById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.usuario.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
}

// Cria um usuário novo
export async function createUser(req, res) {
  const { nome, email, senha } = req.body;
  try {
    const newUser = await prisma.usuario.create({
      data: { nome, email, senha },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
}

// Atualiza um usuário inteiro (PUT)
export async function updateUser(req, res) {
  const id = parseInt(req.params.id);
  const { nome, email, senha } = req.body;
  try {
    const updatedUser = await prisma.usuario.update({
      where: { id },
      data: { nome, email, senha },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
}

// Atualização parcial (PATCH)
export async function partialUpdateUser(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body; // pode ter só alguns campos
  try {
    const updatedUser = await prisma.usuario.update({
      where: { id },
      data,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
}

// Deleta um usuário
export async function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.usuario.delete({ where: { id } });
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar usuário" });
  }
}

export async function loginUser(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    
    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    if (senha !== user.senha) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    return res.json({
      message: "Login realizado com sucesso.",
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no login." });
  }
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  partialUpdateUser,
  deleteUser,
  loginUser,
};
