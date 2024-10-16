import { Router } from 'express';
import * as courseController from '../controller/course.controller';

const router: Router = Router();


router.get('/', courseController.courseShowGet);  
router.post('/', courseController.filterAndSort);
router.get('/:id',courseController.getCourseDetail);

export default router;
