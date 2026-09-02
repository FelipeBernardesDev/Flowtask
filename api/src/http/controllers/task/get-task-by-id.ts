import { TaskIdParams } from '@/http/schemas/task/task-params.js'
import { getTaskByIdService } from '@/services/tasks/get-task-by-id.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getTaskByIdController(
    request: FastifyRequest<{ Params: TaskIdParams }>,
    reply: FastifyReply,
) {
    const id = request.params.id

    const userId = request.user.sub

    const task = await getTaskByIdService(id, userId)

    return reply.status(200).send(task)
}
