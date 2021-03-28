import Nationality from "@modules/author/infra/typeorm/entities/Nationality";
import ICreateNationalityDTO from "../dtos/ICreateNationalityDTO";
import IFindNationalityDTO from "../dtos/IFindNationalityDTO";
import IPaginationDTO from "../dtos/IPaginationDTO";
import IUpdateNationalityDTO from "../dtos/IUpdateNationalityDTO";

export default interface INationalityRepository {
  create(data: ICreateNationalityDTO): Promise<Nationality>;
  findOne(data: IFindNationalityDTO): Promise<Nationality | undefined>;
  find(
    data: IFindNationalityDTO,
    pagination: IPaginationDTO
  ): Promise<[Nationality[], number]>;
  update(
    oldNationality: Nationality,
    data: IUpdateNationalityDTO
  ): Promise<Nationality>;
  delete(id_nationality: string): Promise<Nationality>;
}
