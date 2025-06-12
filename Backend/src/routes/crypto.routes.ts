import express from 'express';
import { CoinGeckoService } from '../services/coingecko.service';
import { fallbackService } from '../services/fallback.service';
import { logger } from '../utils/logger';

const router = express.Router();
const coinGeckoService = CoinGeckoService.getInstance();

// Middleware to log all requests
router.use((req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check route for keeping the API alive
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling middleware
const handleError = (error: any, res: express.Response) => {
  logger.error('API Error:', error);
  // Always try to use fallback data
  return true;
};

// Get market data
router.get('/market-data', async (req, res) => {
  try {
    logger.info('Fetching market data...');
    const data = await coinGeckoService.getMarketData();
    logger.info('Market data fetched successfully:', { count: data.length });
    res.json(data);
  } catch (error) {
    try {
      logger.warn('Using fallback market data');
      const fallbackData = await fallbackService.getMarketData();
      res.json(fallbackData);
    } catch (fallbackError) {
      logger.error('Fallback data error:', fallbackError);
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Unable to fetch market data',
        timestamp: new Date().toISOString()
      });
    }
  }
});

// Get global data
router.get('/global-data', async (req, res) => {
  try {
    logger.info('Fetching global data...');
    const data = await coinGeckoService.getGlobalData();
    // Flatten the data property
    if (data && data.data) {
      res.json({
        ...data.data,
        active_cryptocurrencies: 10000,
        upcoming_icos: 50,
        ongoing_icos: 100,
        ended_icos: 500,
        markets: 500,
        updated_at: Date.now(),
      });
    } else {
      res.json(data);
    }
  } catch (error) {
    try {
      logger.warn('Using fallback global data');
      const fallbackData = await fallbackService.getGlobalData();
      res.json(fallbackData);
    } catch (fallbackError) {
      logger.error('Fallback data error:', fallbackError);
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Unable to fetch global data',
        timestamp: new Date().toISOString()
      });
    }
  }
});

// Get trending coins
router.get('/trending-coins', async (req, res) => {
  try {
    logger.info('Fetching trending coins...');
    const data = await coinGeckoService.getTrendingCoins();
    logger.info('Trending coins fetched successfully:', { count: data.length });
    res.json(data);
  } catch (error) {
    try {
      logger.warn('Using fallback trending coins data');
      const fallbackData = await fallbackService.getTrendingCoins();
      res.json(fallbackData);
    } catch (fallbackError) {
      logger.error('Fallback data error:', fallbackError);
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Unable to fetch trending coins',
        timestamp: new Date().toISOString()
      });
    }
  }
});

// Get coin price
router.get('/price/:id', async (req, res) => {
  try {
    const coinId = req.params.id;
    logger.info(`Fetching price for coin: ${coinId}`);
    const data = await coinGeckoService.getCoinPrice(coinId);
    logger.info(`Price fetched successfully for ${coinId}:`, data);
    res.json({ price: data });
  } catch (error) {
    try {
      logger.warn(`Using fallback price data for ${req.params.id}`);
      const fallbackData = await fallbackService.getCoinPrice(req.params.id);
      res.json({ price: fallbackData });
    } catch (fallbackError) {
      logger.error('Fallback data error:', fallbackError);
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Unable to fetch coin price',
        timestamp: new Date().toISOString()
      });
    }
  }
});

// Get exchanges
router.get('/exchanges', async (req, res) => {
  try {
    logger.info('Fetching exchanges...');
    const data = await coinGeckoService.getExchanges();
    logger.info('Exchanges fetched successfully:', { count: data.length });
    res.json(data);
  } catch (error) {
    try {
      logger.warn('Using fallback exchanges data');
      const fallbackData = await fallbackService.getExchanges();
      res.json(fallbackData);
    } catch (fallbackError) {
      logger.error('Fallback data error:', fallbackError);
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Unable to fetch exchanges',
        timestamp: new Date().toISOString()
      });
    }
  }
});

// Get news
router.get('/news', async (req, res) => {
  try {
    logger.info('Fetching crypto news...');
    const data = await coinGeckoService.getNews();
    logger.info('News fetched successfully:', { count: data.length });
    res.json(data);
  } catch (error) {
    try {
      logger.warn('Using fallback news data');
      const fallbackData = await fallbackService.getNews();
      res.json(fallbackData);
    } catch (fallbackError) {
      logger.error('Fallback data error:', fallbackError);
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Unable to fetch news',
        timestamp: new Date().toISOString()
      });
    }
  }
});

// Get market sentiment
router.get('/market-sentiment', async (req, res) => {
  try {
    logger.info('Fetching market sentiment...');
    const data = await coinGeckoService.getMarketSentiment();
    logger.info('Market sentiment fetched successfully');
    res.json(data);
  } catch (error) {
    try {
      logger.warn('Using fallback market sentiment data');
      const fallbackData = await fallbackService.getMarketSentiment();
      res.json(fallbackData);
    } catch (fallbackError) {
      logger.error('Fallback data error:', fallbackError);
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Unable to fetch market sentiment',
        timestamp: new Date().toISOString()
      });
    }
  }
});

export default router; 