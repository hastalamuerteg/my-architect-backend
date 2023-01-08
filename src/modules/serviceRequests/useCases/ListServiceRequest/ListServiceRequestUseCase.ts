import { injectable, inject } from 'inversify';

import { BaseError } from '@errors/BaseError';
import { TYPES } from '@vendors/inversifyDI/types';
import { CustomersRepository } from '@modules/customers/repositories/implementations/CustomersRepository';
import { ArchitectsRepository } from '@modules/architects/repositories/implementations/ArchitectsRepository';
import { ServiceRequestsRepository } from '@modules/serviceRequests/repositories/implementations/ServiceRequestsRepository';

interface IRequest {
  customerId?: string
  architectId?: string
}

@injectable()
class ListServiceRequestUseCase {
  constructor(
    @inject(TYPES.CustomersRepository) private customersRepository: CustomersRepository,
    @inject(TYPES.ArchitectsRepository) private architectsRepository: ArchitectsRepository,
    @inject(TYPES.ServiceRequestsRepository) private serviceRequestsRepository: ServiceRequestsRepository
  ) { }

  async execute({ customerId, architectId }: IRequest) {
    if (customerId) {
      const isValidCustomer = await this.customersRepository.findById(customerId);
      if (!isValidCustomer) throw new BaseError({ statusCode: 400, message: 'Invalid request - unable to find customer' });

      const list = await this.serviceRequestsRepository.listByCustomer(customerId)
      return list
    }

    if (architectId) {
      const isValidArchitect = await this.architectsRepository.findById(architectId);
      if (!isValidArchitect) throw new BaseError({ statusCode: 400, message: 'Invalid request - unable to find architect' });

      const list = await this.serviceRequestsRepository.listByArchitect(architectId)
      return list
    }
  }
}

export { ListServiceRequestUseCase }