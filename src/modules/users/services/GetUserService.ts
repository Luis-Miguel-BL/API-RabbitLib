import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";

@injectable()
class GetUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(email: string): Promise<User> {
    const user = await this.usersRepository.find({ email });

    if (!user) {
      throw new AppError("User does not exist or has been deleted", 404);
    }

    return user;
  }
}

export default GetUserService;
