import { injectable, inject } from "tsyringe";
import INationalityRepository from "@modules/author/repositories/INationalityRepository";
import Nationality from "@modules/author/infra/typeorm/entities/Nationality";
import AppError from "@shared/errors/AppError";

@injectable()
class GetNationalityService {
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

    return nationality;
  }
}

export default GetNationalityService;
