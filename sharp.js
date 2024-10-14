const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'src/public/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  // mengubah ukuran gambar dengan lebar 1300px, dengan prefix -large.jpg
  sharp(`${target}/${image}`)
    .resize(1300)
    .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`));

  // mengubah ukuran gambar dengan lebar 900px, dengan prefix -medium.jpg
  sharp(`${target}/${image}`)
    .resize(900)
    .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-medium.jpg`));

  // mengubah ukuran gambar dengan lebar 600px, dengan prefix -small.jpg
  sharp(`${target}/${image}`)
    .resize(600)
    .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`));
});
