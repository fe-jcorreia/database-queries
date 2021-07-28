import { inject, injectable } from "tsyringe";

import { ICreateGameDTO } from "../../dtos";
import { IGamesRepository } from "../../repositories/IGamesRepository";

@injectable()
class CreateGameUseCase {
  constructor(
    @inject("GamesRepository")
    private gamesRepository: IGamesRepository
  ) {}

  async execute({ title }: ICreateGameDTO): Promise<void> {
    await this.gamesRepository.createGame({ title });
  }
}

export { CreateGameUseCase };
