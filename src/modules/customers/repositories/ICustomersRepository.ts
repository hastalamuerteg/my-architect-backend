import { Customer } from '@prisma/client';

import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';

interface ICustomersRepository {
  create: (data: ICreateCustomerDTO) => Promise<void>
  findByEmail: (email: string) => Promise<Customer>
  findById: (id: string) => Promise<Customer>
}

export { ICustomersRepository };
