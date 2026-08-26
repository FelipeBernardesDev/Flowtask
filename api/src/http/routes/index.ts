import { FastifyInstance } from 'fastify'
import { registerRoute } from './auth/register.js'
import { loginRoute } from './auth/login.js'
import { createTaskRoute } from './task/create-task.js'
import { getTasksRoute } from './task/get-task.js'
import { logoutRoute } from './auth/logout.js'

export async function routes(app: FastifyInstance) {
    //AUTH
    await app.register(registerRoute, { prefix: '/register' })
    await app.register(loginRoute, { prefix: '/login' })
    await app.register(logoutRoute, { prefix: '/logout' })
    //TASKS
    await app.register(createTaskRoute, { prefix: '/tasks' })
    await app.register(getTasksRoute, { prefix: '/tasks' })
}
