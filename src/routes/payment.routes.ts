import { Router } from 'express';
import { processPayment, submitPayment  } from '../controller/payment.controller';

const router = Router();

router.get('/:courseId', processPayment);  
router.post('/:courseId', submitPayment);

export default router;
