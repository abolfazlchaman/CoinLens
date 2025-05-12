# CoinLens Backend

A Node.js/Express backend service for the CoinLens application that handles CoinGecko API integration with Redis caching.

## Features

- CoinGecko API integration with rate limiting
- Redis caching for improved performance
- Error handling and logging
- TypeScript support
- API endpoints for cryptocurrency data

## Prerequisites

- Node.js 18+
- Redis server
- CoinGecko API key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# CoinGecko API
COINGECKO_API_KEY=your_api_key_here
COINGECKO_API_URL=https://api.coingecko.com/api/v3

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=50

# Cache Configuration
CACHE_TTL_MARKET_DATA=300
CACHE_TTL_COIN_LIST=3600
CACHE_TTL_GLOBAL_DATA=300
CACHE_TTL_TRENDING=300
CACHE_TTL_EXCHANGES=3600
```

## Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start Redis server:
   ```bash
   # Using Docker
   docker run --name redis -p 6379:6379 -d redis
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

## API Endpoints

### Market Data
- `GET /api/crypto/market-data`
  - Returns market data for top cryptocurrencies
  - Cached for 5 minutes

### Global Data
- `GET /api/crypto/global`
  - Returns global cryptocurrency market data
  - Cached for 5 minutes

### Trending Coins
- `GET /api/crypto/trending`
  - Returns trending coins
  - Cached for 5 minutes

### Coin Price
- `GET /api/crypto/price/:coinId`
  - Returns price for a specific coin
  - Cached for 5 minutes

## Deployment

### Local Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
pnpm start
```

### Docker Deployment
```bash
docker build -t crypto-man-backend .
docker run -p 3001:3001 crypto-man-backend
```

## Error Handling

The API uses a centralized error handling system with the following error types:
- 400: Bad Request
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Caching Strategy

- Market data: 5 minutes
- Global data: 5 minutes
- Trending coins: 5 minutes
- Coin prices: 5 minutes
- Coin list: 1 hour
- Exchange data: 1 hour

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 