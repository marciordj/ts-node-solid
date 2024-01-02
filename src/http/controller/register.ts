import { registerUseCase } from '@/use-cases/register';
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
		await registerUseCase({
			name,
			email,
			password
		});

		return reply.status(201).send();
	} catch(err) {
		return reply.status(409).send();
	}
}