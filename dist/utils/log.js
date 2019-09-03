"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = console.log;
var _default = {
  info: function info() {
    log(_logSymbols.default.info, _chalk.default.blue(...arguments));
  },
  succes: function succes() {
    log(_logSymbols.default.success, _chalk.default.green(...arguments));
  },
  warn: function warn() {
    log(_logSymbols.default.warning, _chalk.default.yellow(...arguments));
  },
  error: function error() {
    log(_logSymbols.default.error, _chalk.default.red(...arguments));
  }
};
exports.default = _default;