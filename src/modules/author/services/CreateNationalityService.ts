import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";
import INationalityRepository from "@modules/author/repositories/INationalityRepository";
import Nationality from "@modules/author/infra/typeorm/entities/Nationality";
import ICreateNationalityDTO from "@modules/author/dtos/ICreateNationalityDTO";

@injectable()
class CreateNationalityService {
  constructor(
    @inject("NationalityRepository")
    private nationalityRepository: INationalityRepository
  ) {}

  public async execute(data: ICreateNationalityDTO): Promise<Nationality> {
    const { description } = data;

    const nationalityAlreadyExists = await this.nationalityRepository.findOne({
      description,
    });
    if (nationalityAlreadyExists) {
      throw new AppError("This nationality already exists.", 409);
    }

    const nationality = await this.nationalityRepository.create(data);

    return nationality;
  }
}

export default CreateNationalityService;
