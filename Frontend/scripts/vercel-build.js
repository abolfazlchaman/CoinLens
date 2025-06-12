const fs = require('fs');
const path = require('path');

try {
  console.log('Starting Vercel build output configuration...');

  // Create .vercel/output directory if it doesn't exist
  const outputDir = path.join(__dirname, '../.vercel/output');
  console.log('Creating output directory:', outputDir);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create static directory inside output
  const staticDir = path.join(outputDir, 'static');
  console.log('Creating static directory:', staticDir);
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true });
  }

  // Copy sitemap.xml to .vercel/output/static/
  const sitemapSource = path.join(__dirname, '../build/sitemap.xml');
  const sitemapDest = path.join(staticDir, 'sitemap.xml');

  console.log('Checking if sitemap source exists:', sitemapSource);
  if (!fs.existsSync(sitemapSource)) {
    throw new Error(`Sitemap source file not found at ${sitemapSource}`);
  }

  console.log('Copying sitemap from', sitemapSource, 'to', sitemapDest);
  fs.copyFileSync(sitemapSource, sitemapDest);

  // Create config.json with content type override
  const config = {
    version: 3,
    overrides: {
      'static/sitemap.xml': {
        contentType: 'application/xml',
      },
    },
  };

  const configPath = path.join(outputDir, 'config.json');
  console.log('Writing config to:', configPath);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  // Verify the files were created
  console.log('\nVerifying created files:');
  console.log('Config exists:', fs.existsSync(configPath));
  console.log('Sitemap exists:', fs.existsSync(sitemapDest));

  // Read and log the config content
  const configContent = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log('\nConfig content:', JSON.stringify(configContent, null, 2));

  console.log('\nVercel build output configuration completed successfully!');
} catch (error) {
  console.error('Error during Vercel build configuration:', error);
  process.exit(1);
}
