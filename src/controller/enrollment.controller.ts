import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { updateEnrollmentProgress, getEnrollment, markLessonAsDone, hasUserPurchasedCourse, getEnrollmentWithCourseAndUser } from '../service/enrollment.service';
import { getSectionsWithLessons, countEnrolledUsersInCourse, getCourseById, getProfessorByCourse   } from '../service/course.service';


export const getUserCourseEnrollments = asyncHandler(async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;

  if (!userId || !courseId) {
    return res.status(400).render('error', { message: 'User ID and Course ID are required.' });
  }

  const hasAccess = await hasUserPurchasedCourse(Number(userId), Number(courseId));

  if (!hasAccess) {
    return res.status(403).render('error', { message: 'You do not have access to this course.' });
  }

  const enrollment = await getEnrollmentWithCourseAndUser(Number(userId), Number(courseId));

  if (!enrollment || !enrollment.course) {
    return res.status(404).render('error', { message: 'Enrollment or Course not found.' });
  }

  const course = await getCourseById(Number(courseId));
  const professor = await getProfessorByCourse(Number(courseId));
  const sectionsWithLessons = await getSectionsWithLessons(Number(courseId));

  const totalHours = sectionsWithLessons.reduce((sum, section) => sum + section.total_time, 0);
  const totalLessons = sectionsWithLessons.reduce((sum, section) => sum + section.lessons.length, 0);
  const totalStudents = await countEnrolledUsersInCourse(Number(courseId));

  res.status(200).render('enrollment', {
    course,
    enrollment,
    name: professor?.name || 'Unknown Professor',
    totalHours,
    sectionsWithLessons,
    totalLessons,
    totalStudents,
    t: req.t
  });
});

export const updateLessonProgress = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId, courseId, lessonId } = req.params;

  console.log(`User ID: ${userId}, Course ID: ${courseId}, Lesson ID: ${lessonId}`); // Log thông tin

  if (!userId || !courseId || !lessonId) {
    res.status(400).json({ message: 'User ID, Course ID, and Lesson ID are required.' });
    return;  
  }

  const enrollment = await getEnrollment(+userId, +courseId);
  if (!enrollment) {
    res.status(404).json({ message: 'Enrollment not found.' });
    return;
  }

  try {
    const updatedLesson = await markLessonAsDone(+lessonId, enrollment.id);
    console.log('Updated Lesson:', updatedLesson); 

    await updateEnrollmentProgress(enrollment.id);

    res.redirect(`/`);
  } catch (error) {
    console.error('Error updating lesson progress:', error); 
    res.status(500).json({ message: error.message });
  }
});
























