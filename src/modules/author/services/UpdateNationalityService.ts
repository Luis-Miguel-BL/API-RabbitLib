import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import INationalityRepository from "@modules/author/repositories/INationalityRepository";
import Nationality from "@modules/author/infra/typeorm/entities/Nationality";
import IUpdateNationalityDTO from "../dtos/IUpdateNationalityDTO";

@injectable()
class UpdateNationalityService {
  constructor(
    @inject("NationalityRepository")
    private nationalityRepository: INationalityRepository
  ) {}

  public async execute(
    id_nationality: string,
    data: IUpdateNationalityDTO
  ): Promise<Nationality> {
    const oldNationality = await this.nationalityRepository.findOne({
      id_nationality,
    });
    if (!oldNationality) {
      throw new AppError("This nationality not found.", 404);
    }

    const nationality = await this.nationalityRepository.update(
      oldNationality,
      data
    );

    return nationality;
  }
}

export default UpdateNationalityService;
