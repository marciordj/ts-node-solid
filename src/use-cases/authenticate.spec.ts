import { expect, describe, it } from 'vitest';
import { InmemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { Authenticate } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';


//Unit tests
describe('Authenticate use case', () => {
	it('Shoude be able to authenticate', async () => {
		const usersRepository = new InmemoryUserRepository();
		const sut = new Authenticate(usersRepository); //SUT Test Pattern

		await usersRepository.create({
			name: 'Marcio Rodrigues',
			email: 'marcio@email.com',
			password_hash: await hash('321321', 6)
		});

		const { user } = await sut.execute({
			email: 'marcio@email.com',
			password: '321321'
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should not be able to authenticate with wrong email', async () => {
		const usersRepository = new InmemoryUserRepository();
		const sut = new Authenticate(usersRepository);

		await usersRepository.create({
			name: 'Marcio Rodrigues',
			email: 'marcio@email.com',
			password_hash: await hash('321321', 6)
		});

		expect(() =>
			sut.execute({
				email: 'marcio@email.com',
				password: '32132132132131'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('Should not be able to authenticate with wrong email', async () => {
		const usersRepository = new InmemoryUserRepository();
		const sut = new Authenticate(usersRepository);

		expect(() =>
			sut.execute({
				email: 'marcio@email.com',
				password: '321321'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});