"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var image_size_1 = __importDefault(require("image-size"));
var sharpRotate_1 = __importDefault(require("../sharp/sharpRotate"));
var rotate = function (req, res, next) {
    // First, record the query parameters.
    var fileName = req.query.filename;
    var width = req.query.width;
    var height = req.query.height;
    var angle = parseInt(req.query.rotate);
    var process = req.query.process;
    var extension = req.query.ext;
    var dimensions = (0, image_size_1.default)("assets/full/".concat(fileName, ".jpg"));
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
        (0, sharpRotate_1.default)(fileName, parseInt(width), parseInt(height), angle, process, extension).then(function () {
            // After the image rotation, send the image for the user.
            var dirName = path_1.default.join(__dirname, '../../');
            res
                .status(200)
                .sendFile("".concat(dirName, "/assets/thumb/thumb_").concat(fileName, "_").concat(width, "_").concat(height, "_").concat(angle, "_").concat(process, ".").concat(extension));
        });
    }
    else {
        next();
    }
};
exports.default = rotate;
