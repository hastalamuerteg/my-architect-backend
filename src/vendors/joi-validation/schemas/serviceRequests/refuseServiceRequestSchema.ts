import joi from 'joi';

const refuseServiceRequestSchema = joi.object({
  serviceRequestId: joi.string()
    .guid({
      version: [
        'uuidv4',
        'uuidv5',
      ],
    })
    .required(),
  architectId: joi.string()
    .guid({
      version: [
        'uuidv4',
        'uuidv5',
      ],
    })
    .required()
});

export { refuseServiceRequestSchema };
