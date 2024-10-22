import { Router } from 'express';
import * as adminUserController from '../../controller/admin/adminUser.controller';
import { isAdmin } from '../../middleware/roleCheckMiddleware';

const router: Router = Router();

router.get('/users', isAdmin, adminUserController.adminUserShowGet);  

export default router;
