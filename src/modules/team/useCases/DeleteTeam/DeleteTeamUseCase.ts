import { inject, injectable } from 'tsyringe';

import { ITeamsRepository } from '@modules/team/repositories/ITeamsRepository';

@injectable()
export class DeleteTeamUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}
  public async execute(id: string): Promise<void> {
    const team = await this.teamsRepository.findById(id);

    if (!team) {
      throw new Error('Team not found');
    }

    await this.teamsRepository.delete(id);
  }
}
