const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');

fs.readdir(imagesDir, (err, files) => {
  if (err) return console.error(err);
  const pngs = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  Promise.all(pngs.map(f => convert(path.join(imagesDir, f))))
    .then(() => console.log('Conversion complete'))
    .catch(e => console.error(e));
});

function convert(file) {
  const out = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  return sharp(file)
    .webp({ quality: 80 })
    .toFile(out)
    .then(() => console.log('Converted', file, '->', out));
}
