export interface ICreateTeamDTO {
  name: string;
  description: string;
  createdBy: string;
  sportId: string;
}

export interface IUpdateTeamDTO {
  id: string;
  name?: string;
  description?: string;
  sportId?: string;
}
