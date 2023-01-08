import { BaseError } from "@errors/BaseError";
import { ArchitectsRepository } from "@modules/architects/repositories/implementations/ArchitectsRepository";
import { CustomersRepository } from "@modules/customers/repositories/implementations/CustomersRepository";
import { ServiceRequestsRepository } from "@modules/serviceRequests/repositories/implementations/ServiceRequestsRepository";
import { TYPES } from "@vendors/inversifyDI/types";
import { inject, injectable } from "inversify";

interface IRequest {
  title: string
  description: string
  customerId: string
  architectId: string
  requested?: boolean
  accepted?: boolean
  refused?: boolean
}

@injectable()
class CreateServiceRequestUseCase {
  constructor(
    @inject(TYPES.CustomersRepository) private customersRepository: CustomersRepository,
    @inject(TYPES.ArchitectsRepository) private architectsRepository: ArchitectsRepository,
    @inject(TYPES.ServiceRequestsRepository) private serviceRequestsRepository: ServiceRequestsRepository
  ) { }
  async execute({
    title, description, customerId, architectId, requested, accepted, refused
  }: IRequest) {
    const isValidCustomer = await this.customersRepository.findById(customerId)
    if (!isValidCustomer) throw new BaseError({ statusCode: 400, message: 'Invalid customer' })

    const isValidArchitect = await this.architectsRepository.findById(architectId)
    if (!isValidArchitect) throw new BaseError({ statusCode: 400, message: 'Invalid architect' })

    const doesServiceRequestAlreadyExist = await this.serviceRequestsRepository.findByTitle(title)
    if (doesServiceRequestAlreadyExist) throw new BaseError({ statusCode: 400, message: 'This service request already exist.' })

    await this.serviceRequestsRepository.create({
      title, description, customerId, architectId, requested, accepted, refused
    })
  }
}

export { CreateServiceRequestUseCase }