import { BaseError } from "@errors/BaseError";
import { ServiceRequestsRepository } from "@modules/serviceRequests/repositories/implementations/ServiceRequestsRepository";
import { TYPES } from "@vendors/inversifyDI/types";
import { inject, injectable } from "inversify";

interface IRequest {
  serviceRequestId: string
}

@injectable()
class DeleteServiceRequestUseCase {
  constructor(
    @inject(TYPES.ServiceRequestsRepository) private serviceRequestsRepository: ServiceRequestsRepository
  ) { }
  async execute({
    serviceRequestId
  }: IRequest) {
    const doesServiceRequestAlreadyExist = await this.serviceRequestsRepository.findById(serviceRequestId)
    if (!doesServiceRequestAlreadyExist) throw new BaseError({ statusCode: 400, message: 'This service was not found.' })

    await this.serviceRequestsRepository.delete(serviceRequestId)
  }
}

export { DeleteServiceRequestUseCase }