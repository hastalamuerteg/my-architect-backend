import { Router } from 'express';
import { architectRouter } from './api/architects/architects.routes';
import { customerRoutes } from './api/customers/customers.routes';
import { serviceRequestRouter } from './api/serviceRequests/serviceRequest.routes';

const router = Router();

router.use('/architects', architectRouter)
router.use('/customers', customerRoutes)
router.use('/service-requests', serviceRequestRouter)

export { router };
