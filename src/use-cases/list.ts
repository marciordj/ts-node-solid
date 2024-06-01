import { UsersRepository } from "@/repositories/users-repository";

export class ListUseCase {
	constructor(private userRepository: UsersRepository) { }

	async execute() {
		return await this.userRepository.list()
	}
}
