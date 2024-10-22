import { Router } from 'express';
import * as adminCourseController from '../../controller/admin/adminLesson.controller';
import { isAdmin } from '../../middleware/roleCheckMiddleware';

const router: Router = Router();

router.get('/lessons', isAdmin, adminCourseController.adminLesonShowGet);  
router.post('/lessons/create',isAdmin, adminCourseController.adminCreateLesson);
router.post('/lessons/edit', isAdmin, adminCourseController.adminUpdateLesson);
router.delete('/lessons/delete/:id', isAdmin, adminCourseController.adminDeleteLesson);
export default router;
