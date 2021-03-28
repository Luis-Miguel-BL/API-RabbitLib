import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";

import INationalityRepository from "@modules/nationality/repositories/INationalityRepository";

import Nationality from "@modules/nationality/infra/typeorm/entities/Nationality";
import ICreateNationalityDTO from "@modules/nationality/dtos/ICreateNationalityDTO";
import IFindNationalityDTO from "@modules/nationality/dtos/IFindNationalityDTO";
import IPaginationDTO from "@modules/nationality/dtos/IPaginationDTO";
import IUpdateNationalityDTO from "@modules/nationality/dtos/IUpdateNationalityDTO";

class NationalityRepository implements INationalityRepository {
  private ormRepository: Repository<Nationality>;

  constructor() {
    this.ormRepository = getRepository(Nationality);
  }

  public async create(data: ICreateNationalityDTO): Promise<Nationality> {
    const nationality = this.ormRepository.create(data);
    await this.ormRepository.save(nationality);
    return nationality;
  }

  public async findOne(
    data: IFindNationalityDTO
  ): Promise<Nationality | undefined> {
    const nationality = await this.ormRepository.findOne({ where: data });
    return nationality;
  }

  public async find(
    data: IFindNationalityDTO,
    pagination: IPaginationDTO
  ): Promise<[Nationality[], number]> {
    const { limit, offset } = pagination;
    const { id_nationality, description, flag, code } = data;
    const query = this.ormRepository.createQueryBuilder("nationality");
    if (id_nationality) {
      query.andWhere("id_nationality = :id_nationality", {
        id_nationality: id_nationality,
      });
    }
    if (description) {
      query.andWhere("description ILIKE :description", {
        description: `%${description}%`,
      });
    }
    if (flag) {
      query.andWhere("flag ILIKE :flag", { flag: `%${flag}%` });
    }
    if (code) {
      query.andWhere("code = :code", { code: code });
    }

    if (limit) {
      query.limit(limit);
    }
    if (offset) {
      query.offset(offset);
    }
    const nationality = await query.getManyAndCount();
    return nationality;
  }

  public async update(
    oldNationality: Nationality,
    data: IUpdateNationalityDTO
  ): Promise<Nationality> {
    const nationality = this.ormRepository.merge(oldNationality, data);

    await this.ormRepository.save(nationality);

    return nationality;
  }

  public async delete(
    id_nationality: string
  ): Promise<Nationality | undefined> {
    const nationality = await this.ormRepository.findOne(id_nationality);
    this.ormRepository.softDelete(nationality);

    return nationality;
  }
}

export default NationalityRepository;
