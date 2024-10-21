import { Router } from 'express';
import * as adminSectionController from '../../controller/admin/adminSection.controller';

const router: Router = Router();

router.get('/sections', adminSectionController.adminSectionShowGet);
router.post('/sections/edit', adminSectionController.adminUpdateSection);  
router.post('/sections/create', adminSectionController.adminCreateSection);  
router.delete('/sections/delete/:id', adminSectionController.adminDeleteSection);  


export default router;
