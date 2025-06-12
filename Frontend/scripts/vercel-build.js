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

  // Read sitemap.xml
  const sitemapSource = path.join(process.cwd(), 'public', 'sitemap.xml');
  console.log('Reading sitemap source...');
  if (!fs.existsSync(sitemapSource)) {
    throw new Error('sitemap.xml not found in public directory');
  }

  // Copy original sitemap.xml
  console.log('Copying sitemap.xml...');
  fs.copyFileSync(sitemapSource, path.join(staticDir, 'sitemap.xml'));

  // Generate compressed version using zlib
  console.log('Generating compressed sitemap...');
  const sitemapContent = fs.readFileSync(sitemapSource);
  const gzippedContent = zlib.gzipSync(sitemapContent);
  fs.writeFileSync(path.join(staticDir, 'sitemap.xml.gz'), gzippedContent);

  // Get file sizes for Content-Length headers
  const xmlSize = fs.statSync(path.join(staticDir, 'sitemap.xml')).size;
  const gzipSize = gzippedContent.length;

  // Create config.json with proper headers
  const config = {
    version: 3,
    overrides: {
      'static/sitemap.xml': {
        contentType: 'application/xml',
        headers: {
          'Content-Type': 'application/xml',
          'Content-Length': xmlSize.toString(),
          'Cache-Control': 'public, max-age=86400',
        },
      },
      'static/sitemap.xml.gz': {
        contentType: 'application/xml',
        headers: {
          'Content-Type': 'application/xml',
          'Content-Encoding': 'gzip',
          'Content-Length': gzipSize.toString(),
          'Cache-Control': 'public, max-age=86400',
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
