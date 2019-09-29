"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

var _main = require("./main");

var _rc = require("./utils/rc");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var config =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (action, key) {
    switch (action) {
      case 'get':
        var result = yield (0, _rc.get)(key);
        console.log(result);
        break;

      case 'set':
        (0, _rc.set)();
        break;

      case 'remove':
        (0, _rc.remove)(key);
        break;

      default:
        (0, _main.help)();
        break;
    }
  });

  return function config(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.config = config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcudHMiXSwibmFtZXMiOlsiY29uZmlnIiwiYWN0aW9uIiwia2V5IiwicmVzdWx0IiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOzs7Ozs7QUFFTyxJQUFNQSxNQUFNO0FBQUE7QUFBQTtBQUFBLCtCQUFHLFdBQU9DLE1BQVAsRUFBdUJDLEdBQXZCLEVBQXVDO0FBQ3pELFlBQVFELE1BQVI7QUFDSSxXQUFLLEtBQUw7QUFDSSxZQUFJRSxNQUFNLFNBQVMsYUFBSUQsR0FBSixDQUFuQjtBQUNBRSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsTUFBWjtBQUNBOztBQUNKLFdBQUssS0FBTDtBQUNJO0FBQ0E7O0FBQ0osV0FBSyxRQUFMO0FBQ0ksd0JBQU9ELEdBQVA7QUFDQTs7QUFDSjtBQUNJO0FBQ0E7QUFiUjtBQWVILEdBaEJrQjs7QUFBQSxrQkFBTkYsTUFBTTtBQUFBO0FBQUE7QUFBQSxHQUFaIiwic291cmNlc0NvbnRlbnQiOlsiLy8g566h55CGIC5wY3NyYyDmlofku7YgKOW9k+WJjeeUqOaIt+ebruW9leS4iylcbmltcG9ydCB7IGhlbHAgfSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHsgZ2V0LCBzZXQsIHJlbW92ZSB9IGZyb20gJy4vdXRpbHMvcmMnO1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0gYXN5bmMgKGFjdGlvbjogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2dldCc6XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgZ2V0KGtleSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NldCc6XG4gICAgICAgICAgICBzZXQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgcmVtb3ZlKGtleSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGhlbHAoKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufSJdfQ==