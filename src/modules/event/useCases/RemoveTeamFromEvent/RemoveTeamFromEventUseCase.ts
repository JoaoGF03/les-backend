import { Team } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IEventsRepository } from '@modules/event/repositories/IEventsRepository';
import { ITeamsRepository } from '@modules/team/repositories/ITeamsRepository';

export interface IRemoveTeamFromEventDTO {
  teamId: string;
  eventId: string;
}

@injectable()
export class RemoveTeamFromEventUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ teamId, eventId }: IRemoveTeamFromEventDTO): Promise<void> {
    const eventsExistes = await this.eventsRepository.findById(eventId);

    if (!eventsExistes) throw new AppError('Event not found');

    const teamExists = await this.teamsRepository.findById(teamId);

    if (!teamExists) throw new AppError('Team not found');

    await this.eventsRepository.removeTeam({ teamId, eventId });
  }
}
