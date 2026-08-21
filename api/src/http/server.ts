import { app } from './app.js'
import { env } from '@/env/index.js'

async function start() {
    try {
        await app.listen({
            port: env.PORT,
            host: env.HOST,
        })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()
