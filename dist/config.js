"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

var _main = require("./main");

var _rc = require("./utils/rc");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var config =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (action, key) {
    switch (action) {
      case 'get':
        var result = yield (0, _rc.get)(key);
        console.log(result);
        break;

      case 'set':
        (0, _rc.set)();
        break;

      case 'remove':
        (0, _rc.remove)(key);
        break;

      default:
        (0, _main.help)();
        break;
    }
  });

  return function config(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.config = config;