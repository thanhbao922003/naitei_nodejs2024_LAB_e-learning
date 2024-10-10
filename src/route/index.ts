import { Router } from 'express';
import enrollmentRoutes from './enrollment';

const router = Router();

router.use('/enrollments', enrollmentRoutes);

export default router;
