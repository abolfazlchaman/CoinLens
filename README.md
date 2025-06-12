# CoinLens

A modern cryptocurrency tracking application with real-time data from CoinGecko API.

## Features

- Real-time cryptocurrency price tracking
- Historical price data visualization
- Market cap and volume information
- Responsive design with dark/light mode
- Redis caching for optimal performance
- Rate limiting protection

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for development)
- pnpm (for development)

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd coinlens
   ```

2. Run the application:
   ```bash
   ./start.sh
   ```

   This will:
   - Check for Docker and Docker Compose
   - Set up environment variables
   - Start the backend and Redis containers
   - Start the frontend development server

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs

## Development

### Frontend Development

```bash
cd Frontend
pnpm install
pnpm dev
```

### Backend Development

```bash
cd Backend
pnpm install
pnpm dev
```

## Environment Variables

The application uses the following environment variables:

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
NODE_ENV=development
COINGECKO_API_KEY=your_api_key_here
REDIS_URL=redis://redis:6379
```

## API Documentation

Once the backend is running, visit http://localhost:3001/api-docs for detailed API documentation.

## Architecture

- Frontend: Next.js 15 with App Router
- Backend: Node.js/Express with TypeScript
- Database: Redis for caching
- API: CoinGecko API for cryptocurrency data

## License

MIT 