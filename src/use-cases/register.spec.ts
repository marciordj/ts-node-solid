import { expect, describe, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InmemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistError } from './errors/user-already-exist';


//Unit tests
describe('Register use case', () => {
	it('Should be create an user', async () => {
		const inMemoryUserRepository = new InmemoryUserRepository();
		const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

		const { user } = await registerUseCase.execute({
			name: 'Marcio',
			email: 'marcio@email.com',
			password: '321321'
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should hash user password upen registration', async () => {
		const inMemoryUserRepository = new InmemoryUserRepository();
		const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

		const { user } = await registerUseCase.execute({
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
		const inMemoryUserRepository = new InmemoryUserRepository();
		const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

		const email = 'marcio@email.com';

		await registerUseCase.execute({
			name: 'Marcio',
			email,
			password: '321321'
		});

		expect(() => registerUseCase.execute({
			name: 'Marcio',
			email,
			password: '321321'
		})).rejects.toBeInstanceOf(UserAlreadyExistError);
	});
});