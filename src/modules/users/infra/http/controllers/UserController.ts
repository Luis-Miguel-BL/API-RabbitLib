import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";
import { resolve } from "path";

import GetUserByIdService from "@modules/users/services/GetUserByIdService";
import CreateUserService from "@modules/users/services/CreateUserService";
import CreatePasswordUserService from "@modules/users/services/CreatePasswordUserService";
import UpdateUserService from "@modules/users/services/UpdateUserService";
import VerifyUserPasswordService from "@modules/users/services/VerifyUserPasswordService";
import GetUserService from "@modules/users/services/GetUserService";
import CreateUserTokenService from "@modules/users/services/CreateUserTokenService";
import VerifyUserTokenService from "@modules/users/services/VerifyUserTokenService";
import SendMailService from "@modules/users/services/SendMailService";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, date_birth, permissions } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password,
      date_birth,
      permissions,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, info, roles } = request.body;
    const { id_user } = request.user;
    const newUser = container.resolve(UpdateUserService);

    const user = await newUser.execute(id_user, {
      name,
      email,
      info,
      roles,
    });

    return response.json(classToClass(user));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id_user } = request.user;

    const getUser = container.resolve(GetUserByIdService);
    const user = await getUser.execute(id_user);

    return response.json(classToClass(user));
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const getUser = container.resolve(GetUserService);
    const user = await getUser.execute(email);

    const verifyUserPassword = container.resolve(VerifyUserPasswordService);
    await verifyUserPassword.execute({ email, password });

    const token = user.generateToken();

    return response.json({ user: classToClass(user), token });
  }

  public async createPassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, new_password, token } = request.body;

    const getUser = container.resolve(GetUserService);
    const user = await getUser.execute(email);

    const verifyToken = container.resolve(VerifyUserTokenService);
    await verifyToken.execute(user.id_user, token);

    const createPasswordUser = container.resolve(CreatePasswordUserService);
    const newUser = await createPasswordUser.execute(email, new_password);

    return response.json(classToClass(newUser));
  }

  public async changePassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { password, new_password } = request.body;
    const { id_user } = request.user;

    const getUser = container.resolve(GetUserByIdService);
    const user = await getUser.execute(id_user);

    const verifyUserPassword = container.resolve(VerifyUserPasswordService);
    await verifyUserPassword.execute({ email: user.email, password });

    const updateUser = container.resolve(UpdateUserService);
    const newUser = await updateUser.execute(id_user, {
      password: new_password,
    });

    return response.json(classToClass(newUser));
  }

  public async createToken(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.body;

    const getUser = container.resolve(GetUserService);
    const user = await getUser.execute(email);

    const newUserToken = container.resolve(CreateUserTokenService);
    const userToken = await newUserToken.execute(user.id_user);
    const newTokenPath = resolve(
      "src",
      "modules",
      "users",
      "views",
      "emails",
      "newTokenMail.hbs"
    );
    const variables = {
      name: user.name,
      token: userToken.token,
    };

    await SendMailService.execute(
      email,
      "Criação de Token de confirmaçãa",
      variables,
      newTokenPath
    );

    return response.status(201).json({ message: "Email successfully sent" });
  }
}
