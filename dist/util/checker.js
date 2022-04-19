'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var fs_1 = __importDefault(require('fs'));
var path_1 = __importDefault(require('path'));
var checker = function (req, res, next) {
  // First, record the query parameters.
  var fileName = req.query.filename;
  var width = req.query.width;
  var height = req.query.height;
  var extension = req.query.ext;
  // Check if the thumb file already exists (has been processed before).
  if (
    fs_1.default.existsSync(
      './assets/thumb/thumb_'
        .concat(fileName, '_')
        .concat(width, '_')
        .concat(height, '.')
        .concat(extension)
    )
  ) {
    console.log(
      'File: thumb_'
        .concat(fileName, '_')
        .concat(width, '_')
        .concat(height, '.')
        .concat(extension, ' already exists!')
    );
    console.log('Sending the existing thumb...');
    // Go back to the root directory (current directory src-> util).
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
  } else {
    // If thumb doesn't exist, move to the processing middleware (sharp).
    next();
  }
};
exports.default = checker;
