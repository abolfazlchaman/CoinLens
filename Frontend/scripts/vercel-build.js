const fs = require('fs');
const path = require('path');

try {
  console.log('Starting Vercel build script...');

  // Create output directory
  const outputDir = path.join(process.cwd(), '.vercel', 'output');
  const staticDir = path.join(outputDir, 'static');

  console.log('Creating output directories...');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(staticDir, { recursive: true });

  // Copy sitemap.xml to static directory
  const sitemapSource = path.join(process.cwd(), 'public', 'sitemap.xml');
  const sitemapDest = path.join(staticDir, 'sitemap.xml');

  console.log('Checking sitemap source...');
  if (!fs.existsSync(sitemapSource)) {
    throw new Error('sitemap.xml not found in public directory');
  }

  console.log('Copying sitemap.xml...');
  fs.copyFileSync(sitemapSource, sitemapDest);

  // Create config.json with proper headers
  const config = {
    version: 3,
    overrides: {
      'static/sitemap.xml': {
        contentType: 'application/xml',
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600',
          'Content-Encoding': 'identity',
        },
      },
    },
  };

  console.log('Writing config.json...');
  fs.writeFileSync(path.join(outputDir, 'config.json'), JSON.stringify(config, null, 2));

  console.log('Build script completed successfully');
} catch (error) {
  console.error('Error in build script:', error);
  process.exit(1);
}
