/**
 * promise 本身支持的错误检测与处理
 * ------------------------------------------------
 *  promise 本身已经具有了try ... catch () {} 的机制
 *  不管是程序运行时抛出的异常或者程序主动抛出的错误
 *  都要会被 catch 捕获到.
 * ------------------------------------------------
 * finally{} 语句块在链式调用过程，无论执行成功还是
 * 失败都会执行
 */
new Promise((resolve, reject) => {
  // reject("faulire");
  resolve("hello");
})
  .then(
    (value) => {
      console.log(value);
      return new Promise((resolve, reject) => {
        reject("err");
      });
    }
    // -------------------------------------------------------
    // 1. 原本这里应该是要一个错误的通知的，为了程序的可读性，
    // 我们可以将这个过程统一放在最后面catch 中进行处理.
    // ----------------
    // 2. catch 也可以出现在中间位置，这样它就只能处理之前的
    // 错误.
    // ----------------
    // 3. 当我们需要对某个错误进行特殊处理的时候, 可以针对这个
    // promise, 进行错误回调的复写，这样就不会再被 catch 捕获到
    // ----------------
    // 4. promise 本身是有try catch() {} 机制的，系统运行时的
    // 错误与程序主动抛出的错误都会被捕获到。
    // -------------------------------------------------------
    // (error) => {
    //   console.log(error);
    // }
  )
  .then(
    (val) => {
      console.log("val: ", val);
    },
    (e) => {
      console.log("e: ", e);
    }
  )
  .catch((err) => {
    console.log("err: ", err);
  });

/**
 * 自定义错误处理
 * --------------------------------
 */
