import { Router, Request, Response } from "express";
import authRouter from "@modules/users/infra/http/routes/auth.routes";
import userRouter from "@modules/users/infra/http/routes/user.routes";
import nationalityRouter from "@modules/nationality/infra/http/routes/nationality.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/auth", authRouter);
routes.use("/nationalities", nationalityRouter);

routes.get("/", function (request: Request, response: Response) {
  response.json({
    version: "1.0",
  });
});

export default routes;
