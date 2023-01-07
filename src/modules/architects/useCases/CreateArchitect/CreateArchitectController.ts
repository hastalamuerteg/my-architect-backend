import { NextFunction, Request, Response } from 'express';

import { container } from '@vendors/inversifyDI/inversify.config';

import { CreateArchitectUseCase } from './CreateArchitectUseCase';
import { createArchitectSchema } from '@vendors/joi-validation/schemas/architects/createArchitectSchema';

class CreateArchitectController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        firstName, lastName, age, gender, phone, email, password,
      } = request.body;

      await createArchitectSchema.validateAsync({
        firstName, lastName, age, gender, phone, email, password,
      });

      const createArchitectUseCase = container.resolve(CreateArchitectUseCase);

      await createArchitectUseCase.execute({
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

export { CreateArchitectController }