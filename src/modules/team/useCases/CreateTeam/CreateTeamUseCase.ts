import { Team } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ITeamsRepository } from '@modules/team/repositories/ITeamsRepository';
import { ICreateTeamDTO } from '@modules/team/repositories/TeamsDTO';

@injectable()
export class CreateTeamUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({
    name,
    description,
    createdBy,
    sportId,
  }: ICreateTeamDTO): Promise<Team> {
    const teamAlreadyExists = await this.teamsRepository.findByName(name);

    if (teamAlreadyExists) {
      throw new AppError('Team already exists');
    }

    const category = this.teamsRepository.create({
      name,
      description,
      createdBy,
      sportId,
    });

    return category;
  }
}
