import { Router } from 'express';

import { AddUserToTeamController } from '../useCases/AddUserToTeam/AddUserToTeamController';
import { CreateTeamController } from '../useCases/CreateTeam/CreateTeamController';
import { FindAllTeamsController } from '../useCases/FindAllTeams/FindAllTeamsController';
import { FindTeamByNameController } from '../useCases/FindTeamByName/FindTeamByNameController';

export const teamsRouter = Router();

const createTeamController = new CreateTeamController();
const addUserToTeamController = new AddUserToTeamController();
const findAllTeamsController = new FindAllTeamsController();
const findTeamByNameController = new FindTeamByNameController();

teamsRouter.post('/', createTeamController.handle);
teamsRouter.post('/addUser', addUserToTeamController.handle);

teamsRouter.get('/', findAllTeamsController.handle);
teamsRouter.get('/', findTeamByNameController.handle);
