import { injectable } from 'inversify';

import { PrismaDatabaseError } from '@errors/PrismaDatabaseError';
import { ICreateCustomerDTO } from '@modules/customers/dtos/ICreateCustomerDTO';
import { PrismaClientInstance } from '@shared/orm/PrismaClientInstance/PrismaClientInstance';

import { ICustomersRepository } from '../ICustomersRepository';

@injectable()
class CustomersRepository implements ICustomersRepository {
  async create({
    firstName, lastName, age, gender, phone, email, password,
  }: ICreateCustomerDTO) {
    try {
      await PrismaClientInstance.getInstance().customer.create({
        data: {
          firstName, lastName, age, gender, phone, email, password,
        },
      });
    } catch (error) {
      throw new PrismaDatabaseError({
        message: error.message,
        code: error.code,
        statusCode: error.statusCode ?? 400,
        meta: error.meta.field_name,
      });
    }
  }

  async findByEmail(email: string) {
    try {
      const customer = await PrismaClientInstance.getInstance().customer.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      });
      return customer;
    } catch (error) {
      throw new PrismaDatabaseError({
        message: error.message,
        code: error.code,
        statusCode: error.statusCode ?? 400,
        meta: error.meta.field_name,
      });
    }
  }

  async findById(id: string) {
    try {
      const customer = await PrismaClientInstance.getInstance().customer.findUnique({
        where: {
          id,
        },
      });

      return customer;
    } catch (error) {
      throw new PrismaDatabaseError({
        message: error.message,
        code: error.code,
        statusCode: error.statusCode ?? 400,
        meta: error.meta.field_name,
      });
    }
  }
}

export { CustomersRepository };
