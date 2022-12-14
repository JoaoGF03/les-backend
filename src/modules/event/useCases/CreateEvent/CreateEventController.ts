import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEventUseCase } from './CreateEventUseCase';

export class CreateEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      day,
      time,
      teamsLimit,
      location,
      sportId,
      createdBy,
    } = request.body;

    const createEventUseCase = container.resolve(CreateEventUseCase);

    const event = await createEventUseCase.execute({
      name,
      description,
      day,
      time,
      teamsLimit,
      location,
      sportId,
      createdBy,
    });

    return response.status(201).json(event);
  }
}
