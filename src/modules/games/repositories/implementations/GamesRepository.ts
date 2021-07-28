import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { ICreateGameDTO } from "../../dtos";
import { Game } from "../../entities/Game";
import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async createGame({ title }: ICreateGameDTO): Promise<void> {
    const game = this.repository.create({ title });
    await this.repository.save(game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository.createQueryBuilder();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository.createQueryBuilder();
    // Complete usando query builder
  }
}
