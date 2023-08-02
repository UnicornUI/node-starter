import ld from "lodash";

// ########################################################
// 函数组合使用的时候怎么调试
// ########################################################

// 定义一个日志函数来输出日志，这样就可以将一些中间结果通过日志输出，
// 这样就可以更好的调试, 之后可以将这些日志去掉

const logger = (arg) => {
  console.log(arg);
  return arg;
};

// 追踪记录函数
const trace = ld.curry((tag, value) => {
  console.log(tag, value);
  return value;
});

// _.split()
const split = ld.curry((seperator, str) => ld.split(str, seperator));

// _.toLower()
const map = ld.curry((fn, arr) => ld.map(arr, fn));

// _.join()
const join = ld.curry((seperator, arr) => ld.join(arr, seperator));

// 这里追踪出问题出在toLower()函数中，
//const f = ld.flowRight(join("-"), logger, ld.toLower, logger, split(" "));

// 使用 map() 包裹一下，就可以解决这个问题
// const f = ld.flowRight(join("-"), logger, map(ld.toLower), logger, split(" "));

// 当过程较多时候，就会显得日志混乱，我们传递一个参数记录是哪一步输出的日志
const f = ld.flowRight(
  join("-"),
  trace("map result:"),
  map(ld.toLower),
  trace("split result:"),
  split(" ")
);

console.log(f("NEVER SAY DIE"));
