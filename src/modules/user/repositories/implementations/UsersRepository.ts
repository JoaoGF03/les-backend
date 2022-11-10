import { User } from '@prisma/client';

import { prisma } from '@shared/infra/prisma';

import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO, IUpdateAvatarDTO, Invitation } from '../UsersDTO';

export class UsersRepository implements IUsersRepository {
  private ormRepository = prisma.user;

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({
      data: {
        email,
        name,
        password,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findFirst({
      where: {
        name,
      },
    });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.findMany();

    return users;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async pathAvatar({
    id,
    avatarFileName,
  }: IUpdateAvatarDTO): Promise<User> {
    const user = await this.ormRepository.update({
      where: {
        id,
      },
      data: {
        avatar: avatarFileName,
      },
    });

    return user;
  }

  public async handleInvitation(
    userId: string,
    teamId: string,
    invitation: Invitation,
  ): Promise<void> {
    if (invitation === 'send') {
      await this.ormRepository.update({
        where: {
          id: userId,
        },
        data: {
          invitations: {
            connect: {
              id: teamId,
            },
          },
        },
      });
    } else if (invitation === 'accepted') {
      await this.ormRepository.update({
        where: {
          id: userId,
        },
        data: {
          teams: {
            connect: {
              id: teamId,
            },
          },
          invitations: {
            disconnect: {
              id: teamId,
            },
          },
        },
      });
    } else if (invitation === 'rejected') {
      await this.ormRepository.update({
        where: {
          id: userId,
        },
        data: {
          invitations: {
            disconnect: {
              id: teamId,
            },
          },
        },
      });
    }
  }

  public async update(data: User): Promise<User> {
    const user = await this.ormRepository.update({
      where: {
        id: data.id,
      },
      data,
    });

    return user;
  }
}
