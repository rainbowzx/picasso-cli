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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHBseS50cyJdLCJuYW1lcyI6WyJhcHBseSIsImFjdGlvbiIsImFyZ3MiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDTyxJQUFNQSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFDQyxNQUFELEVBQXVDO0FBQUEsb0NBQW5CQyxJQUFtQjtBQUFuQkEsSUFBQUEsSUFBbUI7QUFBQTs7QUFDeEQ7QUFDQUMsRUFBQUEsT0FBTyxhQUFNRixNQUFOLEVBQVAsQ0FBd0JBLE1BQXhCLEVBQXdDLEdBQUdDLElBQTNDO0FBQ0gsQ0FITSIsInNvdXJjZXNDb250ZW50IjpbIi8vIOS4u+a1geeoi+aOp+WItlxuZXhwb3J0IGNvbnN0IGFwcGx5ID0gKGFjdGlvbjogU3RyaW5nLCAuLi5hcmdzOiBTdHJpbmdbXSkgPT4ge1xuICAgIC8vIOiOt+WPluWRveS7pOaJp+ihjFxuICAgIHJlcXVpcmUoYC4vJHthY3Rpb259YClbKGFjdGlvbiBhcyBhbnkpXSguLi5hcmdzKTtcbn0iXX0=