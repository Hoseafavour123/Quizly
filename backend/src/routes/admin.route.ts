import { Router } from 'express';
import { deleteAdmin, getAllAdmin, getAdminHandler, updateAdmin } from '../controller/admin.controller';
import { uploadMiddleware } from '../middleware/uploadMiddleware';

const router = Router();


router.get('/', getAdminHandler)
router.get('/all', getAllAdmin)
router.delete('/:id', deleteAdmin);
router.put('/update', uploadMiddleware , updateAdmin)

export default router;