import { AcceptServiceRequestController } from "@modules/serviceRequests/useCases/AcceptServiceRequest/AcceptServiceRequestController";
import { CreateServiceRequestController } from "@modules/serviceRequests/useCases/CreateServiceRequest/CreateServiceRequestController";
import { DeleteServiceRequestController } from "@modules/serviceRequests/useCases/DeleteServiceRequest/DeleteServiceRequestController";
import { EditServiceRequestController } from "@modules/serviceRequests/useCases/EditServiceRequest/EditServiceRequestController";
import { ListServiceRequestController } from "@modules/serviceRequests/useCases/ListServiceRequest/ListServiceRequestController";
import { RefuseServiceRequestController } from "@modules/serviceRequests/useCases/RefuseServiceRequest/RefuseServiceRequestController";
import { Router } from "express";

const serviceRequestRouter = Router()

const createServiceRequestController = new CreateServiceRequestController()
const editServiceRequestController = new EditServiceRequestController()
const deleteServiceRequestController = new DeleteServiceRequestController()
const acceptServiceRequestController = new AcceptServiceRequestController()
const refuseServiceRequestController = new RefuseServiceRequestController()
const listServiceRequestController = new ListServiceRequestController()

// GET routes
serviceRequestRouter.get('/', listServiceRequestController.handle)

// POST routes
serviceRequestRouter.post('/', createServiceRequestController.handle)
serviceRequestRouter.post('/:serviceRequestId', editServiceRequestController.handle)

// PATCH routes
serviceRequestRouter.patch('/:serviceRequestId', deleteServiceRequestController.handle)
serviceRequestRouter.patch('/accept/:serviceRequestId/architect/:architectId', acceptServiceRequestController.handle)
serviceRequestRouter.patch('/refuse/:serviceRequestId/architect/:architectId', refuseServiceRequestController.handle)

export { serviceRequestRouter }