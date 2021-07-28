import { getRepository, Repository } from "typeorm";

import {
  IFindUserWithGamesDTO,
  IFindUserByFullNameDTO,
  ICreateUserDTO,
} from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async createUser({
    first_name,
    last_name,
    email,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ first_name, last_name, email });
    await this.repository.save(user);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {}

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(); // Complete usando raw query
  }
}
