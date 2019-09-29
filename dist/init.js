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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbml0LnRzIl0sIm5hbWVzIjpbInJtIiwicmVxdWlyZSIsInN5bmMiLCJyb290TmFtZSIsInBhdGgiLCJiYXNlbmFtZSIsInByb2Nlc3MiLCJjd2QiLCJpbml0IiwicHJvamVjdE5hbWUiLCJpc1VwZGF0ZSIsImlzQWxyZWFkeU5hbWUiLCJlcnJvciIsImxvZyIsImluaXRUb2RvIiwiaXNBbGxyZWFkeSIsImNoZWNrRGlyIiwibWFrZURpciIsImdpdCIsInNlbGVjdFRlbXBsYXRlIiwidGVtcGxhdGVOYW1lIiwiY3VzdG9taXplUHJvbXB0IiwiZ2V0Q3VzdG9taXplUHJvbXB0IiwiQ09OU1RUWVBFIiwiQ1VTVE9NSVpFX1BST01QVCIsInJlbmRlciIsImRlbGV0ZUN1c29taXplUHJvbXB0IiwiVEVNUExBVEVfTkFNRSIsImlucXVpcmVyIiwicHJvbXB0IiwibmFtZSIsIm1lc3NhZ2UiLCJ2YWxpZGF0ZSIsInZhbCIsInRoZW4iLCJhbnN3ZXIiLCJ0YXJnZXQiLCJjdXNvbWl6ZVByb21wdCIsImpvaW4iLCJmcyIsImV4aXN0c1N5bmMiLCJmaWxlSWdub3JlIiwiRklMRV9JR05PUkUiLCJwcm9qZWN0Um9vdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29udGV4dCIsInJvb3QiLCJkb3dubG9hZFRlbXAiLCJwcm9tcHRBcnIiLCJwdXNoIiwiZ2VuZXJhdG9yUGFyYW0iLCJtZXRhZGF0YSIsInNyYyIsImRlc3QiLCJlcnIiLCJta2RpclN5bmMiLCJjb25maWdPYmoiLCJjaG9pY2VzIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwIiwiaXRlbSIsInZhbHVlIiwiY29uZmlnIiwidHlwZSIsIlNlcGFyYXRvciIsImRhdGEiLCJzZWxlY3QiLCJjb25zb2xlIiwiZmlsZU5hbWUiLCJmaWxlUGF0aCIsInN1Y2NlcyIsImZpbGUiLCJ3YXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FB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LE1BQUFBLE9BQU8sQ0FBQyxFQUFELENBQVA7QUFDRDtBQUNGLEdBVk0sQ0FBUDtBQVdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZyBmcm9tICcuL3V0aWxzL2xvZyc7XG5pbXBvcnQgeyBjaGVja1ZlcnNpb24sIHVwZGF0ZUNsaSB9IGZyb20gJy4vdXRpbHMvdXBkYXRlJztcbmltcG9ydCB7IGdldEFsbCB9IGZyb20gJy4vdXRpbHMvcmMnO1xuaW1wb3J0IGRvd2xvYWQgZnJvbSAnLi91dGlscy9kb3dubG9hZCc7XG5pbXBvcnQgeyBDT05TVFRZUEUsIERFRkFVTFRQUk9NUFQgfSBmcm9tICcuL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZW5lcmF0b3IgfSBmcm9tICcuL3V0aWxzL2dlbmVyYXRvcic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBpbnF1aXJlciBmcm9tICdpbnF1aXJlcic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuY29uc3Qgcm0gPSByZXF1aXJlKFwicmltcmFmXCIpLnN5bmM7XG5cbmNvbnN0IHJvb3ROYW1lID0gcGF0aC5iYXNlbmFtZShwcm9jZXNzLmN3ZCgpKTtcblxuLyoqXG4gKiDliJ3lp4vljJZcbiAqIEBwYXJhbSBwcm9qZWN0TmFtZSDpobnnm67lkI3np7BcbiAqL1xuZXhwb3J0IGNvbnN0IGluaXQgPSBhc3luYyAocHJvamVjdE5hbWU6c3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGlzVXBkYXRlID0gYXdhaXQgY2hlY2tWZXJzaW9uKCk7XG4gICAgICBpZihpc1VwZGF0ZSkgYXdhaXQgdXBkYXRlQ2xpKCk7XG4gICAgICBpc0FscmVhZHlOYW1lKHByb2plY3ROYW1lKTsvLyBpbml0IOWQjumdouaYr+WQpuW3sui+k+WFpemhueebruWQjeensFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoYOWIm+W7uuWksei0pe+8miR7ZXJyb3J9YCk7XG4gICAgfVxufVxuXG4vLyDkuLvmtYHnqItcbmFzeW5jIGZ1bmN0aW9uIGluaXRUb2RvIChwcm9qZWN0TmFtZTpzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgICAvLyDpobnnm67mmK/lkKblrZjlnKhcbiAgICAgICAgbGV0IGlzQWxscmVhZHkgPSBhd2FpdCBjaGVja0Rpcihwcm9qZWN0TmFtZSk7XG4gICAgICAgIGlmIChpc0FsbHJlYWR5KSB7XG4gICAgICAgICAgICBtYWtlRGlyKHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHsgZ2l0IH0gPSAoYXdhaXQgc2VsZWN0VGVtcGxhdGUoKSBhcyBhbnkpOyAvLyDmqKHmnb/pgInmi6lcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlTmFtZSA9IChhd2FpdCBkb3dsb2FkKHJvb3ROYW1lLCBnaXQpIGFzIHN0cmluZyk7Ly8g5qih5p2/5LiL6L29XG4gICAgICAgICAgICBjb25zdCBjdXN0b21pemVQcm9tcHQgPSBhd2FpdCBnZXRDdXN0b21pemVQcm9tcHQodGVtcGxhdGVOYW1lLCBDT05TVFRZUEUuQ1VTVE9NSVpFX1BST01QVCk7Ly8g6I635Y+W6ISa5omL5p625qih5p2/5Lit55qE6YWN572u5paH5Lu2XG4gICAgICAgICAgICBhd2FpdCByZW5kZXIocHJvamVjdE5hbWUsIHRlbXBsYXRlTmFtZSwgY3VzdG9taXplUHJvbXB0KTsvLyDmuLLmn5PmqKHmnb9cbiAgICAgICAgICAgIGRlbGV0ZUN1c29taXplUHJvbXB0KHByb2plY3ROYW1lKTsvLyDliKDpmaTml6DnlKjnmoTmlofku7ZcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZy5lcnJvcihg5Yib5bu65aSx6LSl77yaJHtlcnJvcn1gKTtcbiAgICAgICAgaWYocHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIHJtKHByb2plY3ROYW1lKVxuICAgICAgICAgICAgcm0oQ09OU1RUWVBFLlRFTVBMQVRFX05BTUUpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQWxyZWFkeU5hbWUgKHByb2plY3ROYW1lOnN0cmluZykge1xuICAgIGlmIChwcm9qZWN0TmFtZSkge1xuICAgICAgICBpbml0VG9kbyhwcm9qZWN0TmFtZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW5xdWlyZXIucHJvbXB0KFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3Byb2plY3ROYW1lJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgdGhlIHByb2plY3QgbmFtZTogJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsOnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAn5LiN6IO95Li656m677yBJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICBdKS50aGVuKGFzeW5jIChhbnN3ZXI6YW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcHJvamVjdE5hbWUgfSA9ICBhbnN3ZXI7XG4gICAgICAgIGluaXRUb2RvKHByb2plY3ROYW1lKTtcbiAgICB9KTsgIFxufVxuXG4vLyDliKDpmaTmqKHmnb/phY3nva7mlofku7ZcbmZ1bmN0aW9uIGRlbGV0ZUN1c29taXplUHJvbXB0ICh0YXJnZXQ6YW55KSB7XG4gICAgLy8g6Ieq5a6a5LmJ6YCJ6aG55qih5p2/6Lev5b6EXG4gICAgY29uc3QgY3Vzb21pemVQcm9tcHQgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgdGFyZ2V0LCBDT05TVFRZUEUuQ1VTVE9NSVpFX1BST01QVClcbiAgICAgIGlmKGZzLmV4aXN0c1N5bmMoY3Vzb21pemVQcm9tcHQpKSB7IFxuICAgICAgICBybShjdXNvbWl6ZVByb21wdClcbiAgICAgIH1cbiAgICAvLyDlv73nlaXmlofmoaPot6/lvoRcbiAgICBjb25zdCBmaWxlSWdub3JlID0gIHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCB0YXJnZXQsIENPTlNUVFlQRS5GSUxFX0lHTk9SRSlcbiAgICBpZihmcy5leGlzdHNTeW5jKGZpbGVJZ25vcmUpKSB7IFxuICAgICAgcm0oZmlsZUlnbm9yZSlcbiAgICB9XG4gIH1cblxuLy8g5riy5p+T5qih5p2/XG5mdW5jdGlvbiByZW5kZXIocHJvamVjdFJvb3Q6c3RyaW5nICwgdGVtcGxhdGVOYW1lOnN0cmluZywgY3VzdG9taXplUHJvbXB0OmFueSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICBuYW1lOiBwcm9qZWN0Um9vdCwgLy8g6aG555uu5paH5Lu25ZCNXG4gICAgICAgICAgcm9vdDogcHJvamVjdFJvb3QsIC8vIOmhueebruaWh+S7tui3r+W+hFxuICAgICAgICAgIGRvd25sb2FkVGVtcDogdGVtcGxhdGVOYW1lIC8vIOaooeadv+S9jee9rlxuICAgICAgICB9O1xuICAgICAgICAvLyDojrflj5bpu5jorqTphY3nva5cbiAgICAgICAgY29uc3QgcHJvbXB0QXJyID0gREVGQVVMVFBST01QVChjb250ZXh0KTtcbiAgICAgICAgLy8g5re75Yqg5qih5p2/6Ieq5a6a5LmJ6YWN572uXG4gICAgICAgIHByb21wdEFyci5wdXNoKC4uLmN1c3RvbWl6ZVByb21wdCk7XG4gICAgICAgIGxldCBhbnN3ZXIgPSBhd2FpdCBpbnF1aXJlci5wcm9tcHQocHJvbXB0QXJyKTtcbiAgICAgICAgbGV0IGdlbmVyYXRvclBhcmFtID0ge1xuICAgICAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgICAgICAuLi5hbnN3ZXJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNyYzogY29udGV4dC5kb3dubG9hZFRlbXAsXG4gICAgICAgICAgZGVzdDogY29udGV4dC5yb290XG4gICAgICAgIH07XG4gICAgICAgIGF3YWl0IGdlbmVyYXRvcihnZW5lcmF0b3JQYXJhbSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4vLyDmo4Dmn6XmmK/lkKblt7LlrZjlnKhcbmZ1bmN0aW9uIGNoZWNrRGlyIChwcm9qZWN0TmFtZTpzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMocHJvamVjdE5hbWUpKSB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nLmVycm9yKGDliJvlu7rlpLHotKXvvJrpobnnm64ke3Byb2plY3ROYW1lfeW3sue7j+WtmOWcqGApO1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vLyDliJvlu7rot6/lvoRcbmZ1bmN0aW9uIG1ha2VEaXIgKHByb2plY3ROYW1lOnN0cmluZykge1xuICAgIGlmIChwcm9qZWN0TmFtZSAhPT0gXCIuXCIpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKHByb2plY3ROYW1lKTtcbiAgICB9XG59XG5cbi8vIOmAieaLqeaooeadv1xuZnVuY3Rpb24gc2VsZWN0VGVtcGxhdGUgKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29uZmlnT2JqID1hd2FpdCBnZXRBbGwoKTtcbiAgICAgICAgICBjb25zdCBjaG9pY2VzID0gT2JqZWN0LnZhbHVlcyhjb25maWdPYmopLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgICB0eXBlOiBcImxpc3RcIixcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCLor7fpgInmi6nliJvlu7rpobnnm67nsbvlnotcIixcbiAgICAgICAgICAgICAgbmFtZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgICAgY2hvaWNlczogW25ldyBpbnF1aXJlci5TZXBhcmF0b3IoXCLmqKHmnb/nsbvlnotcIiksIC4uLmNob2ljZXNdXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbnF1aXJlci5wcm9tcHQoY29uZmlnIGFzIG9iamVjdCkudGhlbigoZGF0YTphbnkpID0+IHtcbiAgICAgICAgICAgICAgbGV0IHsgc2VsZWN0IH0gPSBkYXRhO1xuICAgICAgICAgICAgICBsZXQgeyBnaXQgfSA9IGNvbmZpZ09ialtzZWxlY3RdO1xuICAgICAgICAgICAgICByZXNvbHZlKHsgZ2l0IH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyDojrflj5bphY3nva7mlofku7ZcbmZ1bmN0aW9uIGdldEN1c3RvbWl6ZVByb21wdCAodGFyZ2V0OnN0cmluZywgZmlsZU5hbWU6c3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlICgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgdGFyZ2V0LCBmaWxlTmFtZSlcbiAgICAgIGlmKGZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICAgIGxvZy5zdWNjZXMoJ+ivu+WPluaooeadv+mFjee9ruaWh+S7ticpO1xuICAgICAgICBsZXQgZmlsZSA9IHJlcXVpcmUoZmlsZVBhdGgpXG4gICAgICAgIHJlc29sdmUoZmlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2cud2Fybign6K+l5qih5p2/5rKh5pyJ6YWN572u5paH5Lu2Jyk7XG4gICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgfVxuICAgIH0pXG4gIH0iXX0=