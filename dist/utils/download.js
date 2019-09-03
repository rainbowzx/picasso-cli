"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

var _log = _interopRequireDefault(require("../utils/log"));

var _path = _interopRequireDefault(require("path"));

var _ora = _interopRequireDefault(require("ora"));

var _constants = require("../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (target, url) => {
  var spinner = (0, _ora.default)("\u6B63\u5728\u4E0B\u8F7D\u9879\u76EE\u6A21\u677F\uFF0C\u6E90\u5730\u5740\uFF1A".concat(url));
  console.log(_constants.CONSTTYPE.TEMPLATE_NAME);
  target = _path.default.join(_constants.CONSTTYPE.TEMPLATE_NAME);
  spinner.start();
  spinner.color = "green";
  return new Promise((resolve, reject) => {
    (0, _downloadGitRepo.default)("direct:".concat(url), target, {
      clone: true
    }, err => {
      console.log(err);

      if (err) {
        spinner.fail();

        _log.default.error("模板下载失败:(");

        reject(err);
      } else {
        spinner.succeed();

        _log.default.succes("模板下载完毕:)");

        resolve(target);
      }
    });
  });
};

exports.default = _default;