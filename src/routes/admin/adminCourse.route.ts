import { Router } from 'express';
import * as adminCourseController from '../../controller/admin/adminCourse.controller';

const router: Router = Router();

router.get('/courses', adminCourseController.adminCourseShowGet);  
router.post('/courses/create', adminCourseController.adminCreateCourse);
router.post('/courses/edit', adminCourseController.adminUpdateCourse);
router.delete('/courses/delete/:id', adminCourseController.adminDeleteCourse);
export default router;
