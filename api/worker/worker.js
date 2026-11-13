const { Worker, UnrecoverableError } = require('bullmq')
const pool = require('../db/db.js')
const { connection } = require('../queue/queue.js')

const worker = new Worker('ticketQueue', async (job) => {
    const { event } = job.data
    try {
        if (!event) {
            throw new Error("Missing event Data")
        }

        const result = await pool.query('UPDATE events SET seats = seats - 1 WHERE name = $1 AND seats > 0 RETURNING *', [event])
        if (result.rowCount === 0) {
            throw new Error("Event not found or sold out")
        }
        return result.rows[0]
    } catch (error) {
        throw error
    }
},
    { connection }
)



worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message)
})

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`)
})
