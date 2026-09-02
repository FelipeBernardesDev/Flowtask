import { NotFoundError } from '@/errors/index.js'
import { prisma } from '@/lib/prisma.js'

export async function getTaskByIdService(id: string, userId: string) {
    const task = await prisma.task.findFirst({
        where: { id, userId },
    })

    if (!task) {
        throw new NotFoundError('Task not found')
    }

    return task
}
