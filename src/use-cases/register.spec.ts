import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistError } from './errors/user-already-exist';

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;
//Unit tests
describe('Register use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUserRepository();
		sut = new RegisterUseCase(usersRepository);
	});

	it('Should be create an user', async () => {


		const { user } = await sut.execute({
			name: 'Marcio',
			email: 'marcio@email.com',
			password: '321321'
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should hash user password upen registration', async () => {
		const { user } = await sut.execute({
			name: 'Marcio',
			email: 'marcio@email.com',
			password: '321321'
		});

		const isPasswordCorrectlyHashed = await compare(
			'321321',
			user.password_hash
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('Should not be able to register with same email', async () => {
		const email = 'marcio@email.com';

		await sut.execute({
			name: 'Marcio',
			email,
			password: '321321'
		});

		await expect(() => sut.execute({
			name: 'Marcio',
			email,
			password: '321321'
		})).rejects.toBeInstanceOf(UserAlreadyExistError);
	});
});