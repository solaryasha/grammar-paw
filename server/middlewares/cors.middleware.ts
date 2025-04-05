import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

/**
 * Custom CORS middleware that uses the FRONTEND_ORIGIN environment variable
 * Falls back to http://localhost:5173 if FRONTEND_ORIGIN is not set
 */
const corsMiddleware = () => {
  const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
  return cors({
    origin: frontendOrigin,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 204
  });
};

export default corsMiddleware;