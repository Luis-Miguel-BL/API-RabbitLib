import { container } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UserRepository";

import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import UserTokenRepository from "@modules/users/infra/typeorm/repositories/UserTokenRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);
