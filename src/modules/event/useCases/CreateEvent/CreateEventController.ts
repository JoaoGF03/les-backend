import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEventUseCase } from './CreateEventUseCase';

export class CreateEventController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, date, teamsLimit, locationId, sportId } =
      request.body;

    const createEventUseCase = container.resolve(CreateEventUseCase);

    const event = await createEventUseCase.execute({
      name,
      description,
      date,
      teamsLimit,
      locationId,
      sportId,
    });

    return response.status(201).json(event);
  }
}