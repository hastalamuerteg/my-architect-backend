import { ListArchitectsController } from "@modules/architects/useCases/ListArchitects/ListArchitectsController";
import { Router } from "express";

const architectRouter = Router();

const listArchitectsController = new ListArchitectsController()

architectRouter.get('/:customerId', listArchitectsController.handle)

export { architectRouter }