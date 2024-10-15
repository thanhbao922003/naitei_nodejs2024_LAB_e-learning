import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getCoursesWithSectionsAndHours, filterAndSortCourses, getSectionsWithLessons, getCourseById, countEnrolledUsersInCourse, getProfessorByCourse} from '../service/course.service';

export const filterAndSort = asyncHandler(async (req: Request, res: Response) => {
      try {
        const { professorId, 
          minPrice, 
          maxPrice, 
          minRating, 
          name, 
          sortBy, 
          order, 
        } = req.body;
        const courses = await filterAndSortCourses(
          {
            professorId,
            minPrice,
            maxPrice,
            minRating,
            name,
          },
          {
            sortBy,
            order,
          },
        );
        res.json(courses);
      } catch (error) {
        console.error('Error filtering and sorting courses:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});


export const courseShowGet = asyncHandler(async (req: Request, res: Response) => {
  try {
    const courses = await getCoursesWithSectionsAndHours();
    res.render('course', {
      title: req.t('home.title'),
      message: req.t('home.message'),
      courses,
      t: req.t, 
    });
  } catch (error) {
    res.status(500).render('error', { message: req.t('course.course_error') });
  }
});

export const getCourseDetail = asyncHandler(async (req: Request, res: Response) => {
  const courseId = Number(req.params.id);

  if (!courseId) {
    return res.status(400).render('error', { message: req.t('course.course_error_id_required') });
  }

  const course = await getCourseById(courseId);
  if (!course) {
    return res.status(404).render('error', { message: req.t('course.course_error_notfound') });
  }

  const professor = await getProfessorByCourse(courseId);
  const sectionsWithLessons = await getSectionsWithLessons(courseId);

  const totalHours = sectionsWithLessons.reduce((sum, section) => sum + section.total_time, 0);
  const totalLessons = sectionsWithLessons.reduce((sum, section) => sum + section.lessons.length, 0);
  const totalStudents = await countEnrolledUsersInCourse(courseId);

  res.render('courseDetail', {
    course,
    name: professor?.name || 'Unknown Professor',
    totalHours,
    sectionsWithLessons,
    totalLessons,
    totalStudents,
    t: req.t
  });
});
