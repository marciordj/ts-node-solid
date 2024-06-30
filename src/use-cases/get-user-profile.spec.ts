import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfile } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-error-not-foud';

let usersRepository: InMemoryUserRepository;
let sut: GetUserProfile;
//Unit tests
describe('Get user profile use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUserRepository();
		sut = new GetUserProfile(usersRepository);
	});

	it('Should be able to get user profile', async () => {
		const createdUser = await usersRepository.create({
			name: 'Marcio Rodrigues',
			email: 'marcio@email.com',
			password_hash: await hash('321321', 6)
		});

		const { user } = await sut.execute({
			userId: createdUser.id
		});

		expect(user.id).toEqual(expect.any(String));
		expect(user.name).toEqual('Marcio Rodrigues');
	});

  it('Should not be able to get user profile with wrong id', async () => {
		expect(() =>
      sut.execute({
        userId: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
	});
});