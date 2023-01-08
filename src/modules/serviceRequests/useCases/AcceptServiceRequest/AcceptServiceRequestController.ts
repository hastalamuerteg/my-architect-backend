import { acceptServiceRequestSchema } from "@vendors/joi-validation/schemas/serviceRequests/acceptServiceRequestSchema";
import { NextFunction, Request, Response } from 'express';
import { container } from '@vendors/inversifyDI/inversify.config';
import { AcceptServiceRequestUseCase } from "./AcceptServiceRequestUseCase";

class AcceptServiceRequestController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { serviceRequestId, architectId } = request.params;
    try {
      await acceptServiceRequestSchema.validateAsync({
        serviceRequestId, architectId
      })

      const acceptServiceRequestUseCase = container.resolve(AcceptServiceRequestUseCase)

      await acceptServiceRequestUseCase.execute({ serviceRequestId, architectId })

      return response.status(200).send()
    } catch (error) {
      return next(error);
    }
  }
}

export { AcceptServiceRequestController }