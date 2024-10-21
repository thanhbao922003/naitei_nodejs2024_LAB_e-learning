import { Router } from 'express';
import {  getUserCourseEnrollments, updateLessonProgress } from '../controller/enrollment.controller';

const router = Router();

router.get('/:courseId', getUserCourseEnrollments);  
router.post('/:courseId/:lessonId', updateLessonProgress); 
export default router;
