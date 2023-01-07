import { injectable, inject } from 'inversify';

import { BaseError } from '@errors/BaseError';
import { TYPES } from '@vendors/inversifyDI/types';
import { CustomersRepository } from '@modules/customers/repositories/implementations/CustomersRepository';
import { ArchitectsRepository } from '@modules/architects/repositories/implementations/ArchitectsRepository';

interface IRequest {
  customerId: string
}

@injectable()
class ListArchitectsUseCase {
  constructor(
    @inject(TYPES.CustomersRepository) private customersRepository: CustomersRepository,
    @inject(TYPES.ArchitectsRepository) private architectsRepository: ArchitectsRepository
  ) { }

  async execute({ customerId }: IRequest) {
    const isValidCustomer = await this.customersRepository.findById(customerId);

    if (!isValidCustomer) throw new BaseError({ statusCode: 400, message: 'Invalid request - unable to find customer' });

    const list = await this.architectsRepository.listArchitects()
    return list
  }
}

export { ListArchitectsUseCase }