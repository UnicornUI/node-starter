import fp from "lodash/fp.js";

// ########################################################
//  FP 模块的测试
// ########################################################

const fn = fp.flowRight(fp.join("-"), fp.map(fp.toLower), fp.split(" "));
console.log(fn("NEVER SAY IDE"));

// ########################################################
// Point Free 模式
// ########################################################

// 非 Point Free 模式
function convertWordSepetator(word) {
  return word.toLowerCase().replace(/\s+/g, "_");
}

let r1 = convertWordSepetator("hello   world");
console.log(r1);

// Point Free 模式
const func = fp.flowRight(fp.replace(/\s+/g, "_"), fp.toLower);

let r2 = func("Hello     World");
console.log(r2);
