"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = void 0;

var _constants = require("./utils/constants");

var _chalk = _interopRequireDefault(require("chalk"));

var _commander = _interopRequireDefault(require("commander"));

var _apply = require("./apply");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = process.argv.slice(2); // 显示所有的命令和提示

Object.keys(_constants.ACTIONMAP).forEach(action => {
  _commander.default.command(action).description(_constants.ACTIONMAP[action].description).alias(_constants.ACTIONMAP[action].alias).action(() => {
    switch (action) {
      case 'init':
        (0, _apply.apply)(action, ...process.argv.slice(3));
        break;

      case 'config':
        (0, _apply.apply)(action, ...process.argv.slice(3));
        break;

      default:
        break;
    }
  });
}); // 显示帮助信息

var help = () => {
  console.log(_chalk.default.green('\r\nUsage:'));
  Object.keys(_constants.ACTIONMAP).forEach(action => {
    _constants.ACTIONMAP[action].usages.forEach(usage => {
      console.log(_chalk.default.green('  - ' + usage));
    });
  });
  console.log('\r');
}; // 改变输出文字颜色


exports.help = help;

function make_green(txt) {
  return _chalk.default.green(txt);
}

_commander.default.version(_constants.VERSION, '-v, --version').usage('<command> [options]').on('-h', help).on('--help', help).parse(process.argv); // pcs 不带参数时或不正确的参数


if (!argv.length || !_constants.ACTIONMAP[argv[0]]) {
  _commander.default.outputHelp(make_green);
}