import { CreateServiceRequestController } from "@modules/serviceRequests/useCases/CreateServiceRequest/CreateServiceRequestController";
import { DeleteServiceRequestController } from "@modules/serviceRequests/useCases/DeleteServiceRequest/DeleteServiceRequestController";
import { EditServiceRequestController } from "@modules/serviceRequests/useCases/EditServiceRequest/EditServiceRequestController";
import { Router } from "express";

const serviceRequestRouter = Router()

const createServiceRequestController = new CreateServiceRequestController()
const editServiceRequestController = new EditServiceRequestController()
const deleteServiceRequestController = new DeleteServiceRequestController()

serviceRequestRouter.post('/', createServiceRequestController.handle)
serviceRequestRouter.post('/:serviceRequestId', editServiceRequestController.handle)
serviceRequestRouter.patch('/:serviceRequestId', deleteServiceRequestController.handle)

export { serviceRequestRouter }