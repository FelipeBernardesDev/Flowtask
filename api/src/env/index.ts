import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    HOST: z.string().default('localhost'),
    DATABASE_URL: z.url(),
    CORS_ORIGIN: z.url(),
    LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error(z.treeifyError(_env.error), 'Invalid environment variables!')
    throw new Error('Invalid environment variables!')
}

const env = _env.data

export { env }
