import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import User from "@modules/users/infra/typeorm/entities/User";
import IUserDTO from "@modules/users/dtos/IUserDTO";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async find(data: IUserDTO): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: data });
    return user;
  }

  public async findById(id_user: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id_user);
    return user;
  }

  public async create(data: IUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  public async update(User: User, data: IUserDTO): Promise<User> {
    const user = this.ormRepository.merge(User, data);

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
