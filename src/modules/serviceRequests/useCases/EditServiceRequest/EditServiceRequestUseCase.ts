import { BaseError } from "@errors/BaseError";
import { CustomersRepository } from "@modules/customers/repositories/implementations/CustomersRepository";
import { ServiceRequestsRepository } from "@modules/serviceRequests/repositories/implementations/ServiceRequestsRepository";
import { TYPES } from "@vendors/inversifyDI/types";
import { inject, injectable } from "inversify";

interface IRequest {
  title: string
  description: string
  customerId: string
  serviceRequestId: string
}

@injectable()
class EditServiceRequestUseCase {
  constructor(
    @inject(TYPES.CustomersRepository) private customersRepository: CustomersRepository,
    @inject(TYPES.ServiceRequestsRepository) private serviceRequestsRepository: ServiceRequestsRepository
  ) { }
  async execute({
    title, description, customerId, serviceRequestId
  }: IRequest) {
    const isValidCustomer = await this.customersRepository.findById(customerId)
    if (!isValidCustomer) throw new BaseError({ statusCode: 400, message: 'Customer not found' })

    const doesServiceRequestAlreadyExist = await this.serviceRequestsRepository.findById(serviceRequestId)
    if (!doesServiceRequestAlreadyExist) throw new BaseError({ statusCode: 400, message: 'This service was not found.' })

    const editedServiceRequest = await this.serviceRequestsRepository.update(
      title, description, serviceRequestId
    )

    return editedServiceRequest
  }
}

export { EditServiceRequestUseCase }