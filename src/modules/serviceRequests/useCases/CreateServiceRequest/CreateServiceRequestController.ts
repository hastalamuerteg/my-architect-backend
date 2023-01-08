import { container } from '@vendors/inversifyDI/inversify.config';
import { createServiceRequestSchema } from '@vendors/joi-validation/schemas/serviceRequests/createServiceRequestSchema';
import { NextFunction, Request, Response } from 'express';
import { CreateServiceRequestUseCase } from './CreateServiceRequestUseCase';

class CreateServiceRequestController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { title, description, customerId, architectId, requested, accepted, refused } = request.body;

      await createServiceRequestSchema.validateAsync({
        title, description, customerId, architectId, requested, accepted, refused
      })

      const createServiceRequestUseCase = container.resolve(CreateServiceRequestUseCase)

      await createServiceRequestUseCase.execute({
        title, description, customerId, architectId, requested, accepted, refused
      })

      return response.status(200).send()
    } catch (error) {
      return next(error);
    }
  }
}

export { CreateServiceRequestController }
