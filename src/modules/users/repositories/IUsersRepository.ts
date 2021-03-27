import User from "@modules/users/infra/typeorm/entities/User";
import IUpdateUserDTO from "@modules/users/dtos/IUpdateUserDTO";
import IUserDTO from "@modules/users/dtos/IUserDTO";
import IFindUserDTO from "@modules/users/dtos/IFindUserDTO";

export default interface IUsersRepository {
  find(data: IFindUserDTO): Promise<User | undefined>;
  create(data: IUserDTO): Promise<User>;
  update(User: User, data: IUpdateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
}
