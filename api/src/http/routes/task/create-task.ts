import { createTaskController } from '@/http/controllers/task/create-task.js'
import { authenticate } from '@/http/hooks/authenticate.js'
import { createTaskSchema } from '@/http/schemas/task/create-task.js'
import { taskResponseSchema } from '@/http/schemas/task/task-response.js'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function createTaskRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '',
        {
            onRequest: [authenticate],
            schema: {
                tags: ['Tasks'],
                summary: 'Create a new task',
                description: 'Creates a new task for the authenticated user.',
                body: createTaskSchema,
                response: {
                    201: taskResponseSchema,
                    400: z.object({
                        code: z.string(),
                        message: z.string(),
                        error: z.array(z.any()),
                    }),
                    500: z.object({
                        code: z.string(),
                        message: z.string(),
                    }),
                },
            },
        },
        createTaskController,
    )
}
