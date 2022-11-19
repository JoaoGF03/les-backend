import { Event } from '@prisma/client';

import { IAddTeamToEventDTO } from '../useCases/AddTeamToEvent/AddTeamToEventUseCase';
import { ICreateEventDTO, IUpdateEventDTO } from './EventsDTO';

export interface IEventsRepository {
  create(data: ICreateEventDTO): Promise<Event>;
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | undefined>;
  findByName(name: string): Promise<Event | undefined>;
  delete(id: string): Promise<void>;
  addTeam({ teamId, eventId }: IAddTeamToEventDTO): Promise<Event>;
  findMyEvents(userId: string): Promise<Event[]>;
  findEventsImIn(userId: string): Promise<Event[]>;
  update(data: IUpdateEventDTO): Promise<Event>;
}
