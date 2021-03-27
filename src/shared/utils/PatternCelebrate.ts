import { Joi } from "celebrate";

const _Joi = {
  uuid: Joi.string().uuid({ version: "uuidv4" }),
  email: Joi.string().email(),
  password: Joi.string().min(6),
};
export default _Joi;
