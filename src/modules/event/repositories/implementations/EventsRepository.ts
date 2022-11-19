import { Event, Sport, Team } from '@prisma/client';

import { prisma } from '@shared/infra/prisma';

import { IAddTeamToEventDTO } from '@modules/event/useCases/AddTeamToEvent/AddTeamToEventUseCase';

import { ICreateEventDTO, IUpdateEventDTO } from '../EventsDTO';
import { IEventsRepository } from '../IEventsRepository';

export class EventsRepository implements IEventsRepository {
  private ormRepository = prisma.event;

  public async create({
    createdBy,
    day,
    description,
    location,
    name,
    teamsLimit,
    time,
    sportId,
  }: ICreateEventDTO): Promise<Event> {
    const event = await this.ormRepository.create({
      data: {
        createdBy,
        day,
        description,
        location,
        name,
        teamsLimit,
        time,
        sportId,
      },
    });

    return event;
  }

  public async findAll(): Promise<
    (Event & {
      Sport: Sport;
      teams: Team[];
    })[]
  > {
    const events = await this.ormRepository.findMany({
      include: {
        Sport: true,
        teams: {
          include: {
            users: true,
            Sport: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return events;
  }

  public async findByName(name: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findFirst({
      where: {
        name,
      },
    });

    return event;
  }

  public async findById(id: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findUnique({
      where: {
        id,
      },
      include: {
        Sport: true,
        teams: true,
      },
    });

    return event;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      where: {
        id,
      },
    });
  }

  public async addTeam({
    teamId,
    eventId,
  }: IAddTeamToEventDTO): Promise<Event> {
    const event = await this.ormRepository.update({
      where: {
        id: eventId,
      },
      data: {
        teams: {
          connect: {
            id: teamId,
          },
        },
      },
      include: {
        teams: true,
      },
    });

    return event;
  }

  public async findMyEvents(userId: string): Promise<
    (Event & {
      Sport: Sport;
      teams: Team[];
    })[]
  > {
    const events = await this.ormRepository.findMany({
      where: {
        createdBy: userId,
      },
      include: {
        Sport: true,
        teams: true,
      },
    });

    return events;
  }

  public async findEventsImIn(userId: string): Promise<
    (Event & {
      Sport: Sport;
      teams: Team[];
    })[]
  > {
    const events = await this.ormRepository.findMany({
      where: {
        teams: {
          some: {
            users: {
              some: {
                id: userId,
              },
            },
          },
        },
      },
      include: {
        Sport: true,
        teams: {
          include: {
            users: true,
          },
        },
      },
    });

    return events;
  }

  public async update({
    day,
    time,
    description,
    location,
    name,
    teamsLimit,
    sportId,
    id,
  }: IUpdateEventDTO): Promise<Event> {
    const event = await this.ormRepository.update({
      where: {
        id,
      },
      data: {
        day,
        time,
        description,
        location,
        name,
        teamsLimit,
        sportId,
      },
    });

    return event;
  }
}
