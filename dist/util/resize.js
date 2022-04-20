"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var sharpResize_1 = __importDefault(require("../sharp/sharpResize"));
var sharpy = function (req, res, next) {
    // First, record the query parameters.
    var fileName = req.query.filename;
    var width = parseInt(req.query.width);
    var height = parseInt(req.query.height);
    var process = req.query.process;
    var extension = req.query.ext;
    if (process.toLowerCase() === 'resize') {
        // Call the sharp API & provide it with path to the selected image.
        (0, sharpResize_1.default)(fileName, width, height, process, extension).then(function () {
            // After the image resizing, send the image for the user.
            var dirName = path_1.default.join(__dirname, '../../');
            res.status(200)
                .sendFile("".concat(dirName, "/assets/thumb/thumb_").concat(fileName, "_").concat(width, "_").concat(height, "_0_").concat(process, ".").concat(extension));
        });
    }
    else {
        next();
    }
};
exports.default = sharpy;
