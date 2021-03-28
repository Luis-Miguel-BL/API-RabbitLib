import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import INationalityRepository from "@modules/author/repositories/INationalityRepository";
import Nationality from "@modules/author/infra/typeorm/entities/Nationality";
import IUpdateNationalityDTO from "../dtos/IUpdateNationalityDTO";

@injectable()
class DeleteNationalityService {
  constructor(
    @inject("NationalityRepository")
    private nationalityRepository: INationalityRepository
  ) {}

  public async execute(id_nationality: string): Promise<Nationality> {
    const nationality = await this.nationalityRepository.findOne({
      id_nationality,
    });
    if (!nationality) {
      throw new AppError("This nationality not found.", 404);
    }

    await this.nationalityRepository.delete(id_nationality);

    return nationality;
  }
}

export default DeleteNationalityService;
