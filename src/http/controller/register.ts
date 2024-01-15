import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistError } from '@/use-cases/errors/user-already-exist';
import { RegisterUseCase } from '@/use-cases/register';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registes(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string(),
		password: z.string().min(6)
	});

	const { name, email, password } = registerBodySchema.parse(request.body);

	try {
		const userRepository = new PrismaUsersRepository();
		const registerUseCase = new RegisterUseCase(userRepository);

		await registerUseCase.execute({
			name,
			email,
			password
		});

		return reply.status(201).send();
	} catch(err) {
		if (err instanceof UserAlreadyExistError) {
			return reply.status(409).send();
		}

		return reply.status(200).send();
	}
}