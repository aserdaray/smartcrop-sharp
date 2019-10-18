const fs = require("fs");
const sharp = require("sharp");
var smartcrop = require("smartcrop-sharp");

module.exports = function resize(path, format, width, height) {
  const readStream = fs.readFile(path);
  let transform = sharp();

  smartcrop
    .crop(readStream, { width: width, height: height })
    .then(function(result) {
      var crop = result.topCrop;
      transform = sharp(readStream)
        .extract({
          width: crop.width,
          height: crop.height,
          left: crop.x,
          top: crop.y
        })
        .resize(width, height);
    });

  return readStream.pipe(transform);
};
