import { injectable, inject } from 'inversify';

import { BaseError } from '@errors/BaseError';
import { TYPES } from '@vendors/inversifyDI/types';
import { CustomersRepository } from '@modules/customers/repositories/implementations/CustomersRepository';

interface IRequest {
  customerId: string
}

@injectable()
class ListArchitectsUseCase {
  constructor(@inject(TYPES.CustomersRepository) private customersRepository: CustomersRepository) { }

  async execute({ customerId }: IRequest) {
    const isValidCustomer = await this.customersRepository.findById(customerId);

    if (!isValidCustomer) throw new BaseError({ statusCode: 400, message: 'Invalid request - unable to find customer' });

    const list = await this.customersRepository.listArchitects()
    return list
  }
}

export { ListArchitectsUseCase }