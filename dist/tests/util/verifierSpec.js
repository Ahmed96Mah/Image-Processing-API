'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var supertest_1 = __importDefault(require('supertest'));
var index_1 = __importDefault(require('../../index'));
var request = (0, supertest_1.default)(index_1.default);
describe('Test verifier middleware responses', function () {
  describe('File Name Verifications', function () {
    it('Expects an error message with status 400, indicating a missing "filename" query parameter', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?width=500&height=500&rotate=30&process=resize&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                'Error, The URL has to contain a query parameter: filename'
              );
              return [2 /*return*/];
          }
        });
      });
    });
    it('Expects an error message with status 400, indicating a missing "filename" query value', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=&width=500&height=500&rotate=30&process=resize&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                'Error, The filename query parameter must hold a value.'
              );
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe("File's width Verifications", function () {
    it('Expects an error message with status 400, indicating a missing "width" query parameter', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&height=500&rotate=30&process=resize&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                'Error, The URL has to contain a query parameter: width'
              );
              return [2 /*return*/];
          }
        });
      });
    });
    it('Expects an error message with status 400, indicating a missing "width" query value', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=&height=500&rotate=30&process=resize&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                "Error, The image's width must be a non-zero value. Received: "
              );
              return [2 /*return*/];
          }
        });
      });
    });
    it('Expects an error message with status 400, indicating a "width" query value of 0', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=0&height=500&rotate=30&process=resize&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                "Error, The image's width must be a non-zero value. Received: 0"
              );
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe("File's height Verifications", function () {
    it('Expects an error message with status 400, indicating a missing "height" query parameter', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=500&rotate=30&process=resize&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                'Error, The URL has to contain a query parameter: height'
              );
              return [2 /*return*/];
          }
        });
      });
    });
    it('Expects an error message with status 400, indicating a missing "height" query value', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=500&height=&rotate=30&process=resize&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                "Error, The image's height must be a non-zero value. Received: "
              );
              return [2 /*return*/];
          }
        });
      });
    });
    it('Expects an error message with status 400, indicating a "height" query value of 0', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=500&height=0&rotate=30&process=resize&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                "Error, The image's height must be a non-zero value. Received: 0"
              );
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe("File's extension Verifications", function () {
    it('Expects an error message with status 400, indicating a missing "ext" query parameter', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=500&height=500&rotate=30&process=resize'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                'Error, The URL has to contain a query parameter: ext'
              );
              return [2 /*return*/];
          }
        });
      });
    });
    it('Expects an error message with status 400, indicating an unallowed "ext" query value', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=500&height=500&rotate=30&process=resize&ext=no'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                'Error, The available image extensions: JPG, JPEG, PNG, WEBP, GIF, AVIF, TIFF'
              );
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe("File's rotation angle Verifications", function () {
    it('Expects an error message with status 400, indicating a missing "rotate" query parameter', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=500&height=500&process=rotate&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                'Error, The URL has to contain a query parameter: rotate'
              );
              return [2 /*return*/];
          }
        });
      });
    });
    it('Expects an error message with status 400, indicating a missing "rotate" query value', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=500&height=500&rotate=&process=rotate&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                "Error, The image's rotation angle must hold a value. Received: "
              );
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe("File's process Verifications", function () {
    it('Expects an error message with status 400, indicating a missing "process" query parameter', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=500&height=500&rotate=30&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                'Error, The URL has to contain a query parameter: process'
              );
              return [2 /*return*/];
          }
        });
      });
    });
    it('Expects an error message with status 400, indicating a missing "process" query value', function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                request.get(
                  '/api/images?filename=fjord&width=500&height=500&rotate=30&process=&ext=jpeg'
                ),
              ];
            case 1:
              response = _a.sent();
              expect(response.status).toBe(400);
              expect(response.text).toEqual(
                'Error, The available image processes: RESIZE, ROTATE, FLIP, FLOP'
              );
              return [2 /*return*/];
          }
        });
      });
    });
  });
});
