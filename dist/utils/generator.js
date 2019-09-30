"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generator = void 0;

var _Metalsmith = _interopRequireDefault(require("Metalsmith"));

var _ejs = _interopRequireDefault(require("ejs"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _minimatch = _interopRequireDefault(require("minimatch"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rm = require("rimraf").sync;

var generator = config => {
  var {
    metadata,
    src,
    dest
  } = config;

  if (!src) {
    return Promise.reject(new Error("\u65E0\u6548\u7684source\uFF1A".concat(src)));
  } // 官方模板


  return new Promise((resolve, reject) => {
    var metalsmith = (0, _Metalsmith.default)(process.cwd()).metadata(metadata).clean(false).source(src).destination(dest);

    var ignoreFile = _path.default.resolve(process.cwd(), src, _constants.CONSTTYPE.FILE_IGNORE);

    if (_fs.default.existsSync(ignoreFile)) {
      // 定义一个用于移除模板中被忽略文件的metalsmith插件
      metalsmith.use((files, metalsmith, done) => {
        var meta = metalsmith.metadata(); // 先对ignore文件进行渲染，然后按行切割ignore文件的内容，拿到被忽略清单

        var ignores = _ejs.default.render(_fs.default.readFileSync(ignoreFile).toString(), meta).split("\n").filter(item => !!item.length);

        Object.keys(files).forEach(fileName => {
          // 移除被忽略的文件
          ignores.forEach(ignorePattern => {
            if ((0, _minimatch.default)(fileName, ignorePattern)) {
              delete files[fileName];
            }
          });
        });
        done();
      });
    }

    metalsmith.use((files, metalsmith, done) => {
      var meta = metalsmith.metadata(); // 编译模板

      Object.keys(files).forEach(fileName => {
        try {
          var t = files[fileName].contents.toString();

          if (/(<%.*%>)/g.test(t)) {
            files[fileName].contents = Buffer.from(_ejs.default.render(t, meta));
          }
        } catch (err) {
          console.log("fileName------------", fileName);
          console.log("er -------------", err);
        }
      });
      done();
    }).build(err => {
      rm(src);
      err ? reject(err) : resolve();
    });
  });
};

exports.generator = generator;