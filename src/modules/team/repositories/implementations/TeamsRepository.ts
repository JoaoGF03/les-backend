import { Team } from '@prisma/client';

import { prisma } from '@shared/infra/prisma';

import { IAddUserToTeamDTO } from '../../useCases/AddUserToTeam/AddUserToTeamUseCase';
import { ITeamsRepository } from '../ITeamsRepository';
import { ICreateTeamDTO, IUpdateTeamDTO } from '../TeamsDTO';

export class TeamsRepository implements ITeamsRepository {
  private ormRepository = prisma.team;

  public async create({
    name,
    description,
    createdBy,
    sportId,
  }: ICreateTeamDTO): Promise<Team> {
    const team = await this.ormRepository.create({
      data: {
        name,
        description,
        createdBy,
        sportId,
      },
    });

    return team;
  }

  public async findAll(): Promise<Team[]> {
    const categories = await this.ormRepository.findMany({
      include: {
        users: true,
        events: true,
        Sport: true,
      },
    });

    return categories;
  }

  public async findByName(name: string): Promise<Team | undefined> {
    const team = await this.ormRepository.findFirst({
      where: {
        name,
      },
    });

    return team;
  }

  public async findById(id: string): Promise<Team | undefined> {
    const team = await this.ormRepository.findUnique({
      where: {
        id,
      },
    });

    return team;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      where: {
        id,
      },
    });
  }

  public async addUser({ userId, teamId }: IAddUserToTeamDTO): Promise<Team> {
    const team = await this.ormRepository.update({
      where: {
        id: teamId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
      },
    });

    return team;
  }

  public async findMyTeams(userId: string): Promise<Team[]> {
    const teams = await this.ormRepository.findMany({
      where: {
        createdBy: userId,
      },
      include: {
        users: true,
        invitations: true,
        Sport: true,
      },
    });

    return teams;
  }

  public async findTeamsImIn(userId: string): Promise<Team[]> {
    const teams = await this.ormRepository.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
        invitations: true,
        Sport: true,
      },
    });

    return teams;
  }

  public async update({
    id,
    name,
    description,
    sportId,
  }: IUpdateTeamDTO): Promise<Team> {
    const team = await this.ormRepository.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        sportId,
      },
    });

    return team;
  }
}
