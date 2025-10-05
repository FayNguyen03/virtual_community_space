import EventsController from "../controllers/events.js"
import express from "express"

const eventsRouter = express.Router();

eventsRouter.get("/", EventsController.getAllEvents);

eventsRouter.get('/:id', EventsController.getEventById);

export default eventsRouter;
