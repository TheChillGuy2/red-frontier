// generate-sitemap.js
// Dieses Skript durchsucht den Ordner /cocktails und erstellt daraus eine sitemap.xml

const fs = require('fs');
const path = require('path');

const cocktailDir = path.join(__dirname, 'cocktails');
const baseUrl = 'https://thechillguy2.github.io/cocktail.html?drink=';

const files = fs.readdirSync(cocktailDir).filter(f => f.endsWith('.json'));

const urls = files.map(filename => {
  const id = path.basename(filename, '.json');
  return `  <url>\n    <loc>${baseUrl}${id}</loc>\n  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf-8');
console.log('✅ sitemap.xml wurde erstellt.');
