import { TaskIdParams } from '@/http/schemas/task/task-params.js'
import { TaskStatusInput } from '@/http/schemas/task/task-status.js'
import { updateTaskStatusService } from '@/services/tasks/update-task-status.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function updateTaskStatusController(
    request: FastifyRequest<{ Body: TaskStatusInput; Params: TaskIdParams }>,
    reply: FastifyReply,
) {
    const id = request.params.id

    const userId = request.user.sub

    const data = request.body

    const task = await updateTaskStatusService(id, userId, data)

    return reply.status(200).send(task)
}
