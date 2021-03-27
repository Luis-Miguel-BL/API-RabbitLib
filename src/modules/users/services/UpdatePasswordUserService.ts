import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import IUserDTO from "@modules/users/dtos/IUserDTO";

@injectable()
class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(id: string, data: IUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const updateUser = await this.usersRepository.update(user, data);

    return updateUser;
  }
}

export default UpdateUserService;
