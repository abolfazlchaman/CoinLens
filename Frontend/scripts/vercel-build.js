const fs = require('fs');
const path = require('path');

// Create .vercel/output directory if it doesn't exist
const outputDir = path.join(__dirname, '../.vercel/output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create static directory inside output
const staticDir = path.join(outputDir, 'static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Copy sitemap.xml to .vercel/output/static/
const sitemapSource = path.join(__dirname, '../build/sitemap.xml');
const sitemapDest = path.join(staticDir, 'sitemap.xml');
fs.copyFileSync(sitemapSource, sitemapDest);

// Create config.json with content type override
const config = {
  overrides: {
    'static/sitemap.xml': {
      contentType: 'application/xml',
    },
  },
};

fs.writeFileSync(path.join(outputDir, 'config.json'), JSON.stringify(config, null, 2));

console.log('Vercel build output configuration completed successfully!');
