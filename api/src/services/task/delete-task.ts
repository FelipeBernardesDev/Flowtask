import { NotFoundError } from '@/errors/index.js'
import { prisma } from '@/lib/prisma.js'

export async function deleteTaskService(id: string, userId: string) {
    const task = await prisma.task.deleteMany({
        where: {
            id,
            userId,
        },
    })

    if (task.count === 0) {
        throw new NotFoundError('Task not found')
    }
}
