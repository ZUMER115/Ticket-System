const { requestCounter, requestDuration } = require('../metrics');

const metricsMiddleware = (req, res, next) => {
    // Start the timer by recording the current time
    const start = process.hrtime.bigint();

    // Increment the request counter for each incoming request
    requestCounter.inc();

    res.on('finish', () => {
        // Stop the timer by subtracting current time (after request) from start time defined earlier
        const duration = Number(process.hrtime.bigint() - start) / 1e9;

        // Store the observed duration in the request duration histogram
        requestDuration.observe(duration);
    });
    next();
}

module.exports = metricsMiddleware;

