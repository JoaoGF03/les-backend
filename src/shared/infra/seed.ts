/* eslint-disable no-restricted-syntax */
import { Request, Response } from 'express';

import { prisma } from './prisma';

const sportsData = ['Futebol', 'Basquete', 'Vôlei', 'eSports'];

const usersData = [
  {
    name: 'John Doe 1',
    email: 'email1@email.com',
    password: '123456',
  },
  {
    name: 'John Doe 2',
    email: 'email2@email.com',
    password: '123456',
  },
  {
    name: 'John Doe 3',
    email: 'email3@email.com',
    password: '123456',
  },
  {
    name: 'John Doe 4',
    email: 'email4@email.com',
    password: '123456',
  },
  {
    name: 'John Doe 5',
    email: 'email5@email.com',
    password: '123456',
  },
  {
    name: 'John Doe 6',
    email: 'email6@email.com',
    password: '123456',
  },
  {
    name: 'John Doe 7',
    email: 'email7@email.com',
    password: '123456',
  },
  {
    name: 'John Doe 8',
    email: 'email8@email.com',
    password: '123456',
  },
];

const teamsData = [
  {
    name: 'Team 1',
    description: 'Team 1 description',
  },
  {
    name: 'Team 2',
    description: 'Team 2 description',
  },
];

export const seed = async (_request: Request, response: Response) => {
  // Create sports
  await prisma.sport.deleteMany();
  await prisma.sport.createMany({
    data: sportsData.map(sport => ({
      name: sport,
    })),
  });

  // Create users
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: usersData.map(user => ({
      name: user.name,
      email: user.email,
      password: user.password,
    })),
  });

  const users = await prisma.user.findMany();

  // Create teams
  await prisma.team.deleteMany();
  // Team 0
  await prisma.team.create({
    data: {
      name: teamsData[0].name,
      description: teamsData[0].description,
      createdBy: users[0].id,
      Sport: {
        connect: {
          name: sportsData[0],
        },
      },
      users: {
        connect: [
          {
            email: users[0].email,
          },
          {
            email: users[1].email,
          },
          {
            email: users[2].email,
          },
          {
            email: users[3].email,
          },
        ],
      },
    },
  });

  // Team 1
  await prisma.team.create({
    data: {
      name: teamsData[1].name,
      description: teamsData[1].description,
      createdBy: users[4].id,
      Sport: {
        connect: {
          name: sportsData[0],
        },
      },
      users: {
        connect: [
          {
            email: users[4].email,
          },
          {
            email: users[5].email,
          },
          {
            email: users[6].email,
          },
          {
            email: users[7].email,
          },
        ],
      },
    },
  });

  const teams = await prisma.team.findMany();

  // Create event
  await prisma.event.deleteMany();
  await prisma.event.create({
    data: {
      name: 'Event 1',
      description: 'Event 1 description',
      day: '2021-08-01',
      time: '10:00',
      teamsLimit: 2,
      Sport: {
        connect: {
          name: sportsData[0],
        },
      },
      createdBy: users[0].id,
      teams: {
        connect: [
          {
            name: teams[0].name,
          },
          {
            name: teams[1].name,
          },
        ],
      },
    },
  });

  return response.json({ message: 'ok' });
};
