import { CreateCustomerController } from '@modules/customers/useCases/CreateCustomer/CreateCustomerController';
import { Router } from 'express';

const customerRoutes = Router();

const createCustomerController = new CreateCustomerController()

customerRoutes.post('/', createCustomerController.handle)

export { customerRoutes }