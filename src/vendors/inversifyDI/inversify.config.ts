import { Container } from 'inversify';

import { CustomersRepository } from '@modules/customers/repositories/implementations/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';

import { TYPES } from './types';
import { ArchitectsRepository } from '@modules/architects/repositories/implementations/ArchitectsRepository';
import { IArchitectsRepository } from '@modules/architects/repositories/IArchitectsRepository';
import { IServiceRequestsRepository } from '@modules/serviceRequests/repositories/IServiceRequestsRepository';
import { ServiceRequestsRepository } from '@modules/serviceRequests/repositories/implementations/ServiceRequestsRepository';

const container = new Container();
container.bind<ICustomersRepository>(TYPES.CustomersRepository).to(CustomersRepository);
container.bind<IArchitectsRepository>(TYPES.ArchitectsRepository).to(ArchitectsRepository);
container.bind<IServiceRequestsRepository>(TYPES.ServiceRequestsRepository).to(ServiceRequestsRepository);
export { container };
