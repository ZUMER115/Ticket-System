const client = require('prom-client')

const register = new client.Registry()

const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    registers: [register]

})

const requestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    registers: [register]
})

module.exports = {
    register,
    requestCounter,
    requestDuration
}