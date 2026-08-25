import { FastifyInstance } from 'fastify'
import { registerRoute } from './auth/register.js'
import { loginRoute } from './auth/login.js'
import { createTaskRoute } from './task/create-task.js'

export async function routes(app: FastifyInstance) {
    //AUTH
    await app.register(registerRoute, { prefix: '/register' })
    await app.register(loginRoute, { prefix: '/login' })
    //TASKS
    await app.register(createTaskRoute, {prefix: '/tasks'})
}
