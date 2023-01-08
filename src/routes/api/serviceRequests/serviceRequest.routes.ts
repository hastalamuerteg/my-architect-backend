import { CreateServiceRequestController } from "@modules/serviceRequests/useCases/CreateServiceRequest/CreateServiceRequestController";
import { EditServiceRequestController } from "@modules/serviceRequests/useCases/EditServiceRequest/EditServiceRequestController";
import { Router } from "express";

const serviceRequestRouter = Router()

const createServiceRequestController = new CreateServiceRequestController()
const editServiceRequestController = new EditServiceRequestController()

serviceRequestRouter.post('/', createServiceRequestController.handle)
serviceRequestRouter.post('/:serviceRequestId', editServiceRequestController.handle)

export { serviceRequestRouter }