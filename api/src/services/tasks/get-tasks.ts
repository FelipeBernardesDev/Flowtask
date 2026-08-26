import { GetTasksParams } from '@/http/schemas/task/task-params.js'
import { prisma } from '@/lib/prisma.js'

export async function getTasksService(userId: string, { page, pageSize }: GetTasksParams) {
    const skip = (page - 1) * pageSize

    const [tasks, total] = await Promise.all([
        prisma.task.findMany({
            where: { userId },
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        }),

        prisma.task.count({ where: { userId } }),
    ])

    const totalPages = Math.ceil(total / pageSize)

    return {
        tasks,
        meta: { page, pageSize, total, totalPages },
    }
}
