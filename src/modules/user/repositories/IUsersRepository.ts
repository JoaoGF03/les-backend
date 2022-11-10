import { User } from '@prisma/client';

import { ICreateUserDTO, Invitation, IUpdateAvatarDTO } from './UsersDTO';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
  findByName(name: string): Promise<User | undefined>;
  findById(id: string): Promise<User>;
  pathAvatar(data: IUpdateAvatarDTO): Promise<User>;
  handleInvitation(
    userId: string,
    teamId: string,
    invitation: Invitation,
  ): Promise<void>;
  update(data: User): Promise<User>;
}
