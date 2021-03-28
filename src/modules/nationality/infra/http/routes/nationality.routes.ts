import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import UsersController from "@modules/nationality/infra/http/controllers/NationalityController";
import authentication from "@shared/infra/middlewares/authentication";
import _Joi from "@shared/utils/PatternCelebrate";

const nationalityRouter = Router();
const nationalityController = new UsersController();

nationalityRouter.use(authentication);

nationalityRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      flag: Joi.string(),
      code: _Joi.number,
    },
  }),
  nationalityController.create
);

nationalityRouter.get(
  "/:id_nationality",
  celebrate({
    [Segments.PARAMS]: {
      id_nationality: _Joi.uuid.required(),
    },
  }),
  nationalityController.get
);

nationalityRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      description: Joi.string(),
      flag: Joi.string(),
      code: _Joi.number,
      limit: _Joi.number,
      offset: _Joi.number,
    },
  }),
  nationalityController.list
);

nationalityRouter.put(
  "/:id_nationality",
  celebrate({
    [Segments.PARAMS]: {
      id_nationality: _Joi.uuid.required(),
    },
    [Segments.BODY]: Joi.object({
      description: Joi.string(),
      flag: Joi.string(),
      code: _Joi.number,
    }).min(1),
  }),
  nationalityController.update
);

nationalityRouter.delete(
  "/:id_nationality",
  celebrate({
    [Segments.PARAMS]: {
      id_nationality: _Joi.uuid.required(),
    },
  }),
  nationalityController.delete
);

export default nationalityRouter;
