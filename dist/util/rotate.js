'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var sharp_1 = __importDefault(require('sharp'));
var path_1 = __importDefault(require('path'));
var image_size_1 = __importDefault(require('image-size'));
var rotate = function (req, res, next) {
  // First, record the query parameters.
  var fileName = req.query.filename;
  var width = req.query.width;
  var height = req.query.height;
  var angle = req.query.rotate;
  var process = req.query.process;
  var extension = req.query.ext;
  var dimensions = (0, image_size_1.default)(
    'assets/full/'.concat(fileName, '.jpg')
  );
  // Check the values of width, height params.
  if (width === '' || width === undefined) {
    // If the width query doesn't exist or doesn't hold a value (Not a resizing process).
    width = dimensions.width;
  }
  if (height === '' || height === undefined) {
    // If the height query doesn't exist or doesn't hold a value (Not a resizing process).
    height = dimensions.height;
  }
  if (process.toLowerCase() === 'rotate') {
    // Call the sharp API & provide it with path to the selected image.
    (0, sharp_1.default)('assets/full/'.concat(fileName, '.jpg'))
      .rotate(parseInt(angle), { background: '#0e0e0e' })
      .sharpen()
      .median(1)
      .resize(parseInt(width), parseInt(height))
      .toFile(
        'assets/thumb/thumb_'
          .concat(fileName, '_')
          .concat(width, '_')
          .concat(height, '_')
          .concat(angle, '_')
          .concat(process, '.')
          .concat(extension),
        function (err) {
          // This function always runs after the image is created.
          // If there is an error (send it to the user & log it to the server).
          if (err !== null) {
            console.log('error, '.concat(err));
            res.status(500).send('error, '.concat(err));
          } else {
            // After processing.
            console.log(
              'Created File: thumb_'
                .concat(fileName, '_')
                .concat(width, '_')
                .concat(height, '_')
                .concat(angle, '_')
                .concat(process, '.')
                .concat(extension)
            );
            console.log('Sending the processed thumb...');
            var dirName = path_1.default.join(__dirname, '../../');
            res
              .status(200)
              .sendFile(
                ''
                  .concat(dirName, '/assets/thumb/thumb_')
                  .concat(fileName, '_')
                  .concat(width, '_')
                  .concat(height, '_')
                  .concat(angle, '_')
                  .concat(process, '.')
                  .concat(extension)
              );
          }
        }
      );
  } else {
    next();
  }
};
exports.default = rotate;
