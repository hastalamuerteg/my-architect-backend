import joi from 'joi';

const ListArchitectsUseCaseSchema = joi.object({
  customerId: joi.string()
    .guid({
      version: [
        'uuidv4',
        'uuidv5',
      ],
    }),
});

export { ListArchitectsUseCaseSchema };
