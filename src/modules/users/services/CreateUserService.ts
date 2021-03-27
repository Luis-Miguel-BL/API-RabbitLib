import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import IUserDTO from "@modules/users/dtos/IUserDTO";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(data: IUserDTO): Promise<User> {
    const { email } = data;

    const userAlreadyExists = await this.usersRepository.find({ email });
    if (userAlreadyExists) {
      throw new AppError('This "e-mail" belongs to another user', 409);
    }

    const user = await this.usersRepository.create(data);

    return user;
  }
}

export default CreateUserService;
