// scripts/build-photos.js
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PHOTOS_DIR = path.join(ROOT, 'photos');

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(full));
    else out.push(full);
  }
  return out;
}

if (!fs.existsSync(PHOTOS_DIR)) {
  console.error('Dossier "photos" introuvable.');
  process.exit(1);
}

const files = walk(PHOTOS_DIR)
  .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
  .map(f => path.relative(ROOT, f).split(path.sep).join('/'))
  .sort((a,b) => a.localeCompare(b, 'fr'));

fs.writeFileSync(path.join(ROOT, 'photos.json'), JSON.stringify(files, null, 2));
console.log(`photos.json généré (${files.length} fichiers).`);
