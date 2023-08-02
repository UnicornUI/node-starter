import { log } from "../../logconfig.js";

import ld from "lodash";

import fp from "lodash/fp.js";

// ########################################################
//  函数组合
// ########################################################

const reverse = (arr) => arr.reverse();
const first = (arr) => arr[0];
const toUpper = (str) => str.toUpperCase();

const convertLastToUpper = ld.flowRight(toUpper, first, reverse);

console.log(convertLastToUpper(["a", "z", "b", "c"]));
