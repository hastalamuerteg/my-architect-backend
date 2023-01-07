import { serviceRequests } from "@prisma/client"
import { ICreateServiceRequestDTO } from "../dtos/ICreateServiceRequestDTO"

interface IServiceRequestsRepository {
  create: (serviceRequest: ICreateServiceRequestDTO) => Promise<void>
  findByTitle: (title: string) => Promise<serviceRequests>
}

export { IServiceRequestsRepository }