import { Router } from 'express';
import { enrollInCourse, getUserEnrollments, updateLessonProgress } from '../controller/enrollment';

const router = Router();

router.post('/', enrollInCourse);  

router.get('/:userId', getUserEnrollments);  

router.put('/:enrollmentId/lessons/:lessonId/progress', updateLessonProgress);  

export default router;
