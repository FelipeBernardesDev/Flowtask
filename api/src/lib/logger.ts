import { env } from '@/env/index.js'
import { pino } from 'pino'

const logger = pino({
    level: env.LOG_LEVEL,
    transport:
        env.NODE_ENV === 'development'
            ? {
                  target: 'pino-pretty',
                  options: {
                      colorize: true,
                      translateTime: 'SYS:standar',
                      ignore: 'pid,hostname',
                  },
              }
            : undefined,
    base: {
        service: 'flowtask-api',
    },
})

export { logger }
