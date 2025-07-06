import express from "express"
import createUserController from "../controllers/User/createUserController.js"
import getUserController from "../controllers/User/getUserController.js"
import changeUserController from "../controllers/User/changeUserController.js"
import deleteUserController from "../controllers/User/deleteUserController.js"
import uptadeUserController from "../controllers/User/uptadeUserController.js"
import loginUserController from '../controllers/User/loginUserController.js';  
import getUserByIdController from "../controllers/User/getUserByIdController.js"

const router = express.Router()


router.get('/', getUserController)
router.get('/:id', getUserByIdController);
router.post('/', createUserController)
router.patch('/:id', changeUserController)
router.delete('/:id', deleteUserController)
router.put('/:id', uptadeUserController)
router.post('/login', loginUserController); 

export default router