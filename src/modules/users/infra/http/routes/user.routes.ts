import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import UsersController from "@modules/users/infra/http/controllers/UserController";
import authentication from "@shared/infra/middlewares/authentication";
import _Joi from "@shared/utils/PatternCelebrate";

const usersRouter = Router();
const userController = new UsersController();

usersRouter.use(authentication);

usersRouter.get("/me", userController.get);

usersRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      date_birth: Joi.date(),
      permissions: Joi.array()
        .min(1)
        .items(Joi.string().valid("default", "admin").required())
        .required(),
    },
  }),
  userController.update
);

usersRouter.patch(
  "/change-password",
  celebrate({
    [Segments.BODY]: {
      password: _Joi.password.required(),
      new_password: _Joi.password.required(),
      new_password_confirm: Joi.ref("new_password"),
    },
  }),
  userController.changePassword
);

export default usersRouter;
