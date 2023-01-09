import { NextFunction, Request, Response } from 'express';

import { container } from '@vendors/inversifyDI/inversify.config';
import { authenticateUserSchema } from '@vendors/joi-validation/schemas/accounts/authenticateUserSchema';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = request.body;

      await authenticateUserSchema.validateAsync({
        email, password,
      });

      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

      const user = await authenticateUserUseCase.execute({
        email: email.trim(),
        password,
      });

      return response.status(200).send(user);
    } catch (error) {
      return next(error);
    }
  }
}

export { AuthenticateUserController }