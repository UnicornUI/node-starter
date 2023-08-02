// ----------------------------------------------------------------
// 1、 Promise.then() 返回的还是一个 Promise对象，这时候
// ----------------------------------------------------------------
let p1 = new Promise((resolve, reject) => {
  resolve();
});
let p2 = p1.then(
  (value) => {},
  (error) => {}
);
// 这时候p1, p2 都是一个 promise 对象，并且 p1 是完成态的 promise,
// P2 是准备态的promise,当前主线程执行完成之后才开始执行这个promise
// ----------------------------------------------------------------
console.log(p1);
console.log(p2);
// 由于微任务 是在宏任务之前执行，执行这个回调(宏任务)的时候, 两个
// promise 的微任务都已经执行完成了。p1 p2 都是完成态 promise
// -----------------------------------------------------------------
setTimeout(() => {
  console.log(p1);
  console.log(p2);
});
// -----------------------------------------------------------------
// 2、生成的Promise 对象默认执行的都是成功通知的回调函数
// -----------------------------------------------------------------
let promise = new Promise((resolve, reject) => {
  //resolve("success");
  reject("error");
})
  .then(
    (value) => {
      console.log(value);
    },
    (error) => {
      console.log(error);
      return "pipe line";
    }
  )
  .then(
    // 默认由 Promise.then 生成的Promise 对象执行的是成功的通知
    // 尽管上面一个promise 执行的是 reject 通知。
    (value) => {
      console.log(value);
      console.log("成功");
    },
    (error) => {
      console.log("失败");
    }
  );
