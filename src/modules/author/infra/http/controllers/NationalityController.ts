import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";
import CreateNationalityService from "@modules/author/services/CreateNationalityService";
import ListNationalityService from "@modules/author/services/ListNationalityService";
import GetNationalityService from "@modules/author/services/GetNationalityService";
import UpdateNationalityService from "@modules/author/services/UpdateNationalityService";
import DeleteNationalityService from "@modules/author/services/DeleteNationalityService";

export default class NationalityController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description, flag, code } = request.body;

    const createNationality = container.resolve(CreateNationalityService);
    const nationality = await createNationality.execute({
      description,
      flag,
      code,
    });

    return response.json(classToClass(nationality));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id_nationality } = request.params;

    const getNationality = container.resolve(GetNationalityService);
    const nationality = await getNationality.execute(id_nationality);

    return response.json(classToClass(nationality));
  }
  public async list(request: Request, response: Response): Promise<Response> {
    const { description, flag, code, limit, offset } = request.query;
    const filter = {
      description: description as string,
      flag: flag as string,
      code: +code,
    };
    const getNationality = container.resolve(ListNationalityService);
    const nationality = await getNationality.execute(filter, {
      limit: +limit,
      offset: +offset,
    });

    return response.json(classToClass(nationality));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id_nationality } = request.params;
    const { description, flag, code } = request.body;
    const newNationality = container.resolve(UpdateNationalityService);

    const nationality = await newNationality.execute(id_nationality, {
      description,
      flag,
      code,
    });

    return response.json(classToClass(nationality));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id_nationality } = request.params;
    const deletedNationality = container.resolve(DeleteNationalityService);

    const nationality = await deletedNationality.execute(id_nationality);

    return response.json(classToClass(nationality));
  }
}
