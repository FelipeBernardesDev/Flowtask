import { z } from 'zod'

export const taskStatusSchema = z.object({
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
})

export type TaskStatusInput = z.infer<typeof taskStatusSchema>
