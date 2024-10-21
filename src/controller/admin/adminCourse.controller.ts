import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getUserPurchasedCourses, getCoursesWithSectionsAndHours, createCourse, updateCourse, deleteCourse} from 'src/service/course.service';

export const adminCourseShowGet = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.session!.user?.id;
    const isLoggedIn = Boolean(userId); 

    const courses = await getCoursesWithSectionsAndHours();
    const payments = isLoggedIn ? await getUserPurchasedCourses(userId) : [];
    const purchasedCourseIds = payments.map(payment => payment.course_id);
    const purchasedCourses = courses.filter(course => purchasedCourseIds.includes(course.id));

    return res.render('admin/courseManagement', {
        title: req.t('admin.course_management_title'),
        message: req.t('admin.course_management_message'),
        name: userId.name,
        courses,
        isLoggedIn,
        t: req.t,
      });
  } catch (error) {
    res.status(500).render('error', { message: req.t('course.course_error') });
  }
});

export const adminCreateCourse = async (req: Request, res: Response) => {
  try {
      const professorId = parseInt(req.body.professorId);
      if (isNaN(professorId)) {
          throw new Error("Invalid professorId");
      }

      const course = await createCourse({
          name: req.body.name,
          description: req.body.description,
          professor_id: professorId, 
          price: req.body.price,
          average_rating: req.body.average_rating
      });

      res.redirect(`/admins/courses`);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

  
export const adminUpdateCourse = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.body.id);
    const updatedCourse = await updateCourse(Number(courseId), req.body);
    if (!updatedCourse) {
        res.status(404).json({ message: 'Course not found.' });
        return;
    }
    res.redirect(`/admins/courses`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
  
export const adminDeleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await deleteCourse(Number(id)); 

    if (!success) {
      res.status(404).json({ message: 'Course not found.' });
      return;
    }
    
    res.status(204).send(); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
  