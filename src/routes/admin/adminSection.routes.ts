import { Router } from 'express';
import * as adminSectionController from '../../controller/admin/adminSection.controller';
import { isAdmin } from '../../middleware/roleCheckMiddleware';

const router: Router = Router();

router.get('/sections', isAdmin, adminSectionController.adminSectionShowGet);
router.post('/sections/edit', isAdmin, adminSectionController.adminUpdateSection);  
router.post('/sections/create', isAdmin, adminSectionController.adminCreateSection);  
router.delete('/sections/delete/:id', isAdmin, adminSectionController.adminDeleteSection);  


export default router;
