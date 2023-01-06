import { Container } from 'inversify';

import { CustomersRepository } from '@modules/customers/repositories/implementations/CustomersRepository';

import { TYPES } from './types';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';

const container = new Container();
container.bind<ICustomersRepository>(TYPES.CustomersRepository).to(CustomersRepository);
export { container };
