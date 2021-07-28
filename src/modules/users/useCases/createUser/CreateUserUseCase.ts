import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    first_name,
    last_name,
    email,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.createUser({ first_name, last_name, email });
  }
}

export { CreateUserUseCase };
