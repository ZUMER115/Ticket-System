const { Queue } = require('bullmq')

const connection = {
    host: process.env.REDIS_HOST || 'redis',
    port: 6379
}

const ticketQueue = new Queue('ticketQueue', { connection })

module.exports = { ticketQueue, connection }

