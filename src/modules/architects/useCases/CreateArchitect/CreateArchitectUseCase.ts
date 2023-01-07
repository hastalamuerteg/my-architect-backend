import { hash } from 'bcrypt';
import { injectable, inject } from 'inversify';

import { BaseError } from '@errors/BaseError';
import { TYPES } from '@vendors/inversifyDI/types';
import { ArchitectsRepository } from '@modules/architects/repositories/implementations/ArchitectsRepository';

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
class CreateArchitectUseCase {
  constructor(@inject(TYPES.ArchitectsRepository) private architectsRepository: ArchitectsRepository) { }

  async execute({
    firstName, lastName, age, gender, phone, email, password
  }: IRequest) {
    const architectAlreadyExists = await this.architectsRepository.findByEmail(email);

    if (architectAlreadyExists) throw new BaseError({ statusCode: 400, message: 'architect already exists' });

    const hashKeyPassword = await hash(password, 8);

    await this.architectsRepository.create({
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

export { CreateArchitectUseCase }