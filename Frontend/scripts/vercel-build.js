const fs = require('fs');
const path = require('path');

// Create .vercel/output/static directory
const outputDir = path.join(__dirname, '../.vercel/output/static');
fs.mkdirSync(outputDir, { recursive: true });

// Copy sitemap.xml to .vercel/output/static/
const sitemapSource = path.join(__dirname, '../build/sitemap.xml');
const sitemapDest = path.join(outputDir, 'sitemap.xml');
fs.copyFileSync(sitemapSource, sitemapDest);

// Create config.json in .vercel/output/
const config = {
  overrides: {
    'static/sitemap.xml': {
      contentType: 'application/xml',
    },
  },
};

fs.writeFileSync(
  path.join(__dirname, '../.vercel/output/config.json'),
  JSON.stringify(config, null, 2),
);
