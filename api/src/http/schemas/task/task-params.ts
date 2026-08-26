import { z } from 'zod'

export const taskIdParamSchema = z.object({
    id: z.string(),
})

export const getTasksQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
})

export type GetTasksParams = z.infer<typeof getTasksQuerySchema>
