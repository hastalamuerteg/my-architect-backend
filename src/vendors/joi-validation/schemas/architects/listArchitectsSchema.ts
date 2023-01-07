import joi from 'joi';

const listArchitectsSchema = joi.object({
  customerId: joi.string()
    .guid({
      version: [
        'uuidv4',
        'uuidv5',
      ],
    }),
});

export { listArchitectsSchema };
