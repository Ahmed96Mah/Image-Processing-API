'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var verifier_1 = __importDefault(require('../../util/verifier'));
var checker_1 = __importDefault(require('../../util/checker'));
var sharp_1 = __importDefault(require('../../util/sharp'));
var routes = express_1.default.Router();
routes.get(
  '/api/images',
  verifier_1.default,
  checker_1.default,
  sharp_1.default,
  function (req, res) {}
);
exports.default = routes;
