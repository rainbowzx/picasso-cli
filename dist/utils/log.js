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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2cudHMiXSwibmFtZXMiOlsibG9nIiwiY29uc29sZSIsImluZm8iLCJzeW1ib2wiLCJjaGFsayIsImJsdWUiLCJzdWNjZXMiLCJzdWNjZXNzIiwiZ3JlZW4iLCJ3YXJuIiwid2FybmluZyIsInllbGxvdyIsImVycm9yIiwicmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQSxJQUFNQSxHQUFHLEdBQUdDLE9BQU8sQ0FBQ0QsR0FBcEI7ZUFFZTtBQUNYRSxFQUFBQSxJQUFJLEVBQUUsZ0JBQWtCO0FBQ3BCRixJQUFBQSxHQUFHLENBQUNHLG9CQUFPRCxJQUFSLEVBQWNFLGVBQU1DLElBQU4sQ0FBVyxZQUFYLENBQWQsQ0FBSDtBQUNILEdBSFU7QUFJWEMsRUFBQUEsTUFBTSxFQUFFLGtCQUFrQjtBQUN0Qk4sSUFBQUEsR0FBRyxDQUFDRyxvQkFBT0ksT0FBUixFQUFpQkgsZUFBTUksS0FBTixDQUFZLFlBQVosQ0FBakIsQ0FBSDtBQUNILEdBTlU7QUFPWEMsRUFBQUEsSUFBSSxFQUFFLGdCQUFrQjtBQUNwQlQsSUFBQUEsR0FBRyxDQUFDRyxvQkFBT08sT0FBUixFQUFpQk4sZUFBTU8sTUFBTixDQUFhLFlBQWIsQ0FBakIsQ0FBSDtBQUNILEdBVFU7QUFVWEMsRUFBQUEsS0FBSyxFQUFFLGlCQUFrQjtBQUNyQlosSUFBQUEsR0FBRyxDQUFDRyxvQkFBT1MsS0FBUixFQUFlUixlQUFNUyxHQUFOLENBQVUsWUFBVixDQUFmLENBQUg7QUFDSDtBQVpVLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3ltYm9sIGZyb20gJ2xvZy1zeW1ib2xzJztcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5jb25zdCBsb2cgPSBjb25zb2xlLmxvZztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGluZm86ICguLi5zdHI6YW55W10pID0+IHtcbiAgICAgICAgbG9nKHN5bWJvbC5pbmZvLCBjaGFsay5ibHVlKC4uLnN0cikpXG4gICAgfSxcbiAgICBzdWNjZXM6ICguLi5zdHI6YW55W10pID0+IHtcbiAgICAgICAgbG9nKHN5bWJvbC5zdWNjZXNzLCBjaGFsay5ncmVlbiguLi5zdHIpKVxuICAgIH0sXG4gICAgd2FybjogKC4uLnN0cjphbnlbXSkgPT4ge1xuICAgICAgICBsb2coc3ltYm9sLndhcm5pbmcsIGNoYWxrLnllbGxvdyguLi5zdHIpKVxuICAgIH0sXG4gICAgZXJyb3I6ICguLi5zdHI6YW55W10pID0+IHtcbiAgICAgICAgbG9nKHN5bWJvbC5lcnJvciwgY2hhbGsucmVkKC4uLnN0cikpXG4gICAgfSxcbn0iXX0=