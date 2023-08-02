/**
 *                   |==> resolve -|   |-- value -|
 * Promise<Prendind> |             |-->|          |--(fulfilled)
 *                   |==> reject  -|   |-- error -|
 */
new Promise((resolve, reject) => {
  // 这两个通知事件分别与后面两个回调函数对应
  reject("失败了");
  // resolve("操作成功");
  // 每调用一个then,相当于给微任务队列中添加了一个任务。
})
  .then(
    (value) => {
      console.log("success logic");
    },
    (reason) => {
      console.log("failure logic");
    }
  )
  .then(
    (value) => {
      console.log("success");
    },
    (reason) => {
      console.log("failure");
    }
  );