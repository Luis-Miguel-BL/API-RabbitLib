import { injectable, inject } from "tsyringe";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

@injectable()
class CreateUserTokenService {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository
  ) {}

  public async execute(user_id: string): Promise<UserToken> {
    const newUserToken = await this.userTokenRepository.create(user_id);

    return newUserToken;
  }
}

export default CreateUserTokenService;
