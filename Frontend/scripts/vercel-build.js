const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

try {
  console.log('Starting Vercel build script...');

  // Create output directory
  const outputDir = path.join(process.cwd(), '.vercel', 'output');
  const staticDir = path.join(outputDir, 'static');

  console.log('Creating output directories...');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(staticDir, { recursive: true });

  // Read and process sitemap.xml
  const sitemapSource = path.join(process.cwd(), 'public', 'sitemap.xml');
  console.log('Reading sitemap source...');
  if (!fs.existsSync(sitemapSource)) {
    throw new Error('sitemap.xml not found in public directory');
  }

  const sitemapContent = fs.readFileSync(sitemapSource, 'utf8');

  // Write uncompressed version
  console.log('Writing uncompressed sitemap.xml...');
  fs.writeFileSync(path.join(staticDir, 'sitemap.xml'), sitemapContent);

  // Create gzipped version
  console.log('Creating gzipped version...');
  const gzippedContent = zlib.gzipSync(sitemapContent);
  fs.writeFileSync(path.join(staticDir, 'sitemap.xml.gz'), gzippedContent);

  // Create config.json with proper headers for both versions
  const config = {
    version: 3,
    overrides: {
      'static/sitemap.xml': {
        contentType: 'application/xml',
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600',
          'Content-Length': Buffer.byteLength(sitemapContent).toString(),
        },
      },
      'static/sitemap.xml.gz': {
        contentType: 'application/gzip',
        headers: {
          'Content-Type': 'application/gzip',
          'Content-Encoding': 'gzip',
          'Cache-Control': 'public, max-age=3600',
          'Content-Length': gzippedContent.length.toString(),
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
