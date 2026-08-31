import { z } from 'zod'
import { taskStatusSchema } from './task-status.js'

export const taskResponseSchema = z.object({
    id: z.uuid(),
    title: z.string(),
    description: z.string().nullable(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
    userId: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type TaskResponse = z.infer<typeof taskResponseSchema>
