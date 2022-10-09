import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteEventUseCase } from './DeleteEventUseCase';

export class DeleteEventController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEventUseCase = container.resolve(DeleteEventUseCase);

    const events = await deleteEventUseCase.execute(id);

    return response.json(events);
  }
}
