import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUserController";
import { Router } from "express";

const authRouter = Router();

const authenticateUserController = new AuthenticateUserController()

// POST routes
authRouter.post('/', authenticateUserController.handle)

export { authRouter }