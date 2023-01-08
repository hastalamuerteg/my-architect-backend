import { BaseError } from "@errors/BaseError";
import { ArchitectsRepository } from "@modules/architects/repositories/implementations/ArchitectsRepository";
import { ServiceRequestsRepository } from "@modules/serviceRequests/repositories/implementations/ServiceRequestsRepository";
import { TYPES } from "@vendors/inversifyDI/types";
import { inject, injectable } from "inversify";

interface IRequest {
  serviceRequestId: string
  architectId: string
}

@injectable()
class AcceptServiceRequestUseCase {
  constructor(
    @inject(TYPES.ServiceRequestsRepository) private serviceRequestsRepository: ServiceRequestsRepository,
    @inject(TYPES.ArchitectsRepository) private architectsRepository: ArchitectsRepository
  ) { }
  async execute({
    serviceRequestId, architectId
  }: IRequest) {
    const isArchitectValid = await this.architectsRepository.findById(architectId)
    if (!isArchitectValid) throw new BaseError({ statusCode: 400, message: 'This architect was not found.' })

    const isServiceRequestValid = await this.serviceRequestsRepository.findById(serviceRequestId)
    if (!isServiceRequestValid) throw new BaseError({ statusCode: 400, message: 'This service request was not found.' })

    const isThisArchitectTheServiceRequestOwner = await this.serviceRequestsRepository.findByOwnerArchitect(serviceRequestId, architectId)
    if (!isThisArchitectTheServiceRequestOwner) throw new BaseError({ statusCode: 400, message: 'This service request does not belong to this architect' })

    await this.serviceRequestsRepository.accept(serviceRequestId)
  }
}

export { AcceptServiceRequestUseCase }