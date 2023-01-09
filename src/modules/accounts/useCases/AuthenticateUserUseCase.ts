import { injectable, inject } from 'inversify';
import { compare } from 'bcrypt';
import { BaseError } from '@errors/BaseError';
import { TYPES } from '@vendors/inversifyDI/types';
import { CustomersRepository } from '@modules/customers/repositories/implementations/CustomersRepository';
import { ArchitectsRepository } from '@modules/architects/repositories/implementations/ArchitectsRepository';

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  id: string
  firstName: string
  lastName: string
  gender: string
  phone: string
  email: string
  isCustomer?: boolean
  isArchitect?: boolean
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject(TYPES.CustomersRepository) private customersRepository: CustomersRepository,
    @inject(TYPES.ArchitectsRepository) private architectsRepository: ArchitectsRepository
  ) { }

  async execute({
    email, password
  }: IRequest): Promise<IResponse> {
    const isCustomer = await this.customersRepository.findByEmail(email);
    const isArchitect = await this.architectsRepository.findByEmail(email);

    if (!isCustomer && !isArchitect) throw new BaseError({ statusCode: 400, message: 'Email or password incorrect' });

    if (isCustomer) {
      const matchingPasswordKey = await compare(password, isCustomer.password);
      if (!matchingPasswordKey) throw new BaseError({ statusCode: 400, message: 'Email or password incorrect' });

      const customer = {
        id: isCustomer.id,
        firstName: isCustomer.firstName,
        lastName: isCustomer.lastName,
        gender: isCustomer.gender,
        phone: isCustomer.phone,
        email: isCustomer.email,
        isCustomer: true
      }

      return customer
    }

    if (isArchitect) {
      const matchingPasswordKey = await compare(password, isArchitect.password);
      if (!matchingPasswordKey) throw new BaseError({ statusCode: 400, message: 'Email or password incorrect' });

      const architect = {
        id: isArchitect.id,
        firstName: isArchitect.firstName,
        lastName: isArchitect.lastName,
        gender: isArchitect.gender,
        phone: isArchitect.phone,
        email: isArchitect.email,
        isArchitect: true
      }

      return architect
    }
  }
}

export { AuthenticateUserUseCase }