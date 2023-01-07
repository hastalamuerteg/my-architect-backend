import { injectable } from 'inversify';

import { PrismaDatabaseError } from '@errors/PrismaDatabaseError';
import { PrismaClientInstance } from '@shared/orm/PrismaClientInstance/PrismaClientInstance';

import { IArchitectsRepository } from '../IArchitectsRepository';
import { ICreateArchitectDTO } from '@modules/architects/dtos/ICreateArchitectDTO';

@injectable()
class ArchitectsRepository implements IArchitectsRepository {
  async create({
    firstName, lastName, age, gender, phone, email, password,
  }: ICreateArchitectDTO) {
    try {
      await PrismaClientInstance.getInstance().architect.create({
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
      const architect = await PrismaClientInstance.getInstance().architect.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      });
      return architect;
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
      const architect = await PrismaClientInstance.getInstance().architect.findUnique({
        where: {
          id,
        },
      });

      return architect;
    } catch (error) {
      throw new PrismaDatabaseError({
        message: error.message,
        code: error.code,
        statusCode: error.statusCode ?? 400,
        meta: error.meta.field_name,
      });
    }
  }

  async listArchitects() {
    try {
      const architects = await PrismaClientInstance.getInstance().architect.findMany();
      const list = architects.map((architect) => {
        return {
          id: architect.id,
          firstName: architect.firstName,
          lastName: architect.lastName,
          gender: architect.gender,
          phone: architect.phone,
          email: architect.email,
        }
      })
      return list;
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

export { ArchitectsRepository };
