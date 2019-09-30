"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _log = _interopRequireDefault(require("./utils/log"));

var _update = require("./utils/update");

var _rc = require("./utils/rc");

var _download = _interopRequireDefault(require("./utils/download"));

var _constants = require("./utils/constants");

var _generator = require("./utils/generator");

var _path = _interopRequireDefault(require("path"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var rm = require("rimraf").sync;

var rootName = _path.default.basename(process.cwd());
/**
 * 初始化
 * @param projectName 项目名称
 */


var init =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (projectName) {
    try {
      var isUpdate = yield (0, _update.checkVersion)();
      if (isUpdate) yield (0, _update.updateCli)();
      isAlreadyName(projectName); // init 后面是否已输入项目名称
    } catch (error) {
      _log.default.error("\u521B\u5EFA\u5931\u8D25\uFF1A".concat(error));
    }
  });

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}(); // 主流程


exports.init = init;

function initTodo(_x2) {
  return _initTodo.apply(this, arguments);
}

function _initTodo() {
  _initTodo = _asyncToGenerator(function* (projectName) {
    try {
      // 项目是否存在
      var isAllready = yield checkDir(projectName);

      if (isAllready) {
        makeDir(projectName);
        var {
          git
        } = yield selectTemplate(); // 模板选择

        var templateName = yield (0, _download.default)(rootName, git); // 模板下载

        var customizePrompt = yield getCustomizePrompt(templateName, _constants.CONSTTYPE.CUSTOMIZE_PROMPT); // 获取脚手架模板中的配置文件

        yield render(projectName, templateName, customizePrompt); // 渲染模板

        deleteCusomizePrompt(projectName); // 删除无用的文件
      }
    } catch (error) {
      _log.default.error("\u521B\u5EFA\u5931\u8D25\uFF1A".concat(error));

      if (projectName) {
        rm(projectName);
        rm(_constants.CONSTTYPE.TEMPLATE_NAME);
      }
    }
  });
  return _initTodo.apply(this, arguments);
}

function isAlreadyName(projectName) {
  if (projectName) {
    initTodo(projectName);
    return;
  }

  _inquirer.default.prompt([{
    name: 'projectName',
    message: 'Please enter the project name: ',
    validate: val => {
      if (!val) {
        return '不能为空！';
      }

      return true;
    }
  }]).then(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(function* (answer) {
      var {
        projectName
      } = answer;
      initTodo(projectName);
    });

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }());
} // 删除模板配置文件


function deleteCusomizePrompt(target) {
  // 自定义选项模板路径
  var cusomizePrompt = _path.default.join(process.cwd(), target, _constants.CONSTTYPE.CUSTOMIZE_PROMPT);

  if (_fs.default.existsSync(cusomizePrompt)) {
    rm(cusomizePrompt);
  } // 忽略文档路径


  var fileIgnore = _path.default.join(process.cwd(), target, _constants.CONSTTYPE.FILE_IGNORE);

  if (_fs.default.existsSync(fileIgnore)) {
    rm(fileIgnore);
  }
} // 渲染模板


function render(projectRoot, templateName, customizePrompt) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(function* (resolve, reject) {
      try {
        var context = {
          name: projectRoot,
          // 项目文件名
          root: projectRoot,
          // 项目文件路径
          downloadTemp: templateName // 模板位置

        }; // 获取默认配置

        var promptArr = (0, _constants.DEFAULTPROMPT)(context); // 添加模板自定义配置

        promptArr.push(...customizePrompt);
        var answer = yield _inquirer.default.prompt(promptArr);
        var generatorParam = {
          metadata: _objectSpread({}, answer),
          src: context.downloadTemp,
          dest: context.root
        };
        yield (0, _generator.generator)(generatorParam);
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    return function (_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }());
} // 检查是否已存在


function checkDir(projectName) {
  return new Promise((resolve, reject) => {
    if (!_fs.default.existsSync(projectName)) {
      resolve(true);
    } else {
      _log.default.error("\u521B\u5EFA\u5931\u8D25\uFF1A\u9879\u76EE".concat(projectName, "\u5DF2\u7ECF\u5B58\u5728"));

      resolve(false);
    }
  });
} // 创建路径


function makeDir(projectName) {
  if (projectName !== ".") {
    _fs.default.mkdirSync(projectName);
  }
} // 选择模板


function selectTemplate() {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(function* (resolve, reject) {
      try {
        var configObj = yield (0, _rc.getAll)();
        var choices = Object.values(configObj).map(item => {
          return {
            name: item.name,
            value: item.value
          };
        });
        var config = {
          type: "list",
          message: "请选择创建项目类型",
          name: "select",
          choices: [new _inquirer.default.Separator("模板类型"), ...choices]
        };

        _inquirer.default.prompt(config).then(data => {
          var {
            select
          } = data;
          var {
            git
          } = configObj[select];
          resolve({
            git
          });
        });
      } catch (error) {
        console.log(error);
      }
    });

    return function (_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }());
} // 获取配置文件


function getCustomizePrompt(target, fileName) {
  return new Promise(resolve => {
    var filePath = _path.default.join(process.cwd(), target, fileName);

    if (_fs.default.existsSync(filePath)) {
      _log.default.succes('读取模板配置文件');

      var file = require(filePath);

      resolve(file);
    } else {
      _log.default.warn('该模板没有配置文件');

      resolve([]);
    }
  });
}