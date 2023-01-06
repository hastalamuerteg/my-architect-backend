import { Customer } from '@prisma/client';

import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';
import { IListArchitectDTO } from '@modules/architects/dtos/IListArchitectDTO';

interface ICustomersRepository {
  create: (data: ICreateCustomerDTO) => Promise<void>
  findByEmail: (email: string) => Promise<Customer>
  findById: (id: string) => Promise<Customer>
  listArchitects: () => Promise<IListArchitectDTO[]>
}

export { ICustomersRepository };
