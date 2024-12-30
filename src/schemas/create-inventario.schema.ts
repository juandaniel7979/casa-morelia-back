import * as Joi from 'joi';

const CreateInventarioSchema = Joi.array().items(
  Joi.object({
    nombre: Joi.string().required(),
    cantidad: Joi.number().integer().min(1).required(),
    precio: Joi.number().min(0).required(),
  }),
);

const BulkInventarioSchema = Joi.array().items(CreateInventarioSchema);

export{ CreateInventarioSchema, BulkInventarioSchema };