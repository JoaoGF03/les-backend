import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindEventsImInUseCase } from './FindEventsImInUseCase';

export class FindEventsImInController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findEventsImInUseCase = container.resolve(FindEventsImInUseCase);

    const events = await findEventsImInUseCase.execute(id);

    return response.json(events);
  }
}
