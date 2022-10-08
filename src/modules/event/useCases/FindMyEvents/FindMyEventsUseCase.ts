import { Event } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IEventsRepository } from '@modules/event/repositories/IEventsRepository';
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';

@injectable()
export class FindMyEventsUseCase {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute(id: string): Promise<Event[]> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const events = await this.eventsRepository.findMyEvents(id);

    try {
      const futureEvents = events.filter(event => {
        const eventDate = new Date(event.day);
        const currentDate = new Date();

        return eventDate > currentDate;
      });

      return futureEvents;
    } catch (error) {
      return events;
    }
  }
}
