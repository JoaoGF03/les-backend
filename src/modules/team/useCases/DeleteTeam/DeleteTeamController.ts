import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteTeamUseCase } from './DeleteTeamUseCase';

export class DeleteTeamController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTeamUseCase = container.resolve(DeleteTeamUseCase);

    const events = await deleteTeamUseCase.execute(id);

    return response.json(events);
  }
}
