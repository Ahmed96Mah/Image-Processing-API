'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var sharp_1 = __importDefault(require('sharp'));
var path_1 = __importDefault(require('path'));
var sharpy = function (req, res, next) {
  // First, record the query parameters.
  var fileName = req.query.filename;
  var width = parseInt(req.query.width);
  var height = parseInt(req.query.height);
  var extension = req.query.ext;
  // Call the sharp API & provide it with path to the selected image.
  (0, sharp_1.default)('assets/full/'.concat(fileName, '.jpg'))
    .resize(width, height)
    .toFile(
      'assets/thumb/thumb_'
        .concat(fileName, '_')
        .concat(width, '_')
        .concat(height, '.')
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
              .concat(height, '.')
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
                .concat(height, '.')
                .concat(extension)
            );
          next();
        }
      }
    );
};
exports.default = sharpy;
