import joi from 'joi';

const listServiceRequestSchema = joi.object({
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
    })
});

export { listServiceRequestSchema };
