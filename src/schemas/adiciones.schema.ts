import * as Joi from 'joi';

const createAdicion = Joi.object({
    nombre: Joi.string().required(),
    precio: Joi.number().min(0).required(),
  });

const BulkAdicionSchema = Joi.array().items(createAdicion);

export{ createAdicion, BulkAdicionSchema };