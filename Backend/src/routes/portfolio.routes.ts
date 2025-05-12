import express from 'express';
import { CoinGeckoService } from '../services/coingecko.service';
import { PortfolioService } from '../services/portfolio.service';

const router = express.Router();
const coinGeckoService = CoinGeckoService.getInstance();
const portfolioService = PortfolioService.getInstance();

// Middleware to log all requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Get portfolio
router.get('/', async (req, res, next) => {
  try {
    console.log('Fetching portfolio...');
    const marketData = await coinGeckoService.getMarketData();
    const portfolio = await portfolioService.getPortfolio(marketData);
    console.log('Portfolio fetched successfully');
    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    next(error);
  }
});

// Add to portfolio
router.post('/', async (req, res, next) => {
  try {
    console.log('Adding to portfolio...');
    const item = await portfolioService.addToPortfolio(req.body);
    console.log('Item added to portfolio successfully');
    res.status(201).json(item);
  } catch (error) {
    console.error('Error adding to portfolio:', error);
    next(error);
  }
});

// Remove from portfolio
router.delete('/:id', async (req, res, next) => {
  try {
    console.log(`Removing item ${req.params.id} from portfolio...`);
    await portfolioService.removeFromPortfolio(req.params.id);
    console.log('Item removed from portfolio successfully');
    res.status(204).send();
  } catch (error) {
    console.error('Error removing from portfolio:', error);
    next(error);
  }
});

// Update portfolio item
router.patch('/:id', async (req, res, next) => {
  try {
    console.log(`Updating portfolio item ${req.params.id}...`);
    const updatedItem = await portfolioService.updatePortfolioItem(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    console.log('Portfolio item updated successfully');
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
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