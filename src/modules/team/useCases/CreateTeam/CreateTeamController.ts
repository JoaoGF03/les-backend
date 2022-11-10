import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTeamUseCase } from './CreateTeamUseCase';

export class CreateTeamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, createdBy, sportId } = request.body;

    const createTeamUseCase = container.resolve(CreateTeamUseCase);

    const category = await createTeamUseCase.execute({
      name,
      description,
      createdBy,
      sportId,
    });

    return response.status(201).json(category);
  }
}
