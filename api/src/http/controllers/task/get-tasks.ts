import { getTasksService } from '@/services/tasks/get-tasks.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getTasksController(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub
    const { page, pageSize } = request.query as { page: number; pageSize: number }

    const result = await getTasksService(userId, { page, pageSize })

    return reply.status(200).send(result)
}
