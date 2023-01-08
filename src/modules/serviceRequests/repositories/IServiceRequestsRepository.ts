import { serviceRequests } from "@prisma/client"
import { ICreateServiceRequestDTO } from "../dtos/ICreateServiceRequestDTO"

interface IServiceRequestsRepository {
  create: (serviceRequest: ICreateServiceRequestDTO) => Promise<void>
  findById: (serviceRequestId: string) => Promise<serviceRequests>
  findByTitle: (title: string) => Promise<serviceRequests>
  findByOwnerArchitect: (serviceRequestId: string, architectId: string) => Promise<serviceRequests>
  update: (title: string, description: string, serviceRequestId: string) => Promise<serviceRequests>
  delete: (serviceRequestId: string) => Promise<void>
  accept: (serviceRequestId: string) => Promise<void>
  refuse: (serviceRequestId: string) => Promise<void>
}

export { IServiceRequestsRepository }