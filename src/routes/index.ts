import { Router } from 'express';
import { architectRouter } from './api/architects/architects.routes';
import { customerRoutes } from './api/customers/customers.routes';
import { serviceRequestRouter } from './api/serviceRequests/serviceRequest.routes';
import { authRouter } from './api/auth/auth.routes';

const router = Router();

router.use('/auth', authRouter)
router.use('/architects', architectRouter)
router.use('/customers', customerRoutes)
router.use('/service-requests', serviceRequestRouter)

export { router };
