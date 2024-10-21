import { Router } from 'express';
import * as adminCourseController from '../../controller/admin/adminLesson.controller';

const router: Router = Router();

router.get('/lessons', adminCourseController.adminLesonShowGet);  
router.post('/lessons/create', adminCourseController.adminCreateLesson);
router.post('/lessons/edit', adminCourseController.adminUpdateLesson);
router.delete('/lessons/delete/:id', adminCourseController.adminDeleteLesson);
export default router;
