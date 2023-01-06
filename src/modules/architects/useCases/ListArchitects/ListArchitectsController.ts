import { NextFunction, Request, Response } from 'express';

import { container } from '@vendors/inversifyDI/inversify.config';
import { ListArchitectsUseCase } from './ListArchitectsUseCase';
import { ListArchitectsUseCaseSchema } from '@vendors/joi-validation/schemas/architects/listArchitectsUseCaseSchema';

class ListArchitectsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { customerId } = request.params;

      await ListArchitectsUseCaseSchema.validateAsync({ customerId });

      const listArchitectsUseCase = container.resolve(ListArchitectsUseCase);

      const list = await listArchitectsUseCase.execute({ customerId });

      return response.status(201).send(list);
    } catch (error) {
      return next(error);
    }
  }
}

export { ListArchitectsController }