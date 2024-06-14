import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';

interface AuthenticateUseCaseRequest {
	email: string,
	password: string
}

interface AuthenticateUseCaseResponse {
	user: User
}
export class Authenticate {
	constructor(private readonly userRepository: UsersRepository) {}

	public async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMaches = await compare(password, user.password_hash);

		if (!doesPasswordMaches) {
			throw new InvalidCredentialsError();
		}

		return {
			user
		};
	}
}