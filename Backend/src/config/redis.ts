import Redis from 'ioredis';
import { logger } from '../utils/logger';

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  retryStrategy: (times: number) => {
    if (times <= MAX_RETRIES) {
      logger.info(`Redis connection attempt ${times}/${MAX_RETRIES}`);
      return RETRY_DELAY;
    }
    logger.error('Redis connection failed after max retries');
    return null;
  },
  maxRetriesPerRequest: 3,
});

redisClient.on('error', (error) => {
  logger.error('Redis client error:', error);
});

redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('ready', () => {
  logger.info('Redis client ready');
});

export { redisClient };

export const setupRedis = async (): Promise<void> => {
  try {
    await redisClient.ping();
    logger.info('Redis connection established');
  } catch (error) {
    logger.error('Redis connection error:', error);
    throw error;
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error(`Error getting cache for key ${key}:`, error);
    return null;
  }
};

export const setCache = async <T>(
  key: string,
  value: T,
  ttlSeconds: number
): Promise<void> => {
  try {
    await redisClient.setex(key, ttlSeconds, JSON.stringify(value));
  } catch (error) {
    logger.error(`Error setting cache for key ${key}:`, error);
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    logger.error(`Error deleting cache for key ${key}:`, error);
  }
};

export const clearCache = async (): Promise<void> => {
  try {
    await redisClient.flushall();
  } catch (error) {
    logger.error('Error clearing cache:', error);
  }
}; 