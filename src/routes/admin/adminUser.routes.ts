import { Router } from 'express';
import * as adminUserController from '../../controller/admin/adminUser.controller';

const router: Router = Router();

router.get('/users', adminUserController.adminUserShowGet);  

export default router;
