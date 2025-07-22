// middlewares/middlewares.js
import cors from 'cors';

export const corsMiddleware = cors({
  origin: '*', // Adjust for your frontend URL or whitelist
});

export function requestLogger(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Not Found' });
}

export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
}
