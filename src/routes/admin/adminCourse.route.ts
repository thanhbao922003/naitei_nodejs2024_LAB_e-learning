import { Router } from 'express';
import * as adminCourseController from '../../controller/admin/adminCourse.controller';
import { isAdmin } from '../../middleware/roleCheckMiddleware';

const router: Router = Router();

router.get('/courses', isAdmin, adminCourseController.adminCourseShowGet);  
router.post('/courses/create', isAdmin, adminCourseController.adminCreateCourse);
router.post('/courses/edit', isAdmin, adminCourseController.adminUpdateCourse);
router.delete('/courses/delete/:id', isAdmin, adminCourseController.adminDeleteCourse);
export default router;
