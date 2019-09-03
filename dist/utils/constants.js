"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONSTTYPE = exports.UPDATEPROMPT = exports.DEFAULTPROMPT = exports.ANSWERLIST = exports.ACTIONMAP = exports.RC = exports.VERSION = void 0;

var _package = require("../../package.json");

//当前package.json的版本号
var VERSION = _package.version; // 用户的根目录

exports.VERSION = VERSION;
var HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']; // 配置文件目录

var RC = "".concat(HOME, "/.pcsrc");
/**
 * pcs commands
 *    - init
 */

exports.RC = RC;
var ACTIONMAP = {
  init: {
    description: 'generate a new project from a template',
    usages: ['pcs init | pcs init projectName']
  },
  config: {
    description: 'config .pcsrc',
    usages: ['pcs config', 'pcs config set', 'pcs config get <k>', 'pcs config remove <k>']
  } // 项目配置交互列表

};
exports.ACTIONMAP = ACTIONMAP;

function isSpace(val) {
  if (!val || val.match(/\s/g)) {
    return '请不要输入空格且不能为空！';
  }

  return true;
}

function isNull(val) {
  if (!val) {
    return '不能为空！';
  }

  return true;
}

var ANSWERLIST = [{
  name: 'name',
  message: '请输入项目展示名称',
  default: 'xxx脚手架',
  validate: isNull
}, {
  name: 'value',
  message: '请输入项目名称',
  default: 'vue',
  validate: isSpace
}, {
  name: 'git',
  message: '请输入项目git地址',
  default: 'https://github.com/xxxx/xxx.git',
  validate: isNull
}]; // 脚手架默认配置

exports.ANSWERLIST = ANSWERLIST;

var DEFAULTPROMPT = context => {
  return [{
    name: 'projectName',
    message: '项目的名称',
    default: context.name,
    validate: isNull
  }, {
    name: 'projectVersion',
    message: '项目的版本号',
    default: '1.0.0'
  }, {
    name: 'projectDescription',
    message: '项目的简介',
    default: "A project named ".concat(context.name)
  }];
};

exports.DEFAULTPROMPT = DEFAULTPROMPT;
var UPDATEPROMPT = [{
  type: 'list',
  message: '请选择更新npm的方法',
  name: 'npmType',
  choices: [{
    name: "npm",
    message: 'npm'
  }, {
    name: 'cnpm',
    message: 'cnpm'
  }, {
    name: 'yarn',
    message: 'yarn'
  }]
}];
exports.UPDATEPROMPT = UPDATEPROMPT;
var CONSTTYPE = {
  TEMPLATE_NAME: "./download-temp",
  CUSTOMIZE_PROMPT: "promptConfig.js",
  FILE_IGNORE: ".fileignore"
};
exports.CONSTTYPE = CONSTTYPE;