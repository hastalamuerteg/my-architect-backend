import { injectable } from 'inversify';

import { ICreateServiceRequestDTO } from "@modules/serviceRequests/dtos/ICreateServiceRequestDTO";
import { IServiceRequestsRepository } from "../IServiceRequestsRepository";
import { PrismaClientInstance } from '@shared/orm/PrismaClientInstance/PrismaClientInstance';
import { PrismaDatabaseError } from '@errors/PrismaDatabaseError';

@injectable()
class ServiceRequestsRepository implements IServiceRequestsRepository {
  async create({
    title, description, customerId, architectId
  }: ICreateServiceRequestDTO) {
    try {
      await PrismaClientInstance.getInstance().serviceRequests.create({
        data: {
          title, description, customerId, architectId
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

  async findByOwnerArchitect(serviceRequestId: string, architectId: string) {
    try {
      const serviceRequest = await PrismaClientInstance.getInstance().serviceRequests.findFirst({
        where: {
          id: serviceRequestId,
          AND: {
            architectId
          }
        },
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

  async delete(serviceRequestId: string) {
    try {
      await PrismaClientInstance.getInstance().serviceRequests.update({
        where: {
          id: serviceRequestId
        },
        data: {
          active: false
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

  async accept(serviceRequestId: string) {
    try {
      await PrismaClientInstance.getInstance().serviceRequests.update({
        where: {
          id: serviceRequestId,
        },
        data: {
          requested: false,
          accepted: true
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

  async refuse(serviceRequestId: string) {
    try {
      await PrismaClientInstance.getInstance().serviceRequests.update({
        where: {
          id: serviceRequestId
        },
        data: {
          requested: false,
          accepted: false,
          refused: true
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

  async listByCustomer(customerId: string) {
    try {
      const list = await PrismaClientInstance.getInstance().serviceRequests.findMany({
        where: {
          customerId
        },
      })
      return list
    } catch (error) {
      throw new PrismaDatabaseError({
        message: error.message,
        code: error.code,
        statusCode: error.statusCode ?? 400,
        meta: error.meta.field_name,
      });
    }
  }

  async listByArchitect(architectId: string) {
    try {
      const list = await PrismaClientInstance.getInstance().serviceRequests.findMany({
        where: {
          architectId
        },
      })
      return list
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
