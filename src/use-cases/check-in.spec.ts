import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check in use case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository();
		sut = new CheckInUseCase(checkInsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('Should be able check in', async () => {
		const { checkIn } = await sut.execute({
			userId: '321',
			gymId: '321'
		});

		expect(checkIn.id).toEqual(expect.any(String));
		expect(checkIn.gym_id).toEqual('321');
	});

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
		await sut.execute({
			gymId: '321',
			userId: '321'
		});

		await expect(() => sut.execute({
			gymId: '321',
			userId: '321'
		})).rejects.toBeInstanceOf(Error);

	});
});