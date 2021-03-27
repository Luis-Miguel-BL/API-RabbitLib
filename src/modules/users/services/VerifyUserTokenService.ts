import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";

@injectable()
class VerifyUserTokenService {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository
  ) {}

  public async execute(user_id: string, token: string): Promise<boolean> {
    const newUserToken = await this.userTokenRepository.get(user_id, token);
    if (!newUserToken) {
      throw new AppError("Invalid token", 401);
    }
    return newUserToken ? true : false;
  }
}

export default VerifyUserTokenService;
