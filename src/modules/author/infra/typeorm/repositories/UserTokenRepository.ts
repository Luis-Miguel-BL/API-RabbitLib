import { getRepository, Repository } from "typeorm";

import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";

import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async get(id_user: string, token: string): Promise<UserToken> {
    const query = `
    SELECT 
      ut.id_user_token,
      ut.id_user,
      ut.token,
      ut.created_at
    FROM user_token ut
    WHERE ut.id_user = $1 AND ut.token = $2 AND now() - INTERVAL '1 day' <  ut.created_at LIMIT 1`;
    const tokenUser = await this.ormRepository.query(query, [id_user, token]);
    return tokenUser[0];
  }

  public async create(id_user: string): Promise<UserToken> {
    const user = this.ormRepository.create({ id_user });
    const userToken = await this.ormRepository.save(user);

    return userToken;
  }
}

export default UserTokenRepository;
