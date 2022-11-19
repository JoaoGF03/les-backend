import { Router } from 'express';

import { AddTeamToEventController } from '../useCases/AddTeamToEvent/AddTeamToEventController';
import { CreateEventController } from '../useCases/CreateEvent/CreateEventController';
import { DeleteEventController } from '../useCases/DeleteEvent/DeleteEventController';
import { FindAllEventsController } from '../useCases/FindAllEvents/FindAllEventsController';
import { FindEventsImInController } from '../useCases/FindEventsImIn/FindEventsImInController';
import { FindMyEventsController } from '../useCases/FindMyEvents/FindMyEventsController';
import { UpdateEventController } from '../useCases/UpdateEvent/UpdateEventController';

export const eventsRouter = Router();

const createEventController = new CreateEventController();
const addTeamToEventController = new AddTeamToEventController();
const findAllEventsController = new FindAllEventsController();
const findMyEventsController = new FindMyEventsController();
const findEventsImInController = new FindEventsImInController();
const updateEventController = new UpdateEventController();
const deleteEventController = new DeleteEventController();

eventsRouter.post('/', createEventController.handle);
eventsRouter.post('/addTeam', addTeamToEventController.handle);
eventsRouter.get('/', findAllEventsController.handle);
eventsRouter.get('/myEvents/:id', findMyEventsController.handle);
eventsRouter.get('/eventsImIn/:id', findEventsImInController.handle);

eventsRouter.put('/:id', updateEventController.handle);

eventsRouter.delete('/:id', deleteEventController.handle);
