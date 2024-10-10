import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { EnrollmentService } from '../service/enrollment';

const enrollmentService = new EnrollmentService();

export const enrollInCourse = asyncHandler(async (req: Request, res: Response) => {
  const { userId, courseId } = req.body;
  const enrollment = await enrollmentService.enrollUserInCourse(userId, courseId);
  res.status(201).json({ message: 'Enrolled successfully', enrollment });
});

export const getUserEnrollments = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const enrollments = await enrollmentService.getUserEnrollments(Number(userId));
  res.status(200).json(enrollments);
});

export const updateLessonProgress = asyncHandler(async (req: Request, res: Response) => {
  const { enrollmentId, lessonId } = req.params;
  const { progress } = req.body;
  const enrollmentLesson = await enrollmentService.updateLessonProgress(Number(enrollmentId), Number(lessonId), progress);
  res.status(200).json({ message: 'Lesson progress updated', enrollmentLesson });
});
