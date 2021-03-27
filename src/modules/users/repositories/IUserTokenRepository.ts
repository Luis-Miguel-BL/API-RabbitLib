import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

export default interface IUserTokenRepository {
  get(token: string, id_user: string): Promise<UserToken | undefined>;
  create(id_user: string): Promise<UserToken>;
}
