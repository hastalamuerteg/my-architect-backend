import { hash } from 'bcrypt';
import { injectable, inject } from 'inversify';

import { BaseError } from '@errors/BaseError';
import { TYPES } from '@vendors/inversifyDI/types';
import { CustomersRepository } from '@modules/customers/repositories/implementations/CustomersRepository';

interface IRequest {
  firstName: string
  lastName: string
  age: string
  gender: string
  phone: string
  email: string
  password: string
}

@injectable()
class CreateCustomerUseCase {
  constructor(@inject(TYPES.CustomersRepository) private customersRepository: CustomersRepository) { }

  async execute({
    firstName, lastName, age, gender, phone, email, password
  }: IRequest) {
    const customerAlreadyExists = await this.customersRepository.findByEmail(email);

    if (customerAlreadyExists) throw new BaseError({ statusCode: 400, message: 'customer already exists' });

    const hashKeyPassword = await hash(password, 8);

    await this.customersRepository.create({
      firstName,
      lastName,
      age,
      gender,
      phone,
      email,
      password: hashKeyPassword,
    });
  }
}

export { CreateCustomerUseCase };
