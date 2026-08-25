import { z } from 'zod'

export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Title is required!')
        .max(255, 'Title must have a maximum of 255 characters.'),

    description: z
        .string()
        .trim()
        .max(2000, 'Description must have a maximum of 2000 characters.')
        .optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
