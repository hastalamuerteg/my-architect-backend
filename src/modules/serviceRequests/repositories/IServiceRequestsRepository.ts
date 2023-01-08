import { serviceRequests } from "@prisma/client"
import { ICreateServiceRequestDTO } from "../dtos/ICreateServiceRequestDTO"

interface IServiceRequestsRepository {
  create: (serviceRequest: ICreateServiceRequestDTO) => Promise<void>
  findById: (serviceRequestId: string) => Promise<serviceRequests>
  findByTitle: (title: string) => Promise<serviceRequests>
  update: (title: string, description: string, serviceRequestId: string) => Promise<serviceRequests>
}

export { IServiceRequestsRepository }