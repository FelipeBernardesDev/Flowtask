import { FastifyInstance } from 'fastify'
import { registerRoute } from './auth/register.js'
import { loginRoute } from './auth/login.js'

export async function routes(app: FastifyInstance) {
    //AUTH
    await app.register(registerRoute, { prefix: '/register' })
    await app.register(loginRoute, { prefix: '/login' })
}
