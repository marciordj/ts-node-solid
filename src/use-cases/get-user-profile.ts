import { UsersRepository } from '@/repositories/users-repository';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-error-not-foud';

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}
export class GetUserProfile {
	constructor(private readonly userRepository: UsersRepository) {}

	public async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return {
			user
		};
	}
}