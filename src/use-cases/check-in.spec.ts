import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check in use case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository();
		sut = new CheckInUseCase(checkInsRepository);
	});

	it('Should be able check in', async () => {
		const { checkIn } = await sut.execute({
			userId: '321',
			gymId: '321'
		});

		expect(checkIn.id).toEqual(expect.any(String));
		expect(checkIn.gym_id).toEqual('321');
	});
});