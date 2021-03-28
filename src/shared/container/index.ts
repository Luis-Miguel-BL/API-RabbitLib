import { container } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UserRepository";

import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import UserTokenRepository from "@modules/users/infra/typeorm/repositories/UserTokenRepository";

import INationalityRepository from "@modules/author/repositories/INationalityRepository";
import NationalityRepository from "@modules/author/infra/typeorm/repositories/NationalityRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);
container.registerSingleton<INationalityRepository>(
  "NationalityRepository",
  NationalityRepository
);
