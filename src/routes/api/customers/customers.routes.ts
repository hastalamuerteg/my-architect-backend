import { CreateCustomerController } from '@modules/customers/useCases/CreateCustomer/CreateCustomerController';
import { Router } from 'express';

const customerRoutes = Router();

const createCustomerController = new CreateCustomerController()

// POST routes
customerRoutes.post('/', createCustomerController.handle)

export { customerRoutes }