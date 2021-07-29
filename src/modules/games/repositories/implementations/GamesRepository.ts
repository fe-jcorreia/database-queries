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
    const games = await this.repository
      .createQueryBuilder("games")
      .where("title ILIKE :title", { title: `%${param}%` })
      .getMany();
    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const gamesCount = await this.repository.query(
      `SELECT COUNT(*) FROM games`
    );
    return gamesCount;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const user = await this.repository
      .createQueryBuilder()
      .relation("users")
      .of(id)
      .loadMany();
    return user;
  }
}
