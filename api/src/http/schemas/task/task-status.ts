import { z } from 'zod'

export const taskStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
