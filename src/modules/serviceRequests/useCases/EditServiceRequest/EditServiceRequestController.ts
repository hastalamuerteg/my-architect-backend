import { container } from '@vendors/inversifyDI/inversify.config';
import { editServiceRequestSchema } from '@vendors/joi-validation/schemas/serviceRequests/editServiceRequestSchema';
import { NextFunction, Request, Response } from 'express';
import { EditServiceRequestUseCase } from './EditServiceRequestUseCase';

class EditServiceRequestController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { serviceRequestId } = request.params;
    const { title, description, customerId } = request.body;
    try {
      await editServiceRequestSchema.validateAsync({
        title, description, customerId
      })

      const editServiceRequestUseCase = container.resolve(EditServiceRequestUseCase)

      const editedServiceRequest = await editServiceRequestUseCase.execute({ title, description, customerId, serviceRequestId })

      return response.status(200).send(editedServiceRequest)
    } catch (error) {
      return next(error);
    }
  }
}

export { EditServiceRequestController }