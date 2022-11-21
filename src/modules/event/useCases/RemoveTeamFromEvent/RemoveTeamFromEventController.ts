import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveTeamFromEventUseCase } from './RemoveTeamFromEventUseCase';

export class RemoveTeamFromEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { teamId, eventId } = request.query;

    const removeTeamFromUseCase = container.resolve(RemoveTeamFromEventUseCase);

    const category = await removeTeamFromUseCase.execute({
      teamId: String(teamId),
      eventId: String(eventId),
    });

    return response.status(201).json(category);
  }
}
