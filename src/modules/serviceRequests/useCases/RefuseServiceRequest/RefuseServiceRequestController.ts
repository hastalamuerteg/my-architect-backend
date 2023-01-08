import { NextFunction, Request, Response } from 'express';
import { container } from '@vendors/inversifyDI/inversify.config';
import { refuseServiceRequestSchema } from '@vendors/joi-validation/schemas/serviceRequests/refuseServiceRequestSchema';
import { RefuseServiceRequestUseCase } from './RefuseServiceRequestUseCase';

class RefuseServiceRequestController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { serviceRequestId, architectId } = request.params;
    try {
      await refuseServiceRequestSchema.validateAsync({
        serviceRequestId, architectId
      })

      const refuseServiceRequestUseCase = container.resolve(RefuseServiceRequestUseCase)

      await refuseServiceRequestUseCase.execute({ serviceRequestId, architectId })

      return response.status(200).send()
    } catch (error) {
      return next(error);
    }
  }
}

export { RefuseServiceRequestController }