"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCli = exports.checkVersion = void 0;

var _latestVersion = _interopRequireDefault(require("latest-version"));

var _log = _interopRequireDefault(require("./log"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _ora = _interopRequireDefault(require("ora"));

var _child_process = require("child_process");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkVersion = () => {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      var spinner = (0, _ora.default)("\u68C0\u67E5\u7248\u672C\u662F\u5426\u6700\u65B0......");
      spinner.start();
      var onlineVersion = yield (0, _latestVersion.default)("picasso-cli");

      var localVersion = require("../../package.json").version;

      spinner.succeed();

      _log.default.info("\u672C\u5730\u7248\u672C".concat(localVersion, ", \u6700\u65B0\u7248\u672C").concat(onlineVersion));

      var onlineVersionArr = onlineVersion.split(".");
      var localVersionArr = localVersion.split(".");
      var isNew = onlineVersionArr.some((item, index) => {
        return Number(item) > Number(localVersionArr[index]);
      });
      resolve(isNew);
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
/**
 * 更新脚手架
 */


exports.checkVersion = checkVersion;

var updateCli = () => {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(function* (resolve) {
      var promptArr = _constants.UPDATEPROMPT;
      var {
        dwTypes
      } = yield _inquirer.default.prompt(promptArr);
      var spinner = (0, _ora.default)("\u66F4\u65B0alice-cli\u4E2D");
      var status = '';

      switch (dwTypes) {
        case "npm":
          spinner.start();
          status = (0, _child_process.spawn)("npm.cmd", ["install", "alice-cli", "-g"]);
          break;

        case "cnpm":
          spinner.start();
          status = (0, _child_process.spawn)("cnpm.cmd", ["install", "alice-cli", "-g"]);
          break;

        case "yarn":
          spinner.start();
          status = (0, _child_process.spawn)("yarn.cmd", ["add", "alice-cli", "-g"]);
          break;
      }

      status.stdout.on("data", data => {
        console.log(data.toString());
      });
      status.on("close", () => {
        spinner.succeed();

        _log.default.succes("更新成功");

        resolve();
      });
    });

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.updateCli = updateCli;