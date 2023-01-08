import { NextFunction, Request, Response } from 'express';
import { container } from '@vendors/inversifyDI/inversify.config';
import { deleteServiceRequestSchema } from '@vendors/joi-validation/schemas/serviceRequests/deleteServiceRequestSchema';
import { DeleteServiceRequestUseCase } from './DeleteServiceRequestUseCase';

class DeleteServiceRequestController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { serviceRequestId } = request.params;
    try {
      await deleteServiceRequestSchema.validateAsync({
        serviceRequestId
      })

      const deleteServiceRequestUseCase = container.resolve(DeleteServiceRequestUseCase)

      await deleteServiceRequestUseCase.execute({ serviceRequestId })

      return response.status(200).send()
    } catch (error) {
      return next(error);
    }
  }
}

export { DeleteServiceRequestController }