import morgan from 'morgan';

// Custom logger middleware using morgan
// Format: Method URL Status ResponseTime ms
export const logger = morgan('dev');

// Manual logger for more control if needed (as requested in guide Day 4)
export const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
};
