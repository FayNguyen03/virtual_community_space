import LocationsController from "../controllers/locations.js"
import express from "express"

const locationsRouter = express.Router();

locationsRouter.get("/", LocationsController.getAllLocations);

locationsRouter.get("/:id", LocationsController.getLocationById);
export default locationsRouter;
