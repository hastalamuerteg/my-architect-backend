import { Router } from 'express';
import { architectRouter } from './api/architects/architects.routes';
import { customerRoutes } from './api/customers/customers.routes';

const router = Router();

router.use('/architects', architectRouter)
router.use('/customers', customerRoutes)

export { router };
