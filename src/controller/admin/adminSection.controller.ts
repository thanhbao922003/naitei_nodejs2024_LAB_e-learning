import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllSections, updateSection, createSection, deleteSection } from 'src/service/section.service';


export const adminSectionShowGet = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.session!.user?.id;
    const isLoggedIn = Boolean(userId);
    if (!isLoggedIn) {
      return res.status(403).render('error', { message: req.t('admin.not_logged_in') }); 
    }

    const sections = await getAllSections(); 

    if (!sections) {
      return res.status(404).render('error', { message: req.t('admin.user_not_found') }); 
    }

    return res.render('admin/sectionManagement', {
      title: req.t('admin.user_management_title'),
      message: req.t('admin.user_management_message'),
      sections, 
      isLoggedIn,
      t: req.t,
    });
  } catch (error) {
    console.error(error); 
    res.status(500).render('error', { message: req.t('course.course_error') });
  }
});

export const adminCreateSection = async (req: Request, res: Response) => {
  try {
      const courseId = parseInt(req.body.course);
      if (isNaN(courseId)) {
          throw new Error("Invalid CourseId");
      }

      const sections = await createSection({
          name: req.body.name,
          total_lesson: req.body.total_lesson,
          course_id: courseId, 
          total_time: req.body.total_time,
      });

      res.redirect(`/admins/sections`);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

export const adminUpdateSection = async (req: Request, res: Response) => {
  try {
    const sectionId = Number(req.body.id);
    const courseId = Number(req.body.courseId); 

    if (isNaN(sectionId) || isNaN(courseId)) {
        res.status(400).json({ message: 'Invalid section ID or course ID.' });
        return;
    }

    const updatedSection = await updateSection(sectionId, {
      name: req.body['section-name'], 
      total_time: Number(req.body['total-time']),
      total_lesson: Number(req.body['total-lessons']),
      course_id: courseId, 
    });

    if (!updatedSection) {
        res.status(404).json({ message: 'Section not found.' });
        return;
    }

    res.redirect(`/admins/sections`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const adminDeleteSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await deleteSection(Number(id)); 

    if (!success) {
      res.status(404).json({ message: 'Section not found.' });
      return;
    }
    res.redirect(`/admins/sections`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};