import fp from "lodash/fp.js";
// --------------------------------------------------
// Either 函子, 用于处理异常或者错误
// --------------------------------------------------

class Left {
  static of(value) {
    return new Left(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this._value;
  }
}

class Right {
  static of(value) {
    return new Right(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return Right.of(fn(this._value));
  }
}

let parseJSON = (str) => {
  try {
    return Right.of(JSON.parse(str));
  } catch (e) {
    return Left.of(e);
  }
};

let r1 = parseJSON({ name: tom });
console.log(r1);
let r2 = parseJSON({ name: "tom" });
console.log(r2);
