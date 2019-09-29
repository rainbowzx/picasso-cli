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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb3dubG9hZC50cyJdLCJuYW1lcyI6WyJ0YXJnZXQiLCJ1cmwiLCJzcGlubmVyIiwiY29uc29sZSIsImxvZyIsIkNPTlNUVFlQRSIsIlRFTVBMQVRFX05BTUUiLCJwYXRoIiwiam9pbiIsInN0YXJ0IiwiY29sb3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNsb25lIiwiZXJyIiwiZmFpbCIsImVycm9yIiwic3VjY2VlZCIsInN1Y2NlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O2VBQ2UsQ0FBQ0EsTUFBRCxFQUFnQkMsR0FBaEIsS0FBK0I7QUFDNUMsTUFBTUMsT0FBTyxHQUFHLDBHQUFvQkQsR0FBcEIsRUFBaEI7QUFDQUUsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLHFCQUFVQyxhQUF0QjtBQUNBTixFQUFBQSxNQUFNLEdBQUdPLGNBQUtDLElBQUwsQ0FBVUgscUJBQVVDLGFBQXBCLENBQVQ7QUFDQUosRUFBQUEsT0FBTyxDQUFDTyxLQUFSO0FBQ0FQLEVBQUFBLE9BQU8sQ0FBQ1EsS0FBUixHQUFnQixPQUFoQjtBQUNBLFNBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBU0MsTUFBVCxLQUFvQjtBQUNyQyxtREFBbUJaLEdBQW5CLEdBQ0FELE1BREEsRUFDUTtBQUFFYyxNQUFBQSxLQUFLLEVBQUU7QUFBVCxLQURSLEVBQzBCQyxHQUFELElBQWE7QUFDbENaLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZVyxHQUFaOztBQUNGLFVBQUlBLEdBQUosRUFBUztBQUNQYixRQUFBQSxPQUFPLENBQUNjLElBQVI7O0FBQ0FaLHFCQUFJYSxLQUFKLENBQVUsVUFBVjs7QUFDQUosUUFBQUEsTUFBTSxDQUFDRSxHQUFELENBQU47QUFDRCxPQUpELE1BSU87QUFDTGIsUUFBQUEsT0FBTyxDQUFDZ0IsT0FBUjs7QUFDQWQscUJBQUllLE1BQUosQ0FBVyxVQUFYOztBQUNBUCxRQUFBQSxPQUFPLENBQUNaLE1BQUQsQ0FBUDtBQUNEO0FBQ0YsS0FaRDtBQWFELEdBZE0sQ0FBUDtBQWVELEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG93bmxvYWQgZnJvbSBcImRvd25sb2FkLWdpdC1yZXBvXCI7XG5pbXBvcnQgbG9nIGZyb20gJy4uL3V0aWxzL2xvZyc7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IG9yYSBmcm9tIFwib3JhXCJcbmltcG9ydCB7IENPTlNUVFlQRSB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XG5leHBvcnQgZGVmYXVsdCAodGFyZ2V0OnN0cmluZywgdXJsOnN0cmluZykgPT4ge1xuICBjb25zdCBzcGlubmVyID0gb3JhKGDmraPlnKjkuIvovb3pobnnm67mqKHmnb/vvIzmupDlnLDlnYDvvJoke3VybH1gKVxuICBjb25zb2xlLmxvZyhDT05TVFRZUEUuVEVNUExBVEVfTkFNRSk7XG4gIHRhcmdldCA9IHBhdGguam9pbihDT05TVFRZUEUuVEVNUExBVEVfTkFNRSlcbiAgc3Bpbm5lci5zdGFydCgpXG4gIHNwaW5uZXIuY29sb3IgPSBcImdyZWVuXCI7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpID0+IHtcbiAgICBkb3dubG9hZChgZGlyZWN0OiR7dXJsfWAsXG4gICAgdGFyZ2V0LCB7IGNsb25lOiB0cnVlIH0sIChlcnI6YW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHNwaW5uZXIuZmFpbCgpXG4gICAgICAgIGxvZy5lcnJvcihcIuaooeadv+S4i+i9veWksei0pTooXCIpO1xuICAgICAgICByZWplY3QoZXJyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3Bpbm5lci5zdWNjZWVkKClcbiAgICAgICAgbG9nLnN1Y2NlcyhcIuaooeadv+S4i+i9veWujOavlTopXCIpO1xuICAgICAgICByZXNvbHZlKHRhcmdldClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuIl19