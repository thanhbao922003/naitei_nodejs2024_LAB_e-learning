import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getUserPurchasedCourses, getCoursesInfo, createCourse, updateCourse, deleteCourse} from 'src/service/course.service';
import { getAllCategories} from 'src/service/category.service';

export const professorCourseShowGet = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.session!.user?.id;
    const isLoggedIn = Boolean(userId); 

    const courses = await getCoursesInfo(userId);
    const categories = await getAllCategories();
    const payments = isLoggedIn ? await getUserPurchasedCourses(userId) : [];
    const purchasedCourseIds = payments.map(payment => payment.course_id);
    const purchasedCourses = courses.filter(course => purchasedCourseIds.includes(course.id));

    return res.render('professor/courseManagement', {
        title: req.t('admin.course_management_title'),
        message: req.t('admin.course_management_message'),
        name: userId.name,
        courses,
        isLoggedIn,
        categories,
        t: req.t,
      });
  } catch (error) {
    res.status(500).render('error', { message: req.t('course.course_error') });
  }
});

export const professorCreateCourse = async (req: Request, res: Response) => {
  try {
    const userId = req.session!.user?.id;
      if (isNaN(userId)) {
          throw new Error("Invalid professorId");
      }
      const course = await createCourse({
          name: req.body.name,
          description: req.body.description,
          professor_id: userId, 
          price: req.body.price,
          category_id: req.body.category_id,
          average_rating: req.body.average_rating
      });

      res.redirect(`/professors/courses`);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

  
export const professorUpdateCourse = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.body.id);
    
    const userId = req.session!.user?.id; 

    if (!userId) {
       res.status(403).json({ message: 'User not authenticated.' });
       return;
    }

    const updatedCourse = await updateCourse(courseId, req.body, userId);
    
    if (!updatedCourse) {
       res.status(404).json({ message: 'Course not found.' });
       return;
    }
    
    res.redirect(`/professors/courses`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
  
export const professorDeleteCourse = async (req: Request, res: Response) => {
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
  