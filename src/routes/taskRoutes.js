import express from "express"
import createTaskController from "../controllers/Task/createTaskController.js"
import getTaskController from "../controllers/Task/getTaskController.js"
import changeTaskController from "../controllers/Task/changeTaskController.js"
import deleteTaskController from "../controllers/Task/deleteTaskController.js"
import uptadeTaskController from "../controllers/Task/uptadeTaskController.js"
import exportPdfController from '../controllers/Task/exportPdfController.js';

const router = express.Router()


router.get('/', getTaskController)
router.post('/', createTaskController)
router.patch('/:id', changeTaskController)
router.delete('/:id', deleteTaskController)
router.put('/:id', uptadeTaskController)
router.get('/export/pdf', exportPdfController);

export default router