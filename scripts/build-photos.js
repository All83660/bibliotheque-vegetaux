const fs = require("fs");
const path = require("path");

const photosDir = path.join(__dirname, "../photos");
const outputFile = path.join(__dirname, "../photos.json");

// Extensions autorisées (uniquement des images)
const allowedExt = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

function getFiles(dir) {
  return fs.readdirSync(dir)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return allowedExt.includes(ext); // on garde uniquement les images
    })
    .map(file => ({
      name: file,
      path: `photos/${file}`,
      url: `https://cdn.jsdelivr.net/gh/All83660/bibliotheque-vegetaux/photos/${encodeURIComponent(file)}`
    }));
}

const files = getFiles(photosDir);
fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));

console.log(`✅ ${files.length} images ajoutées à photos.json`);
