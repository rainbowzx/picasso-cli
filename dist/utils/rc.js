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