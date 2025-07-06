// src/routes/userRoutes.js
import express from 'express';
// Importa as funções individualmente usando desestruturação
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    partialUpdateUser,
    deleteUser,
    loginUser
} from '../controllers/userController.js'; // Verifique se o caminho está correto

const router = express.Router();

// Rotas de Usuário
router.get('/', getAllUsers); // Agora getAllUsers será a função, não 'undefined'
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.patch('/:id', partialUpdateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser); // Rota de login

export default router;
