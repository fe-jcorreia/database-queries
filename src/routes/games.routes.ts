import { Router } from "express";

import { CreateGameController } from "../modules/games/useCases/createGame/CreateGameController";

const gamesRoutes = Router();
const createGameController = new CreateGameController();

gamesRoutes.post("/", createGameController.handle);

export { gamesRoutes };
