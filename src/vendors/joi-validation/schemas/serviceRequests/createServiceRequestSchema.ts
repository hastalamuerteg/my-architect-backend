import joi from 'joi';

const createServiceRequestSchema = joi.object({
  title: joi.string()
    .min(3)
    .max(30)
    .required(),
  description: joi.string()
    .min(5)
    .required(),
  customerId: joi.string()
    .guid({
      version: [
        'uuidv4',
        'uuidv5',
      ],
    }),
  architectId: joi.string()
    .guid({
      version: [
        'uuidv4',
        'uuidv5',
      ],
    }),
});

export { createServiceRequestSchema };
