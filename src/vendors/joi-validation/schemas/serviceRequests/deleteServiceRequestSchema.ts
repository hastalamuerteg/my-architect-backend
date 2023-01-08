import joi from 'joi';

const deleteServiceRequestSchema = joi.object({
  serviceRequestId: joi.string()
    .guid({
      version: [
        'uuidv4',
        'uuidv5',
      ],
    })
    .required()
});

export { deleteServiceRequestSchema };
