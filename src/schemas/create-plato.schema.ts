import * as Joi from 'joi';

export const CreatePlatoSchema = Joi.object({
  nombre: Joi.string().required(),
  precio: Joi.number().required(),
  descripcion: Joi.string().optional(),
});
