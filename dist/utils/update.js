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
      var spinner = (0, _ora.default)("\u66F4\u65B0picasso-cli\u4E2D");
      var status = '';

      switch (dwTypes) {
        case "npm":
          spinner.start();
          status = (0, _child_process.spawn)("npm.cmd", ["install", "picasso-cli", "-g"]);
          break;

        case "cnpm":
          spinner.start();
          status = (0, _child_process.spawn)("cnpm.cmd", ["install", "picasso-cli", "-g"]);
          break;

        case "yarn":
          spinner.start();
          status = (0, _child_process.spawn)("yarn.cmd", ["add", "picasso-cli", "-g"]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy91cGRhdGUudHMiXSwibmFtZXMiOlsiY2hlY2tWZXJzaW9uIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzcGlubmVyIiwic3RhcnQiLCJvbmxpbmVWZXJzaW9uIiwibG9jYWxWZXJzaW9uIiwicmVxdWlyZSIsInZlcnNpb24iLCJzdWNjZWVkIiwibG9nIiwiaW5mbyIsIm9ubGluZVZlcnNpb25BcnIiLCJzcGxpdCIsImxvY2FsVmVyc2lvbkFyciIsImlzTmV3Iiwic29tZSIsIml0ZW0iLCJpbmRleCIsIk51bWJlciIsInVwZGF0ZUNsaSIsInByb21wdEFyciIsIlVQREFURVBST01QVCIsImR3VHlwZXMiLCJpbnF1aXJlciIsInByb21wdCIsInN0YXR1cyIsInN0ZG91dCIsIm9uIiwiZGF0YSIsImNvbnNvbGUiLCJ0b1N0cmluZyIsInN1Y2NlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVPLElBQU1BLFlBQVksR0FBRyxNQUFNO0FBQ2hDLFNBQU8sSUFBSUMsT0FBSjtBQUFBO0FBQUE7QUFBQSxpQ0FBWSxXQUFPQyxPQUFQLEVBQWdCQyxNQUFoQixFQUEyQjtBQUM1QyxVQUFNQyxPQUFPLEdBQUcsMkVBQWhCO0FBQ0FBLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUjtBQUNBLFVBQU1DLGFBQWEsU0FBUyw0QkFBYyxhQUFkLENBQTVCOztBQUNBLFVBQU1DLFlBQVksR0FBR0MsT0FBTyxDQUFDLG9CQUFELENBQVAsQ0FBOEJDLE9BQW5EOztBQUNBTCxNQUFBQSxPQUFPLENBQUNNLE9BQVI7O0FBQ0FDLG1CQUFJQyxJQUFKLG1DQUFnQkwsWUFBaEIsdUNBQXFDRCxhQUFyQzs7QUFDQSxVQUFNTyxnQkFBZ0IsR0FBR1AsYUFBYSxDQUFDUSxLQUFkLENBQW9CLEdBQXBCLENBQXpCO0FBQ0EsVUFBTUMsZUFBZSxHQUFHUixZQUFZLENBQUNPLEtBQWIsQ0FBbUIsR0FBbkIsQ0FBeEI7QUFDQSxVQUFNRSxLQUFLLEdBQUdILGdCQUFnQixDQUFDSSxJQUFqQixDQUFzQixDQUFDQyxJQUFELEVBQU9DLEtBQVAsS0FBaUI7QUFDbkQsZUFBT0MsTUFBTSxDQUFDRixJQUFELENBQU4sR0FBZUUsTUFBTSxDQUFDTCxlQUFlLENBQUNJLEtBQUQsQ0FBaEIsQ0FBNUI7QUFDRCxPQUZhLENBQWQ7QUFHQWpCLE1BQUFBLE9BQU8sQ0FBQ2MsS0FBRCxDQUFQO0FBQ0QsS0FiTTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFQO0FBY0QsQ0FmTTtBQWlCUDs7Ozs7OztBQUdPLElBQU1LLFNBQVMsR0FBRyxNQUFNO0FBQzdCLFNBQU8sSUFBSXBCLE9BQUo7QUFBQTtBQUFBO0FBQUEsa0NBQVksV0FBTUMsT0FBTixFQUFpQjtBQUNsQyxVQUFNb0IsU0FBUyxHQUFHQyx1QkFBbEI7QUFDQSxVQUFJO0FBQUVDLFFBQUFBO0FBQUYsZ0JBQW9CQyxrQkFBU0MsTUFBVCxDQUFnQkosU0FBaEIsQ0FBeEI7QUFDQSxVQUFNbEIsT0FBTyxHQUFHLGtEQUFoQjtBQUNBLFVBQUl1QixNQUFVLEdBQUcsRUFBakI7O0FBQ0EsY0FBUUgsT0FBUjtBQUNFLGFBQUssS0FBTDtBQUNFcEIsVUFBQUEsT0FBTyxDQUFDQyxLQUFSO0FBQ0FzQixVQUFBQSxNQUFNLEdBQUcsMEJBQU0sU0FBTixFQUFpQixDQUFDLFNBQUQsRUFBWSxhQUFaLEVBQTJCLElBQTNCLENBQWpCLENBQVQ7QUFDQTs7QUFDRixhQUFLLE1BQUw7QUFDRXZCLFVBQUFBLE9BQU8sQ0FBQ0MsS0FBUjtBQUNBc0IsVUFBQUEsTUFBTSxHQUFHLDBCQUFNLFVBQU4sRUFBa0IsQ0FBQyxTQUFELEVBQVksYUFBWixFQUEyQixJQUEzQixDQUFsQixDQUFUO0FBQ0E7O0FBQ0YsYUFBSyxNQUFMO0FBQ0V2QixVQUFBQSxPQUFPLENBQUNDLEtBQVI7QUFDQXNCLFVBQUFBLE1BQU0sR0FBRywwQkFBTSxVQUFOLEVBQWtCLENBQUMsS0FBRCxFQUFRLGFBQVIsRUFBdUIsSUFBdkIsQ0FBbEIsQ0FBVDtBQUNBO0FBWko7O0FBY0FBLE1BQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxFQUFkLENBQWlCLE1BQWpCLEVBQTBCQyxJQUFELElBQWM7QUFDckNDLFFBQUFBLE9BQU8sQ0FBQ3BCLEdBQVIsQ0FBWW1CLElBQUksQ0FBQ0UsUUFBTCxFQUFaO0FBQ0QsT0FGRDtBQUdBTCxNQUFBQSxNQUFNLENBQUNFLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLE1BQU07QUFDdkJ6QixRQUFBQSxPQUFPLENBQUNNLE9BQVI7O0FBQ0FDLHFCQUFJc0IsTUFBSixDQUFXLE1BQVg7O0FBQ0EvQixRQUFBQSxPQUFPO0FBQ1IsT0FKRDtBQUtELEtBM0JNOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQVA7QUE0QkQsQ0E3Qk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbGF0ZXN0VmVyc2lvbiBmcm9tIFwibGF0ZXN0LXZlcnNpb25cIjtcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGlucXVpcmVyIGZyb20gJ2lucXVpcmVyJztcbmltcG9ydCBvcmEgZnJvbSBcIm9yYVwiO1xuaW1wb3J0IHsgc3Bhd24gfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgVVBEQVRFUFJPTVBUIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3QgY2hlY2tWZXJzaW9uID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHNwaW5uZXIgPSBvcmEoYOajgOafpeeJiOacrOaYr+WQpuacgOaWsC4uLi4uLmApO1xuICAgIHNwaW5uZXIuc3RhcnQoKTtcbiAgICBjb25zdCBvbmxpbmVWZXJzaW9uID0gYXdhaXQgbGF0ZXN0VmVyc2lvbihcInBpY2Fzc28tY2xpXCIpO1xuICAgIGNvbnN0IGxvY2FsVmVyc2lvbiA9IHJlcXVpcmUoXCIuLi8uLi9wYWNrYWdlLmpzb25cIikudmVyc2lvbjtcbiAgICBzcGlubmVyLnN1Y2NlZWQoKTtcbiAgICBsb2cuaW5mbyhg5pys5Zyw54mI5pysJHtsb2NhbFZlcnNpb259LCDmnIDmlrDniYjmnKwke29ubGluZVZlcnNpb259YCk7XG4gICAgY29uc3Qgb25saW5lVmVyc2lvbkFyciA9IG9ubGluZVZlcnNpb24uc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGxvY2FsVmVyc2lvbkFyciA9IGxvY2FsVmVyc2lvbi5zcGxpdChcIi5cIik7XG4gICAgY29uc3QgaXNOZXcgPSBvbmxpbmVWZXJzaW9uQXJyLnNvbWUoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gTnVtYmVyKGl0ZW0pID4gTnVtYmVyKGxvY2FsVmVyc2lvbkFycltpbmRleF0pO1xuICAgIH0pO1xuICAgIHJlc29sdmUoaXNOZXcpO1xuICB9KTtcbn1cblxuLyoqXG4gKiDmm7TmlrDohJrmiYvmnrZcbiAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUNsaSA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgIGNvbnN0IHByb21wdEFyciA9IFVQREFURVBST01QVDtcbiAgICBsZXQgeyBkd1R5cGVzIH0gPSBhd2FpdCBpbnF1aXJlci5wcm9tcHQocHJvbXB0QXJyKTtcbiAgICBjb25zdCBzcGlubmVyID0gb3JhKGDmm7TmlrBwaWNhc3NvLWNsaeS4rWApO1xuICAgIGxldCBzdGF0dXM6YW55ID0gJyc7XG4gICAgc3dpdGNoIChkd1R5cGVzKSB7XG4gICAgICBjYXNlIFwibnBtXCI6XG4gICAgICAgIHNwaW5uZXIuc3RhcnQoKTtcbiAgICAgICAgc3RhdHVzID0gc3Bhd24oXCJucG0uY21kXCIsIFtcImluc3RhbGxcIiwgXCJwaWNhc3NvLWNsaVwiLCBcIi1nXCJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY25wbVwiOlxuICAgICAgICBzcGlubmVyLnN0YXJ0KCk7XG4gICAgICAgIHN0YXR1cyA9IHNwYXduKFwiY25wbS5jbWRcIiwgW1wiaW5zdGFsbFwiLCBcInBpY2Fzc28tY2xpXCIsIFwiLWdcIl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ5YXJuXCI6XG4gICAgICAgIHNwaW5uZXIuc3RhcnQoKTtcbiAgICAgICAgc3RhdHVzID0gc3Bhd24oXCJ5YXJuLmNtZFwiLCBbXCJhZGRcIiwgXCJwaWNhc3NvLWNsaVwiLCBcIi1nXCJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHN0YXR1cy5zdGRvdXQub24oXCJkYXRhXCIsIChkYXRhOmFueSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKTtcbiAgICB9KTtcbiAgICBzdGF0dXMub24oXCJjbG9zZVwiLCAoKSA9PiB7XG4gICAgICBzcGlubmVyLnN1Y2NlZWQoKTtcbiAgICAgIGxvZy5zdWNjZXMoXCLmm7TmlrDmiJDlip9cIilcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfSk7XG59Il19