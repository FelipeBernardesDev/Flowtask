import { UpdateTaskInput } from '@/http/schemas/task/update-task.js'
import { prisma } from '@/lib/prisma.js'

export async function updateTaskService(id: string, userId: string, data: UpdateTaskInput) {
    const task = await prisma.task.update({
        where: {
            id,
            userId,
        },
        data,
    })

    return task
}
