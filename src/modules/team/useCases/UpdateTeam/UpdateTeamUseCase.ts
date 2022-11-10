import { Team } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ITeamsRepository } from '@modules/team/repositories/ITeamsRepository';
import { IUpdateTeamDTO } from '@modules/team/repositories/TeamsDTO';

@injectable()
export class UpdateTeamUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    sportId,
  }: IUpdateTeamDTO): Promise<Team> {
    const team = await this.teamsRepository.findById(id);

    if (!team) throw new AppError('Team not found');

    if (name) {
      const teamAlreadyExists = await this.teamsRepository.findByName(name);

      if (teamAlreadyExists && teamAlreadyExists.id !== team.id)
        throw new AppError('Team name already in use');
    }

    team.name = name || team.name;
    team.description = description || team.description;
    team.sportId = sportId || team.sportId;

    const category = this.teamsRepository.update(team);

    return category;
  }
}
