import { Router } from 'express';

import { AddUserToTeamController } from '../useCases/AddUserToTeam/AddUserToTeamController';
import { CreateTeamController } from '../useCases/CreateTeam/CreateTeamController';
import { DeleteTeamController } from '../useCases/DeleteTeam/DeleteTeamController';
import { FindAllTeamsController } from '../useCases/FindAllTeams/FindAllTeamsController';
import { FindMyTeamsController } from '../useCases/FindMyTeams/FindMyTeamsController';
import { FindTeamsImInController } from '../useCases/FindTeamsImIn/FindTeamsImInController';
import { UpdateTeamController } from '../useCases/UpdateTeam/UpdateTeamController';

export const teamsRouter = Router();

const createTeamController = new CreateTeamController();
const addUserToTeamController = new AddUserToTeamController();
const findAllTeamsController = new FindAllTeamsController();
const findMyTeamsController = new FindMyTeamsController();
const findTeamsImInController = new FindTeamsImInController();
const updateTeamController = new UpdateTeamController();
const deleteTeamController = new DeleteTeamController();

teamsRouter.post('/', createTeamController.handle);
teamsRouter.post('/addUser', addUserToTeamController.handle);

teamsRouter.get('/', findAllTeamsController.handle);
teamsRouter.get('/findMyTeams/:userId', findMyTeamsController.handle);
teamsRouter.get('/findTeamsImIn/:userId', findTeamsImInController.handle);

teamsRouter.put('/:id', updateTeamController.handle);
teamsRouter.delete('/:id', deleteTeamController.handle);
