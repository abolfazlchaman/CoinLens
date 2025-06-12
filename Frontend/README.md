# CoinLens

A modern cryptocurrency tracking application built with React, TypeScript, and Tailwind CSS.

## Features

- Real-time cryptocurrency price tracking using CoinGecko API
- Dark/Light mode with system theme detection
- Responsive design with mobile-first approach
- Search functionality for cryptocurrencies
- Language switching (placeholder for future i18n implementation)
- Stock market heatmap (coming soon)

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Axios for API requests
- Heroicons for icons

## Getting Started

### Prerequisites

- Node.js 16+
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abolfazlchaman/coinlens
   cd coinlens
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
  ├── components/     # React components
  ├── hooks/         # Custom React hooks
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  └── styles/        # Global styles and Tailwind config
```

## Features to be Implemented

- [ ] i18n support for multiple languages
- [ ] Stock market heatmap visualization
- [ ] Detailed cryptocurrency information pages
- [ ] Price alerts and notifications
- [ ] Portfolio tracking
- [ ] Historical price charts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Heroicons](https://heroicons.com/) for icons
