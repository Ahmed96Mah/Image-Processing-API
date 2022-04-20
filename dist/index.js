"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var process_1 = __importDefault(require("./routes/api/process"));
// Create an application object.
var app = (0, express_1.default)();
var port = 3000;
app.use('/', process_1.default);
app.listen(port, function () {
    console.log("The server is running @ port ".concat(port));
});
exports.default = app;
