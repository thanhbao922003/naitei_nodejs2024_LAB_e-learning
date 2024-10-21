import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllUser } from 'src/service/user.service';


export const adminUserShowGet = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.session!.user?.id;
    const isLoggedIn = Boolean(userId);
    
    if (!isLoggedIn) {
      return res.status(403).render('error', { message: req.t('admin.not_logged_in') }); 
    }

    const users = await getAllUser(); 

    if (!users) {
      return res.status(404).render('error', { message: req.t('admin.user_not_found') }); 
    }

    return res.render('admin/userManagement', {
      title: req.t('admin.user_management_title'),
      message: req.t('admin.user_management_message'),
      users, 
      isLoggedIn,
      t: req.t,
    });
  } catch (error) {
    res.status(500).render('error', { message: req.t('course.course_error') });
  }
});

  