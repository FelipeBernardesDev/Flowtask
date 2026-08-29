import { TaskIdParams } from '@/http/schemas/task/task-params.js'
import { deleteTaskService } from '@/services/tasks/delete-task.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteTaskController(
    request: FastifyRequest<{ Params: TaskIdParams }>,
    reply: FastifyReply,
) {
    const userId = request.user.sub

    const id = request.params.id

    await deleteTaskService(id, userId)

    return reply.status(200).send({
        message: 'Task deleted successfully',
    })
}
