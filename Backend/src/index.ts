import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { setupRedis } from './config/redis';
import cryptoRoutes from './routes/crypto.routes';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 50,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Routes
app.use('/api', cryptoRoutes);

// Error handling
app.use(errorHandler);

// Initialize Redis
setupRedis()
  .then(() => {
    logger.info('Redis connection established');
  })
  .catch((error) => {
    logger.error('Failed to connect to Redis:', error);
    process.exit(1);
  });

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
}); 