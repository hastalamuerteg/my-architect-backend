import { CreateServiceRequestController } from "@modules/serviceRequests/useCases/CreateServiceRequest/CreateServiceRequestController";
import { Router } from "express";

const serviceRequestRouter = Router()

const createServiceRequestController = new CreateServiceRequestController()

serviceRequestRouter.post('/', createServiceRequestController.handle)

export { serviceRequestRouter }