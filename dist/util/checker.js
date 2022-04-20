"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var image_size_1 = __importDefault(require("image-size"));
var checker = function (req, res, next) {
    // First, record the query parameters.
    var fileName = req.query.filename;
    var width = req.query.width;
    var height = req.query.height;
    var angle = req.query.rotate;
    var process = req.query.process;
    var extension = req.query.ext;
    var dimensions = (0, image_size_1.default)("assets/full/".concat(fileName, ".jpg"));
    // Check the values of width, height, angle params.
    if (width === '' || width === undefined) {
        // If the width query doesn't exist or doesn't hold a value (Not a resizing process).
        width = dimensions.width;
    }
    if (height === '' || height === undefined) {
        // If the height query doesn't exist or doesn't hold a value (Not a resizing process).
        height = dimensions.height;
    }
    if (angle === '' ||
        angle === undefined ||
        process.toLowerCase() !== 'rotate') {
        // If the angle query doesn't exist or doesn't hold a value (Not a rotation process).
        angle = '0';
    }
    // Check if the thumb file already exists (has been processed before).
    if (fs_1.default.existsSync("./assets/thumb/thumb_".concat(fileName, "_").concat(width, "_").concat(height, "_").concat(angle, "_").concat(process, ".").concat(extension))) {
        console.log("File: thumb_".concat(fileName, "_").concat(width, "_").concat(height, "_").concat(angle, "_").concat(process, ".").concat(extension, " already exists!"));
        // Go back to the root directory (current directory src-> util).
        var dirName = path_1.default.join(__dirname, '../../');
        res
            .status(200)
            .sendFile("".concat(dirName, "/assets/thumb/thumb_").concat(fileName, "_").concat(width, "_").concat(height, "_").concat(angle, "_").concat(process, ".").concat(extension));
    }
    else {
        // If thumb doesn't exist, move to the processing middleware (sharp).
        next();
    }
};
exports.default = checker;
