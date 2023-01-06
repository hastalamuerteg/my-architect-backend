import { NextFunction, Request, Response } from 'express';

import { container } from '@vendors/inversifyDI/inversify.config';

import { CreateCustomerUseCase } from './CreateCustomerUseCase';
import { createCustomerSchema } from '@vendors/joi-validation/schemas/customers/createCustomerSchema';

class CreateCustomerController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        firstName, lastName, age, gender, phone, email, password,
      } = request.body;

      await createCustomerSchema.validateAsync({
        firstName, lastName, age, gender, phone, email, password,
      });

      const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

      await createCustomerUseCase.execute({
        firstName,
        lastName,
        age,
        gender,
        phone,
        email: email.trim(),
        password,
      });

      return response.status(201).send();
    } catch (error) {
      return next(error);
    }
  }
}

export { CreateCustomerController };
