import { TaskStatusInput } from '@/http/schemas/task/task-status.js'
import { prisma } from '@/lib/prisma.js'

export async function updateTaskStatusService(id: string, userId: string, data: TaskStatusInput) {
    const task = await prisma.task.update({
        where: {
            id,
            userId,
        },
        data,
    })

    return task
}
