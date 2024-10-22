import { Router } from 'express';
import * as adminPaymentController from '../../controller/admin/adminPayment.controller';
import { isAdmin } from '../../middleware/roleCheckMiddleware';

const router: Router = Router();

router.get('/payments', isAdmin, adminPaymentController.adminPaymentShowGet);  

export default router;
