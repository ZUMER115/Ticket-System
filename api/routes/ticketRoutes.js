const express = require('express')
const router = express.Router()

const { getTickets, addReservation, addEvent } = require('../controller/ticketController.js')

// Route to view all reservations on specific event
router.get("/get/:id", getTickets)

// Route to reserve a ticket
router.post("/reserve", addReservation)
router.post("/event", addEvent)

module.exports = router



