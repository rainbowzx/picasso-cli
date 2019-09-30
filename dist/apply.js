"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = void 0;

// 主流程控制
var apply = function apply(action) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  // 获取命令执行
  require("./".concat(action))[action](...args);
};

exports.apply = apply;