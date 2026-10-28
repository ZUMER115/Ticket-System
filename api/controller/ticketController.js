const pool = require('../db/db.js')
const { ticketQueue } = require('../queue/queue.js')

const getTickets = async (req, res) => {
    const { id } = req.params
    try {
        const response = await pool.query('SELECT name, seats FROM events WHERE (id = $1)', [id])
        if (response.rowCount == 0)
            return res.status(404).json({ message: "No data found"})
        return res.status(200).json({message: "Returning reservations", data: response.rows})
    
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", errorMessage: error.message})
    }
}

const addReservation = async (req, res) => {
    const { event, user} = req.body
    try {
        const job = await ticketQueue.add('reserve', { event, user })
        return res.status(202).json({message: "Reservation queued", jobId: job.id})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", errorMessage: error.message})
    }
}

const addEvent = async (req, res) => {
    const {name, date, seats } = req.body
    try {
        const response = await pool.query('INSERT INTO events ( name, date, seats) VALUES ($1, $2, $3) RETURNING *', [name, date, seats])
        return res.status(201).json({message: "Event added", data: response.rows})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", errorMessage: error.message})
    }
}

module.exports = {
    getTickets,
    addReservation,
    addEvent
}