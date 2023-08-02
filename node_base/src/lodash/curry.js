import ld from "lodash";

// ################################################################
// 柯里化
// ################################################################

const match = ld.curry((reg, str) => {
  return str.match(reg);
});

// 传递部分参数
const haveSpace = match(/\s+/g);
const haveNumber = match(/\d+/g);

log.debug(haveSpace("hello world"));
log.debug(haveNumber("hello world"));

// 参数可以分为多次传递，当参数传递的个数与函数定义的个数不相同的时候
// 返回一个函数继续接收剩下的参数，直到所有参数都接收到后返回结果。
let add = (a, b, c, d) => {
  return a + b + c + d;
};
let curry = ld.curry(add);
let result = curry(1)(2)(3)(4);
log.debug(result);

//
const filter = ld.curry((func, arr) => {
  return arr.filter(func);
});

const findSpace = filter(haveSpace);
console.log(findSpace(["hello world", "hello", "world"]));

// ################################################################
//  柯里化实现
// ################################################################

function _curry(func) {
  return function curried(...args) {
    // 实际参数的个数 < 形式参数的个数
    if (args.length < func.length) {
      return function () {
        return curried(...[...args, ...arguments]);
      };
    } else {
      return func(...args);
    }
  };
}

let addfunc = _curry(add);
log.debug(addfunc(1)(2)(3)(4));
