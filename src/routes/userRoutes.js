import express from "express"
import * as sorteioController from '../controllers/userController.js';


const router = express.Router()


router.get('/', userController.getUserController)
router.get('/:id', userController.getUserByIdController);
router.post('/', userController.createUserController)
router.patch('/:id', userController.changeUserController)
router.delete('/:id', userController.deleteUserController)
router.put('/:id', userController.uptadeUserController)
router.post('/login', userController.loginUserController); 

export default router