import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getLessonsBySectionIds, createLesson, updateLesson, deleteLesson } from 'src/service/lession.service';
import { getCoursesByUserId  } from 'src/service/course.service';
import { getSectionsByCourseIds } from 'src/service/section.service';

export const professorLesonShowGet = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.session!.user?.id;
        const isLoggedIn = Boolean(userId);
        
        if (!isLoggedIn) {
        return res.status(403).render('error', { message: req.t('admin.not_logged_in') }); 
        }
        
        const courses = await getCoursesByUserId(userId); 
        const courseIds = courses.map(course => course.id);
        const sections = await getSectionsByCourseIds(courseIds);
        const sectionId = sections.map(section => section.id);
        const lessons =  await getLessonsBySectionIds(sectionId);

        if (!lessons) {
        return res.status(404).render('error', { message: req.t('admin.user_not_found') }); 
        }

        return res.render('professor/lessonManagement', {
        title: req.t('admin.user_management_title'),
        message: req.t('admin.user_management_message'),
        lessons, 
        sections,
        isLoggedIn,
        t: req.t,
        });
    } catch (error) {
        console.error(error); 
        res.status(500).render('error', { message: req.t('course.course_error') });
    }
});

export const professorCreateLesson = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const sectionId = parseInt(req.body.section_id);
        if (isNaN(sectionId)) {
            throw new Error("Invalid CourseId");
        }

        const lessons = await createLesson({
            name: req.body.name,
            type: req.body.type,
            section_id: sectionId, 
            content: req.body.content,
            description: req.body.description,
            time: req.body.time,
        });

        res.redirect(`/professors/lessons`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const professorUpdateLesson = async (req: Request, res: Response) => {
    try {
        const lessonId = Number(req.body.id);
        const sectionId = Number(req.body.section_id); 
        if (isNaN(lessonId) || isNaN(sectionId)) {
            res.status(400).json({ message: 'Invalid lesson ID or section ID.' });
            return;
        }

        const updatedLesson = await updateLesson(lessonId, req.body);
        
        if (!updatedLesson) {
            res.status(404).json({ message: 'Lesson not found.' });
            return;
        }

        res.redirect(`/professors/lessons`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const adminDeleteLesson = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const success = await deleteLesson(Number(id)); 

        if (!success) {
        res.status(404).json({ message: 'Lesson not found.' });
        return;
        }
        res.redirect(`/professors/lessons`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};