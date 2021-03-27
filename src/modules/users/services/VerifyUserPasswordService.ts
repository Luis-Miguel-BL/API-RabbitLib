import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}
@injectable()
class VerifyUserPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<void> {
    const user = await this.usersRepository.find({ email });
    if (!user) {
      throw new AppError("User not found", 401);
    }
    if (!user.password) {
      throw new AppError("Password not registered", 303);
    }

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      throw new AppError("Wrong password", 401);
    }
  }
}

export default VerifyUserPasswordService;
