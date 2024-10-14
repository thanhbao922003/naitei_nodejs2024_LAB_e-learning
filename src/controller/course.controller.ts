import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllCourses, 
  getCourseById, 
  filterAndSortCourses
} from '../service/course.service';

export const courseList = 
    asyncHandler(async (req: Request, res: Response) => {
      try {
        const courses = await getAllCourses();
        res.status(200).json(courses);
      } catch (error) {
        console.error('Error showing list of courses', error)
        res.status(500).json({ message: 'Failed to retrieve courses. Please try again' });
      }
    });

export const courseDetails = 
    asyncHandler(async (req: Request, res: Response) => {
      try {
        const courseId = parseInt(req.params.id);
        const course = await getCourseById(courseId);
        res.status(200).json(course); 
      } catch (error) {
        console.error('Error showing course details', error)
        res.status(404).json({ message: 'Course not found' });
      }
    });

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
        console.error('Error filtering and sorting courses:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
