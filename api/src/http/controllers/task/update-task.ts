import { TaskIdParams } from '@/http/schemas/task/task-params.js'
import { UpdateTaskInput } from '@/http/schemas/task/update-task.js'
import { updateTaskService } from '@/services/tasks/update-task.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function updateTaskController(
    request: FastifyRequest<{ Body: UpdateTaskInput; Params: TaskIdParams }>,
    reply: FastifyReply,
) {
    const id = request.params.id

    const userId = request.user.sub

    const data = request.body

    const task = await updateTaskService(id, userId, data)

    return reply.status(200).send(task)
}
