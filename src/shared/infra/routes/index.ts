import { Router, Request, Response } from "express";
import authRouter from "@modules/users/infra/http/routes/auth.routes";
import userRouter from "@modules/users/infra/http/routes/user.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/auth", authRouter);

routes.get("/", function (request: Request, response: Response) {
  response.json({
    version: "1.0",
  });
});

export default routes;
