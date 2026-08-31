import { createTaskSchema } from './create-task.js'
import { z } from 'zod'

export const updateTaskSchema = createTaskSchema.partial()

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
