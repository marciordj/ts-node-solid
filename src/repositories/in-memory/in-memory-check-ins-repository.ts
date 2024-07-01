import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';

export class InMemoryCheckInsRepository implements CheckInsRepository {
	public items: CheckIn[] = [];

	async findById(id: string) {
		const user = this.items.find((item) => item.id === id)

		if (!user) {
			return null
		}

		return user;
	}

	async findByEmail(email: string) {
		const user = this.items.find(item => item.email === email);
		if (!user) {
			return null;
		}
		return user;
	}

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = {
      id: '32131',
      crea
			userId: data.user_id,
      gymId: data.gym_id
		};

		this.items.push(checkIn);

		return checkIn;
	}

}