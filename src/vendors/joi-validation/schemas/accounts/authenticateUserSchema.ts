import joi from 'joi';

const authenticateUserSchema = joi.object({
  email: joi.string()
    .email()
    .trim()
    .required(),
  password: joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export { authenticateUserSchema };
