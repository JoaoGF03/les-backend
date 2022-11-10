import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateTeamUseCase } from './UpdateTeamUseCase';

export class UpdateTeamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, sportId } = request.body;

    const updateTeamUseCase = container.resolve(UpdateTeamUseCase);

    const category = await updateTeamUseCase.execute({
      id,
      name,
      description,
      sportId,
    });

    return response.status(201).json(category);
  }
}
