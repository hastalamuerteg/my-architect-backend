import joi from 'joi';

const createCustomerSchema = joi.object({
  firstName: joi.string()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]{3,30}$/)
    .required(),
  lastName: joi.string()
    .min(5)
    .max(30)
    .pattern(/^[a-zA-Z]{3,30}$/)
    .required(),
  gender: joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z]{3,30}$/)
    .required(),
  phone: joi.string()
    .pattern(/(\(?\d{2}\)?\s)?(\d{4,5}\d{4})/)
    .required(),
  age: joi.string()
    .required(),
  email: joi.string()
    .email()
    .trim()
    .required(),
  password: joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export { createCustomerSchema };
