import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createPayment, completePaymentByUserAndCourse, hasUserPaidForCourse  } from '../service/payment.service';
import { getCourseById } from '../service/course.service';
import { hasUserPurchasedCourse } from '../service/enrollment.service'; 


export const processPayment = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session!.user?.id; 
    const { courseId } = req.params; 
    if (!userId || isNaN(Number(courseId))) {
      return res.status(400).render('error', { message: req.t('payment.error_invalid_data') });
    }
  
    const course = await getCourseById(Number(courseId));
    
    if (!course) {
      return res.status(404).render('error', { message: req.t('payment.error_course_not_found') });
    }
  
    const existingPayment = await hasUserPaidForCourse(userId, Number(courseId));
  
    if (existingPayment) {
      return res.render('payment', {
        t: req.t,
        username: req.session!.user?.name || 'User',
        courseId,
        paymentDate: existingPayment.payment_date,
        status: existingPayment.status,
        amount: existingPayment.amount,
      });
    }
  
    const amount = course.price;
  
    try {
      const payment = await createPayment(userId, Number(courseId), amount);
      
      res.render('payment', {
        t: req.t,
        username: req.session!.user?.name || 'User',
        course: course.name,
        courseId: course.id,
        paymentDate: payment.payment_date,
        status: payment.status,
        amount: payment.amount,
        paymentId: payment.id, 
      });
    } catch (error) {
      return res.status(500).render('error', { message: error.message });
    }
  });
  
  
  export const submitPayment = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params; 
    const userId = req.session!.user?.id; 
  
  
    if (!userId || isNaN(Number(courseId))) {
      return res.status(400).render('error', { message: req.t('payment.error_invalid_data') });
    }
  
    try {
      const updatedPayment = await completePaymentByUserAndCourse(userId, Number(courseId));
  
      if (!updatedPayment) {
        return res.status(404).render('error', { message: req.t('payment.error_payment_not_found') });
      }
  
      return res.redirect('/'); 
    } catch (error) {
      console.error(`Error during payment update: ${error.message}`); 
      return res.status(500).render('error', { message: error.message });
    }
  });
  
  
  
  
