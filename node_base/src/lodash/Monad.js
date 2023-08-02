import fp from "lodash/fp.js";
import fs from "fs";

// --------------------------------------------------
// IO 函子，将函数赋值给函子中的 value, 等到需要的时候载进行调用，
// --------------------------------------------------
class IO {
  static of(x) {
    return new IO(() => x);
  }
  // 展开函子
  join() {
    return this._value();
  }
  constructor(fn) {
    this._value = fn;
  }
  map(fn) {
    return new IO(fp.flowRight(fn, this._value));
  }
  // 已经展开的Map
  // 当外部组合函数的时候，
  // --------------------------------------------------
  // 组合的函数返回的是值就调用map
  // 组合的函数返回的是一个函子就调用flatMap
  flatMap(fn) {
    return this.map(fn).join();
  }
}

// 模仿 cat  命令
function readFile(fileName) {
  return new IO(() => {
    return fs.readFileSync(fileName, "utf-8");
  });
}

function print(x) {
  return new IO(() => {
    console.log(x);
    return x;
  });
}

// 函数可能会嵌套后调用的时候会出现这样的多个`_value()` 调用
let cat = fp.flowRight(print, readFile);
let result = cat("../../package.json")._value()._value();
console.log(result);

// --------------------------------------------------
// 使用Monad 函子扁平化处理
let result2 = readFile("../../package.json")
  .map(fp.toUpper)
  .flatMap(print)
  .join();
console.log(result2);
