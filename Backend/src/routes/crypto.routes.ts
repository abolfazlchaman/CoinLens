import express from 'express';
import { CoinGeckoService } from '../services/coingecko.service';
import { fallbackService } from '../services/fallback.service';

const router = express.Router();
const coinGeckoService = CoinGeckoService.getInstance();

// Middleware to log all requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Get market data
router.get('/market-data', async (req, res, next) => {
  try {
    console.log('Fetching market data...');
    const data = await coinGeckoService.getMarketData();
    console.log('Market data fetched successfully:', { count: data.length });
    res.json(data);
  } catch (error) {
    console.error('Error fetching market data:', error);
    next(error);
  }
});

// Get global data
router.get('/global-data', async (req, res, next) => {
  try {
    console.log('Fetching global data...');
    const data = await coinGeckoService.getGlobalData();
    // Flatten the data property
    if (data && data.data) {
      res.json({
        ...data.data,
        active_cryptocurrencies: 10000, // You can fetch or mock these as needed
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
    console.error('Error fetching global data:', error);
    next(error);
  }
});

// Get trending coins
router.get('/trending-coins', async (req, res, next) => {
  try {
    console.log('Fetching trending coins...');
    const data = await coinGeckoService.getTrendingCoins();
    // Flatten the item property
    if (Array.isArray(data)) {
      res.json(data.map((entry) => entry.item));
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    next(error);
  }
});

// Get specific coin price
router.get('/coin-price/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`Fetching price for coin: ${id}`);
    const data = await coinGeckoService.getCoinPrice(id);
    console.log(`Price fetched successfully for ${id}:`, data);
    res.json({ price: data });
  } catch (error) {
    console.error(`Error fetching price for ${req.params.id}:`, error);
    next(error);
  }
});

// Get exchanges
router.get('/exchanges', async (req, res, next) => {
  try {
    console.log('Fetching exchanges...');
    const data = await coinGeckoService.getExchanges();
    console.log('Exchanges fetched successfully:', { count: data.length });
    res.json(data);
  } catch (error) {
    console.error('Error fetching exchanges:', error);
    next(error);
  }
});

// Get news
router.get('/news', async (req, res, next) => {
  try {
    console.log('Fetching crypto news...');
    const data = await coinGeckoService.getNews();
    console.log('News fetched successfully:', { count: data.length });
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    next(error);
  }
});

// Get market sentiment
router.get('/market-sentiment', async (req, res, next) => {
  try {
    console.log('Fetching market sentiment...');
    const data = await coinGeckoService.getMarketSentiment();
    console.log('Market sentiment fetched successfully');
    res.json(data);
  } catch (error) {
    console.error('Error fetching market sentiment:', error);
    next(error);
  }
});

// Error handling middleware
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('API Error:', {
    path: req.path,
    method: req.method,
    error: err.message,
    stack: err.stack,
    status: err.status || 500
  });
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500,
    timestamp: new Date().toISOString()
  });
});

export default router; 