import express from 'express';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.post('/', adminController.createAdmin);
router.put('/:id', adminController.updateAdmin);
router.patch('/:id', adminController.partialUpdateAdmin);
router.delete('/:id', adminController.deleteAdmin);

export default router;
