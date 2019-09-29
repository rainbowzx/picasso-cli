"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.set = exports.getAll = exports.get = void 0;

var _constants = require("./constants");

var _log = _interopRequireDefault(require("../utils/log"));

var _tamplate = _interopRequireDefault(require("../utils/tamplate"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _ini = require("ini");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var exits = _fsExtra.default.existsSync;
var readFile = _fsExtra.default.readFileSync;
var writeFile = _fsExtra.default.writeFileSync; // templateConfig 为默认的配置

var get =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (key) {
    var exit = yield exits(_constants.RC);
    var opts;

    if (exit) {
      opts = yield readFile(_constants.RC, 'utf8');
      opts = (0, _ini.decode)(opts);

      if (!key) {
        _log.default.error('您未输入key值');

        _log.default.warn("\u8BF7\u8F93\u5165\u4EE5\u4E0Bkey\u503C\u4E2D\u7684\u4E00\u4E2A:[".concat(Object.keys(opts), "]"));

        return '';
      } else if (!opts[key]) {
        _log.default.error("".concat(key, "\u7684\u914D\u7F6E\u4E0D\u5B58\u5728"));

        _log.default.warn("\u8BF7\u8F93\u5165\u4EE5\u4E0Bkey\u503C\u4E2D\u7684\u4E00\u4E2A:[".concat(Object.keys(opts), "]"));

        return '';
      }

      return opts[key];
    }

    return {};
  });

  return function get(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.get = get;

var getAll =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* () {
    var exit = exits(_constants.RC);
    var opts;

    if (exit) {
      opts = yield readFile(_constants.RC, 'utf8');
      opts = (0, _ini.decode)(opts);
      return opts;
    } else {
      _log.default.warn('首次配置需要设置一个模板配置');

      yield set();
    }

    return _tamplate.default;
  });

  return function getAll() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAll = getAll;

var set =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(function* () {
    var answers = yield _inquirer.default.prompt(_constants.ANSWERLIST);
    var exit = exits(_constants.RC);
    var opts;

    if (exit) {
      opts = yield readFile(_constants.RC, 'utf8');
      opts = (0, _ini.decode)(opts);
      Object.assign(opts, {
        [answers.value]: answers
      });
    } else {
      if (answers.name) {
        opts = Object.assign(_tamplate.default, {
          [answers.value]: answers
        });
        console.log(opts);
      } else {
        opts = _tamplate.default;
      }
    }

    yield writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
  });

  return function set() {
    return _ref3.apply(this, arguments);
  };
}();

exports.set = set;

var remove =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(function* (key) {
    var exit = yield exits(_constants.RC);
    var opts;

    if (exit) {
      opts = yield readFile(_constants.RC, 'utf8');
      opts = (0, _ini.decode)(opts);
      delete opts[key];
      yield writeFile(_constants.RC, (0, _ini.encode)(opts), 'utf8');
    }
  });

  return function remove(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.remove = remove;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yYy50cyJdLCJuYW1lcyI6WyJleGl0cyIsImZzIiwiZXhpc3RzU3luYyIsInJlYWRGaWxlIiwicmVhZEZpbGVTeW5jIiwid3JpdGVGaWxlIiwid3JpdGVGaWxlU3luYyIsImdldCIsImtleSIsImV4aXQiLCJSQyIsIm9wdHMiLCJsb2ciLCJlcnJvciIsIndhcm4iLCJPYmplY3QiLCJrZXlzIiwiZ2V0QWxsIiwic2V0IiwidGVtcGxhdGVDb25maWciLCJhbnN3ZXJzIiwiaW5xdWlyZXIiLCJwcm9tcHQiLCJBTlNXRVJMSVNUIiwiYXNzaWduIiwidmFsdWUiLCJuYW1lIiwiY29uc29sZSIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLEtBQUssR0FBR0MsaUJBQUdDLFVBQWpCO0FBQ0EsSUFBTUMsUUFBUSxHQUFHRixpQkFBR0csWUFBcEI7QUFDQSxJQUFNQyxTQUFTLEdBQUdKLGlCQUFHSyxhQUFyQixDLENBRUE7O0FBQ08sSUFBTUMsR0FBRztBQUFBO0FBQUE7QUFBQSwrQkFBRyxXQUFPQyxHQUFQLEVBQXNCO0FBQ3JDLFFBQU1DLElBQUksU0FBU1QsS0FBSyxDQUFDVSxhQUFELENBQXhCO0FBQ0EsUUFBSUMsSUFBSjs7QUFDQSxRQUFJRixJQUFKLEVBQVU7QUFDTkUsTUFBQUEsSUFBSSxTQUFTUixRQUFRLENBQUNPLGFBQUQsRUFBSyxNQUFMLENBQXJCO0FBQ0FDLE1BQUFBLElBQUksR0FBRyxpQkFBT0EsSUFBUCxDQUFQOztBQUNBLFVBQUksQ0FBQ0gsR0FBTCxFQUFVO0FBQ05JLHFCQUFJQyxLQUFKLENBQVUsVUFBVjs7QUFDQUQscUJBQUlFLElBQUosNEVBQTJCQyxNQUFNLENBQUNDLElBQVAsQ0FBWUwsSUFBWixDQUEzQjs7QUFDQSxlQUFPLEVBQVA7QUFDSCxPQUpELE1BSU8sSUFBSSxDQUFDQSxJQUFJLENBQUNILEdBQUQsQ0FBVCxFQUFnQjtBQUNuQkkscUJBQUlDLEtBQUosV0FBYUwsR0FBYjs7QUFDQUkscUJBQUlFLElBQUosNEVBQTJCQyxNQUFNLENBQUNDLElBQVAsQ0FBWUwsSUFBWixDQUEzQjs7QUFDQSxlQUFPLEVBQVA7QUFDSDs7QUFDRCxhQUFPQSxJQUFJLENBQUNILEdBQUQsQ0FBWDtBQUNIOztBQUNELFdBQU8sRUFBUDtBQUNILEdBbEJlOztBQUFBLGtCQUFIRCxHQUFHO0FBQUE7QUFBQTtBQUFBLEdBQVQ7Ozs7QUFvQkEsSUFBTVUsTUFBTTtBQUFBO0FBQUE7QUFBQSxnQ0FBRyxhQUFZO0FBQzlCLFFBQU1SLElBQUksR0FBR1QsS0FBSyxDQUFDVSxhQUFELENBQWxCO0FBQ0EsUUFBSUMsSUFBSjs7QUFDQSxRQUFJRixJQUFKLEVBQVU7QUFDTkUsTUFBQUEsSUFBSSxTQUFTUixRQUFRLENBQUNPLGFBQUQsRUFBSyxNQUFMLENBQXJCO0FBQ0FDLE1BQUFBLElBQUksR0FBRyxpQkFBT0EsSUFBUCxDQUFQO0FBQ0EsYUFBT0EsSUFBUDtBQUNILEtBSkQsTUFJTztBQUNIQyxtQkFBSUUsSUFBSixDQUFTLGdCQUFUOztBQUNBLFlBQU1JLEdBQUcsRUFBVDtBQUNIOztBQUNELFdBQU9DLGlCQUFQO0FBQ0gsR0Faa0I7O0FBQUEsa0JBQU5GLE1BQU07QUFBQTtBQUFBO0FBQUEsR0FBWjs7OztBQWNBLElBQU1DLEdBQUc7QUFBQTtBQUFBO0FBQUEsZ0NBQUcsYUFBWTtBQU0zQixRQUFNRSxPQUFvQixTQUFTQyxrQkFBU0MsTUFBVCxDQUFnQkMscUJBQWhCLENBQW5DO0FBQ0EsUUFBTWQsSUFBSSxHQUFHVCxLQUFLLENBQUNVLGFBQUQsQ0FBbEI7QUFDQSxRQUFJQyxJQUFKOztBQUNBLFFBQUlGLElBQUosRUFBVTtBQUNORSxNQUFBQSxJQUFJLFNBQVNSLFFBQVEsQ0FBQ08sYUFBRCxFQUFLLE1BQUwsQ0FBckI7QUFDQUMsTUFBQUEsSUFBSSxHQUFHLGlCQUFPQSxJQUFQLENBQVA7QUFDQUksTUFBQUEsTUFBTSxDQUFDUyxNQUFQLENBQWNiLElBQWQsRUFBb0I7QUFBRSxTQUFDUyxPQUFPLENBQUNLLEtBQVQsR0FBaUJMO0FBQW5CLE9BQXBCO0FBQ0gsS0FKRCxNQUlPO0FBQ0gsVUFBSUEsT0FBTyxDQUFDTSxJQUFaLEVBQWtCO0FBQ2RmLFFBQUFBLElBQUksR0FBR0ksTUFBTSxDQUFDUyxNQUFQLENBQWNMLGlCQUFkLEVBQThCO0FBQUUsV0FBQ0MsT0FBTyxDQUFDSyxLQUFULEdBQWlCTDtBQUFuQixTQUE5QixDQUFQO0FBQ0FPLFFBQUFBLE9BQU8sQ0FBQ2YsR0FBUixDQUFZRCxJQUFaO0FBQ0gsT0FIRCxNQUdPO0FBQ0hBLFFBQUFBLElBQUksR0FBR1EsaUJBQVA7QUFDSDtBQUVKOztBQUNELFVBQU1kLFNBQVMsQ0FBQ0ssYUFBRCxFQUFLLGlCQUFPQyxJQUFQLENBQUwsRUFBbUIsTUFBbkIsQ0FBZjtBQUNILEdBdkJlOztBQUFBLGtCQUFITyxHQUFHO0FBQUE7QUFBQTtBQUFBLEdBQVQ7Ozs7QUF5QkEsSUFBTVUsTUFBTTtBQUFBO0FBQUE7QUFBQSxnQ0FBRyxXQUFPcEIsR0FBUCxFQUFzQjtBQUN4QyxRQUFNQyxJQUFJLFNBQVNULEtBQUssQ0FBQ1UsYUFBRCxDQUF4QjtBQUNBLFFBQUlDLElBQUo7O0FBQ0EsUUFBSUYsSUFBSixFQUFVO0FBQ05FLE1BQUFBLElBQUksU0FBU1IsUUFBUSxDQUFDTyxhQUFELEVBQUssTUFBTCxDQUFyQjtBQUNBQyxNQUFBQSxJQUFJLEdBQUcsaUJBQU9BLElBQVAsQ0FBUDtBQUNBLGFBQU9BLElBQUksQ0FBQ0gsR0FBRCxDQUFYO0FBQ0EsWUFBTUgsU0FBUyxDQUFDSyxhQUFELEVBQUssaUJBQU9DLElBQVAsQ0FBTCxFQUFtQixNQUFuQixDQUFmO0FBQ0g7QUFDSixHQVRrQjs7QUFBQSxrQkFBTmlCLE1BQU07QUFBQTtBQUFBO0FBQUEsR0FBWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJDLCBBTlNXRVJMSVNUIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0ICBsb2cgZnJvbSAnLi4vdXRpbHMvbG9nJztcbmltcG9ydCB0ZW1wbGF0ZUNvbmZpZyBmcm9tICcuLi91dGlscy90YW1wbGF0ZSc7XG5pbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInO1xuaW1wb3J0IHsgZGVjb2RlLCBlbmNvZGUgfSBmcm9tICdpbmknO1xuLy8gaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuXG5jb25zdCBleGl0cyA9IGZzLmV4aXN0c1N5bmM7XG5jb25zdCByZWFkRmlsZSA9IGZzLnJlYWRGaWxlU3luYztcbmNvbnN0IHdyaXRlRmlsZSA9IGZzLndyaXRlRmlsZVN5bmM7XG5cbi8vIHRlbXBsYXRlQ29uZmlnIOS4uum7mOiupOeahOmFjee9rlxuZXhwb3J0IGNvbnN0IGdldCA9IGFzeW5jIChrZXk6c3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZXhpdCA9IGF3YWl0IGV4aXRzKFJDKTtcbiAgICBsZXQgb3B0cztcbiAgICBpZiAoZXhpdCkge1xuICAgICAgICBvcHRzID0gYXdhaXQgcmVhZEZpbGUoUkMsICd1dGY4Jyk7XG4gICAgICAgIG9wdHMgPSBkZWNvZGUob3B0cyk7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoJ+aCqOacqui+k+WFpWtleeWAvCcpO1xuICAgICAgICAgICAgbG9nLndhcm4oYOivt+i+k+WFpeS7peS4i2tleeWAvOS4reeahOS4gOS4qjpbJHtPYmplY3Qua2V5cyhvcHRzKX1dYCk7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0gZWxzZSBpZiAoIW9wdHNba2V5XSkge1xuICAgICAgICAgICAgbG9nLmVycm9yKGAke2tleX3nmoTphY3nva7kuI3lrZjlnKhgKTtcbiAgICAgICAgICAgIGxvZy53YXJuKGDor7fovpPlhaXku6XkuItrZXnlgLzkuK3nmoTkuIDkuKo6WyR7T2JqZWN0LmtleXMob3B0cyl9XWApO1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRzW2tleV07XG4gICAgfVxuICAgIHJldHVybiB7fTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldEFsbCA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBleGl0ID0gZXhpdHMoUkMpO1xuICAgIGxldCBvcHRzO1xuICAgIGlmIChleGl0KSB7XG4gICAgICAgIG9wdHMgPSBhd2FpdCByZWFkRmlsZShSQywgJ3V0ZjgnKTtcbiAgICAgICAgb3B0cyA9IGRlY29kZShvcHRzKTtcbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLndhcm4oJ+mmluasoemFjee9rumcgOimgeiuvue9ruS4gOS4quaooeadv+mFjee9ricpO1xuICAgICAgICBhd2FpdCBzZXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBsYXRlQ29uZmlnO1xufVxuXG5leHBvcnQgY29uc3Qgc2V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGludGVyZmFjZSBBbnN3ZXJzVmFsdWUge1xuICAgICAgICBuYW1lOnN0cmluZyxcbiAgICAgICAgdmFsdWU6c3RyaW5nLFxuICAgICAgICBnaXQ6c3RyaW5nLFxuICAgIH1cbiAgICBjb25zdCBhbnN3ZXJzOkFuc3dlcnNWYWx1ZSA9IGF3YWl0IGlucXVpcmVyLnByb21wdChBTlNXRVJMSVNUKTtcbiAgICBjb25zdCBleGl0ID0gZXhpdHMoUkMpO1xuICAgIGxldCBvcHRzO1xuICAgIGlmIChleGl0KSB7XG4gICAgICAgIG9wdHMgPSBhd2FpdCByZWFkRmlsZShSQywgJ3V0ZjgnKTtcbiAgICAgICAgb3B0cyA9IGRlY29kZShvcHRzKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRzLCB7IFthbnN3ZXJzLnZhbHVlXTogYW5zd2VycyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYW5zd2Vycy5uYW1lKSB7XG4gICAgICAgICAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih0ZW1wbGF0ZUNvbmZpZywgeyBbYW5zd2Vycy52YWx1ZV06IGFuc3dlcnMgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdHMgPSB0ZW1wbGF0ZUNvbmZpZztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgYXdhaXQgd3JpdGVGaWxlKFJDLCBlbmNvZGUob3B0cyksICd1dGY4Jyk7XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSBhc3luYyAoa2V5OnN0cmluZykgPT4ge1xuICAgIGNvbnN0IGV4aXQgPSBhd2FpdCBleGl0cyhSQyk7XG4gICAgbGV0IG9wdHM7XG4gICAgaWYgKGV4aXQpIHtcbiAgICAgICAgb3B0cyA9IGF3YWl0IHJlYWRGaWxlKFJDLCAndXRmOCcpO1xuICAgICAgICBvcHRzID0gZGVjb2RlKG9wdHMpO1xuICAgICAgICBkZWxldGUgb3B0c1trZXldO1xuICAgICAgICBhd2FpdCB3cml0ZUZpbGUoUkMsIGVuY29kZShvcHRzKSwgJ3V0ZjgnKTtcbiAgICB9XG59Il19