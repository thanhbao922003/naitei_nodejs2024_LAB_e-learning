import { Router } from 'express';
import {  getUserCourseEnrollments, updateLessonProgress } from '../controller/enrollment.controller';

const router = Router();

router.get('/:userId/:courseId', getUserCourseEnrollments);  
router.post('/:userId/:courseId/:lessonId', updateLessonProgress); 
export default router;