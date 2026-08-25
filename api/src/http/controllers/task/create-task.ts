import { CreateTaskInput } from '@/http/schemas/task/create-task.js'
import { createTaskService } from '@/services/tasks/create-task.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function createTaskController(
    request: FastifyRequest<{ Body: CreateTaskInput }>,
    reply: FastifyReply,
) {
    const data = request.body

    const userId = request.user.sub

    const task = await createTaskService(data, userId)

    return reply.status(201).send(task)
}
