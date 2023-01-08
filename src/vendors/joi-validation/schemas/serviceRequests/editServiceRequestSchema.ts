import joi from 'joi';

const editServiceRequestSchema = joi.object({
  title: joi.string()
    .min(3)
    .max(20)
    .required(),
  description: joi.string()
    .min(5)
    .max(30)
    .required(),
  customerId: joi.string()
    .guid({
      version: [
        'uuidv4',
        'uuidv5',
      ],
    })
    .required()
});

export { editServiceRequestSchema };
