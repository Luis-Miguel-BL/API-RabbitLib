import { Joi } from "celebrate";

const _Joi = {
  uuid: Joi.string().uuid({ version: "uuidv4" }),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  number: Joi.number().positive().integer(),
};
export default _Joi;
