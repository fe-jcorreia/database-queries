import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateGameUseCase } from "./CreateGameUseCase";

class CreateGameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;
    const createGameUseCase = container.resolve(CreateGameUseCase);
    await createGameUseCase.execute({ title });
    return response.status(201).send();
  }
}

export { CreateGameController };
