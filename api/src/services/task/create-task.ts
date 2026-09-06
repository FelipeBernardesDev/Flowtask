import { CreateTaskInput } from '@/http/schemas/task/create-task.js'
import { prisma } from '@/lib/prisma.js'

export async function createTaskService(data: CreateTaskInput, userId: string) {
    const task = await prisma.task.create({
        data: {
            ...data,
            userId,
        },
    })

    return task
}
