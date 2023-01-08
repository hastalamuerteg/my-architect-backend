import { NextFunction, Request, Response } from 'express';

import { container } from '@vendors/inversifyDI/inversify.config';
import { listServiceRequestSchema } from '@vendors/joi-validation/schemas/serviceRequests/listServiceRequestSchema';
import { ListServiceRequestUseCase } from './ListServiceRequestUseCase';

class ListServiceRequestController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { customerId, architectId } = request.query;

      const listServiceRequestUseCase = container.resolve(ListServiceRequestUseCase);

      if (customerId) {
        await listServiceRequestSchema.validateAsync({ customerId });
        const list = await listServiceRequestUseCase.execute({
          customerId: customerId.toString(),
        });

        return response.status(200).send(list);
      }
      if (architectId) {
        await listServiceRequestSchema.validateAsync({ architectId });
        const list = await listServiceRequestUseCase.execute({
          architectId: architectId.toString()
        });

        return response.status(200).send(list);
      }
    } catch (error) {
      return next(error);
    }
  }
}

export { ListServiceRequestController }