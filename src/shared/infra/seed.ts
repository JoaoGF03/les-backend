/* eslint-disable no-restricted-syntax */
import { Request, Response } from 'express';

import { prisma } from './prisma';
import { eventsData, sportsData, teamsData, usersData } from './seedData';

export const seed = async (_request: Request, response: Response) => {
  await prisma.sport.deleteMany();
  await prisma.sport.createMany({
    data: sportsData.map(sport => ({
      name: sport,
    })),
  });

  const unDupedUsers = usersData.filter(
    (user, index, self) =>
      index === self.findIndex(u => u.email === user.email),
  );

  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: unDupedUsers.map(user => ({
      name: user.name,
      email: user.email,
      password: user.password,
    })),
  });

  const users = await prisma.user.findMany();

  await prisma.team.deleteMany();
  let userIterator = 0;
  let sportIterator = 0;
  for await (const team of teamsData) {
    // eslint-disable-next-line no-loop-func
    // get 4 users to add to team
    const teamData = users.slice(userIterator, userIterator + 4);

    const userData = teamData.map(user => ({
      email: user.email,
    }));

    userData.push({ email: users[userIterator].email });

    await prisma.team.create({
      data: {
        name: team.name,
        description: team.description,
        createdBy: users[userIterator].id,
        Sport: {
          connect: {
            name: sportsData[sportIterator],
          },
        },
        users: {
          connect: userData.filter(Boolean),
        },
      },
    });

    userIterator += 1;
    sportIterator += 1;

    if (sportIterator === sportsData.length) {
      sportIterator = 0;
    }
  }

  const teams = await prisma.team.findMany({
    include: {
      Sport: true,
    },
  });

  await prisma.event.deleteMany();
  let eventIterator = 0;
  const teamIterator = {
    Futebol: 0,
    Basquete: 0,
    Vôlei: 0,
    eSports: 0,
  };
  for await (const event of eventsData) {
    const teamsToConnect = teams.filter(
      team => team.Sport.name === event.sport,
    );

    await prisma.event.create({
      data: {
        createdBy: users[eventIterator].id,
        name: event.name,
        description: event.description,
        location: 'Event location',
        day: event.day,
        time: event.time,
        teamsLimit: 2,
        Sport: {
          connect: {
            name: event.sport,
          },
        },
        teams: {
          connect: [
            {
              id: teamsToConnect[teamIterator[event.sport]].id,
            },
            {
              id: teamsToConnect[teamIterator[event.sport] + 1].id,
            },
          ],
        },
      },
    });

    eventIterator += 1;
    teamIterator[event.sport] += 1;
  }

  return response.json({ message: 'ok' });
};
