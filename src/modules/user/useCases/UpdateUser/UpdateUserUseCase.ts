import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import { IUpdateUserDTO } from '@modules/user/repositories/UsersDTO';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    email,
    name,
    password,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User not found', 404);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists && userAlreadyExists.id !== user.id)
      throw new AppError('User already exists');

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    const updatedUser = await this.usersRepository.update(user);

    return updatedUser;
  }
}
