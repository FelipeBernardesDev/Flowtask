import { FastifyInstance } from 'fastify'
import { registerRoute } from './auth/register.js'

export async function routes(app: FastifyInstance) {
    //AUTH
    await app.register(registerRoute, { prefix: '/register' })
}
