import fp from "lodash/fp.js";
import fs from "fs";

// --------------------------------------------------
// IO 函子，将函数赋值给函子中的 value, 等到需要的时候载进行调用，
// --------------------------------------------------
class IO {
  static of(x) {
    return new IO(() => x);
  }
  constructor(fn) {
    this._value = fn;
  }
  map(fn) {
    return new IO(fp.flowRight(fn, this._value));
  }
}

let r = IO.of(process).map((p) => p.execPath);
console.log(r._value());

// --------------------------------------------------
// 这里暴露一个 IO 函子的问题。
// --------------------------------------------------

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
