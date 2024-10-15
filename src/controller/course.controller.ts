import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getCoursesWithSectionsAndHours, 
  filterAndSortCourses,
} from '../service/course.service';

export const filterAndSort = 
    asyncHandler(async (req: Request, res: Response) => {
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
        res.status(500).json({ message: req.t('course.course_filter_error')});
      }
});


export const courseShowGet = asyncHandler(async (req: Request, res: Response) => {
  try {
    const courses = await getCoursesWithSectionsAndHours();
    res.render('course', {
      title: {message: req.t('home.title')},
      message: {message: req.t('home.message')},
      courses,
      t: req.t,
    });
  } catch (error) {
    res.status(500).render('error', { message: req.t('course.course_error')});
  }
});
