import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import _Joi from "@shared/utils/PatternCelebrate";
import UsersController from "@modules/users/infra/http/controllers/UserController";

const usersRouter = Router();
const userController = new UsersController();

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: _Joi.email.required(),
      password: _Joi.password.required(),
      password_confirm: Joi.ref("password"),
      date_birth: Joi.date(),
      permissions: Joi.array()
        .min(1)
        .items(Joi.string().valid("default", "admin").required())
        .required(),
    },
  }),
  userController.create
);

usersRouter.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      email: _Joi.email.required(),
      password: _Joi.password.required(),
    },
  }),
  userController.login
);

usersRouter.put(
  "/create-password",
  celebrate({
    [Segments.BODY]: {
      email: _Joi.email.required(),
      token: Joi.string().length(6).required(),
      new_password: _Joi.password.required(),
      new_password_confirm: Joi.ref("new_password"),
    },
  }),
  userController.createPassword
);

usersRouter.post(
  "/token",
  celebrate({
    [Segments.BODY]: {
      email: _Joi.email.required(),
    },
  }),
  userController.createToken
);

export default usersRouter;
