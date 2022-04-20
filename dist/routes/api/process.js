"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var verifier_1 = __importDefault(require("../../util/verifier"));
var checker_1 = __importDefault(require("../../util/checker"));
var resize_1 = __importDefault(require("../../util/resize"));
var rotate_1 = __importDefault(require("../../util/rotate"));
var flip_1 = __importDefault(require("../../util/flip"));
var flop_1 = __importDefault(require("../../util/flop"));
var routes = express_1.default.Router();
routes.get('/api/images', verifier_1.default, checker_1.default, resize_1.default, rotate_1.default, flip_1.default, flop_1.default, function (req, res) { });
exports.default = routes;
