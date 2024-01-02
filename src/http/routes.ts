import { FastifyInstance } from 'fastify';
import { registes } from './controller/register';

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', registes);
}