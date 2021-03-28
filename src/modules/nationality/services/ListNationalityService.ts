import { injectable, inject } from "tsyringe";
import INationalityRepository from "@modules/nationality/repositories/INationalityRepository";
import Nationality from "@modules/nationality/infra/typeorm/entities/Nationality";
import IFindNationalityDTO from "@modules/nationality/dtos/IFindNationalityDTO";
import IPaginationDTO from "../dtos/IPaginationDTO";

@injectable()
class ListNationalityService {
  constructor(
    @inject("NationalityRepository")
    private nationalityRepository: INationalityRepository
  ) {}

  public async execute(
    data: IFindNationalityDTO,
    pagination: IPaginationDTO
  ): Promise<[Nationality[], number]> {
    const nationalities = await this.nationalityRepository.find(
      data,
      pagination
    );

    return nationalities;
  }
}

export default ListNationalityService;
