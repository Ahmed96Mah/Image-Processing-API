'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var fs_1 = __importDefault(require('fs'));
var verifier = function (req, res, next) {
  // First, record the query parameter.
  var fileName = req.query.filename;
  var width = req.query.width;
  var height = req.query.height;
  var angle = req.query.rotate;
  var process = req.query.process;
  var extension = req.query.ext;
  // Define the available extensions for the API.
  var availableExts = ['JPG', 'JPEG', 'PNG', 'WEBP', 'GIF', 'AVIF', 'TIFF'];
  var availableProcess = ['RESIZE', 'ROTATE', 'FLIP', 'FLOP'];
  // Set the initial verification status.
  var verifiyName = false;
  var verifiyW = false;
  var verifiyH = false;
  var verifiyExt = false;
  var verifiyA = false;
  var verifiyP = false;
  // (File Name Verification) check if the filename exists along with its query parameter.
  if (fileName !== '' && fileName !== undefined) {
    verifiyName = true;
  }
  // (Width Verification) check if the user has provided a non-zero width (Mainly required for resizing process).
  if (
    (width !== '' && width !== '0' && width !== undefined) ||
    process.toUpperCase() !== 'RESIZE'
  ) {
    verifiyW = true;
  }
  // (Height Verification) check if the user has provided a non-zero height (Mainly required for resizing process).
  if (
    (height !== '' && height !== '0' && height !== undefined) ||
    process.toUpperCase() !== 'RESIZE'
  ) {
    verifiyH = true;
  }
  // (Extension Verification) check if the user has provided an acceptable extension.
  if (
    extension !== '' &&
    extension !== undefined &&
    availableExts.includes(extension.toUpperCase())
  ) {
    verifiyExt = true;
  }
  // (Rotation Angle Verification) only require the rotation angle for rotation process.
  if (
    (angle !== '' && angle !== undefined) ||
    process.toUpperCase() !== 'ROTATE'
  ) {
    verifiyA = true;
  }
  // (Process Verification) check if the entered process is avaiable.
  if (
    process !== '' &&
    process !== undefined &&
    availableProcess.includes(process.toUpperCase())
  ) {
    verifiyP = true;
  }
  // (Main Verification) check if the source image exists (in assets -> full) & verification tests passed.
  if (
    fs_1.default.existsSync('./assets/full/'.concat(fileName, '.jpg')) &&
    verifiyW === true &&
    verifiyH === true &&
    verifiyExt === true &&
    verifiyA === true &&
    verifiyP === true
  ) {
    console.log('Verified file: '.concat(fileName, ".jpg & request's info..."));
    // If the source image exists, move to the next middleware (checker).
    next();
  } else {
    // (Main error handlers)..........
    // If the error relates to the file name.....
    if (!fs_1.default.existsSync('./assets/full/'.concat(fileName, '.jpg'))) {
      if (verifiyName === false) {
        if (fileName === undefined) {
          // If the filename query parameter dosen't exist.
          res
            .status(400)
            .send('Error, The URL has to contain a query parameter: filename');
        } else {
          // Else, query parameter exists but its value isn't set.
          res
            .status(400)
            .send('Error, The filename query parameter must hold a value.');
        }
      } else {
        // If the filename query parameter exists and hold a vlaue, but file doesn't exists.
        res
          .status(400)
          .send(
            'Error, ./assets/full/'.concat(fileName, ".jpg doesn't exists!!")
          );
      }
    }
    // If the error relates to the requested file width.....
    if (verifiyW === false) {
      if (width === undefined) {
        res
          .status(400)
          .send('Error, The URL has to contain a query parameter: width');
      } else {
        res
          .status(400)
          .send(
            "Error, The image's width must be a non-zero value. Received: ".concat(
              width
            )
          );
      }
    }
    // If the error relates to the requested file height.....
    if (verifiyH === false) {
      if (height === undefined) {
        res
          .status(400)
          .send('Error, The URL has to contain a query parameter: height');
      } else {
        res
          .status(400)
          .send(
            "Error, The image's height must be a non-zero value. Received: ".concat(
              height
            )
          );
      }
    }
    // If the error relates to the requested file extension.....
    if (verifiyExt === false) {
      if (extension === undefined) {
        res
          .status(400)
          .send('Error, The URL has to contain a query parameter: ext');
      } else {
        res
          .status(400)
          .send(
            'Error, The available image extensions: JPG, JPEG, PNG, WEBP, GIF, AVIF, TIFF'
          );
      }
    }
    // If the error relates to the requested file rotation angle.....
    if (verifiyA === false) {
      if (angle === undefined) {
        res
          .status(400)
          .send('Error, The URL has to contain a query parameter: rotate');
      } else {
        res
          .status(400)
          .send(
            "Error, The image's rotation angle must hold a value. Received: ".concat(
              angle
            )
          );
      }
    }
    // If the error relates to the requested process.....
    if (verifiyP === false) {
      if (process === undefined) {
        res
          .status(400)
          .send('Error, The URL has to contain a query parameter: process');
      } else {
        res
          .status(400)
          .send(
            'Error, The available image processes: RESIZE, ROTATE, FLIP, FLOP'
          );
      }
    }
  }
};
exports.default = verifier;
