import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";

@injectable()
class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.find({ email });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (user.password) {
      throw new AppError("Password already registered", 409);
    }

    const updateUser = await this.usersRepository.update(user, { password });

    return updateUser;
  }
}

export default UpdateUserService;
