import { CreateArchitectController } from "@modules/architects/useCases/CreateArchitect/CreateArchitectController";
import { ListArchitectsController } from "@modules/architects/useCases/ListArchitects/ListArchitectsController";
import { Router } from "express";

const architectRouter = Router();

const listArchitectsController = new ListArchitectsController()
const createArchitectController = new CreateArchitectController()

architectRouter.post('/', createArchitectController.handle)
architectRouter.get('/:customerId', listArchitectsController.handle)

export { architectRouter }