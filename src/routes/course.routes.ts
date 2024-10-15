import { Router } from 'express';
import * as courseController from '../controller/course.controller';

const router: Router = Router();


router.get('/', courseController.courseShowGet);  

router.post('/filter', courseController.filterAndSort)


export default router;
