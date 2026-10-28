const { Worker, UnrecoverableError } = require('bullmq')
const pool = require('../db/db.js')
const { connection } = require('../queue/queue.js')

const worker = new Worker('ticketQueue', async (job) => {
    const { event } = job.data
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const seat = await client.query('UPDATE events SET seats = seats - 1 WHERE id = $1 AND seats > 0', [event])
        if (seat.rowCount === 0)
            throw new UnrecoverableError('Event not found or sold out')
        const ticket = await client.query('INSERT INTO tickets (event_id) VALUES ($1) RETURNING *', [event])
        await client.query('COMMIT')
        return ticket.rows[0]
    } catch (error) {
        await client.query('ROLLBACK')
        throw error
    } finally {
        client.release()
    }
}, { connection })

worker.on('failed', (job, err) => 
    console.error(`Job ${job?.id} failed:`, err.message)
)
