import { injectable } from 'inversify';

import { ICreateServiceRequestDTO } from "@modules/serviceRequests/dtos/ICreateServiceRequestDTO";
import { IServiceRequestsRepository } from "../IServiceRequestsRepository";
import { PrismaClientInstance } from '@shared/orm/PrismaClientInstance/PrismaClientInstance';
import { PrismaDatabaseError } from '@errors/PrismaDatabaseError';

@injectable()
class ServiceRequestsRepository implements IServiceRequestsRepository {
  async create({
    title, description, customerId, architectId, requested, accepted, refused
  }: ICreateServiceRequestDTO) {
    try {
      await PrismaClientInstance.getInstance().serviceRequests.create({
        data: {
          title, description, customerId, architectId, requested, accepted, refused
        }
      })
    } catch (error) {
      throw new PrismaDatabaseError({
        message: error.message,
        code: error.code,
        statusCode: error.statusCode ?? 400,
        meta: error.meta.field_name,
      });
    }
  }
  async findByTitle(title: string) {
    try {
      const serviceRequest = await PrismaClientInstance.getInstance().serviceRequests.findFirst({
        where: {
          title
        }
      })
      return serviceRequest;
    } catch (error) {
      throw new PrismaDatabaseError({
        message: error.message,
        code: error.code,
        statusCode: error.statusCode ?? 400,
        meta: error.meta.field_name,
      });
    }
  }

  async findById(serviceRequestId: string) {
    try {
      const serviceRequest = await PrismaClientInstance.getInstance().serviceRequests.findFirst({
        where: {
          id: serviceRequestId
        }
      })
      return serviceRequest;
    } catch (error) {
      throw new PrismaDatabaseError({
        message: error.message,
        code: error.code,
        statusCode: error.statusCode ?? 400,
        meta: error.meta.field_name,
      });
    }
  }

  async update(title: string, description: string, serviceRequestId: string) {
    try {
      const serviceRequest = await PrismaClientInstance.getInstance().serviceRequests.update({
        where: {
          id: serviceRequestId
        },
        data: {
          title,
          description
        }
      })
      return serviceRequest;
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

export { ServiceRequestsRepository }
