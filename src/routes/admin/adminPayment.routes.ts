import { Router } from 'express';
import * as adminPaymentController from '../../controller/admin/adminPayment.controller';

const router: Router = Router();

router.get('/payments', adminPaymentController.adminPaymentShowGet);  

export default router;
