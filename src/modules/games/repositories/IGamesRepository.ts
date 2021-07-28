import { User } from "../../users/entities/User";
import { ICreateGameDTO } from "../dtos";
import { Game } from "../entities/Game";

export interface IGamesRepository {
  createGame({ title }: ICreateGameDTO): Promise<void>;
  findByTitleContaining(title: string): Promise<Game[]>;
  countAllGames(): Promise<[{ count: string }]>;
  findUsersByGameId(id: string): Promise<User[]>;
}
