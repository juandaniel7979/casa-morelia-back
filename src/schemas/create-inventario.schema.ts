import * as Joi from 'joi';

const CreateInventarioSchema = Joi.object({
    nombre: Joi.string().required(),
    precio: Joi.number().min(0).required(),
  });

const BulkInventarioSchema = Joi.array().items(CreateInventarioSchema);

export{ CreateInventarioSchema, BulkInventarioSchema };