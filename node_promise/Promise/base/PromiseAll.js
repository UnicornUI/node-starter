import { ajax } from "../js/ajax.js";

let first = new Promise((resolve, reject) => {
  resolve("first");
});

let second = new Promise((resolve, reject) => {
  // resolve("second");
  reject("second failure");
})
  // 当我们在某个Promise 中处理了自己可能发生的错误，这时候
  // 返回的是处理之后新生成的Promise, 默认是成功回调，不会
  // 被 all() 异常处理捕获到，执行成功回调
  .then(null, (err) => {
    console.log(err);
  });

// 当一系列的 Promise 全部交给到 Promise.all() 方法的时候，
// 当所有的Promise 成功的时候，这时候成功回调才会执行，
// 只要有一个失败了，失败的回调函数就会执行。
Promise.all([first, second])
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.log(err);
  });

/*
 * ------------------------------------------------------------
 *  有了这个 all() api, 说明一些应用, 将数组中的数据在后台请求
 *  一组结果回来
 * ------------------------------------------------------------
 * */

const articles = [2, 3, 4, 5, 6].map((id) => {
  return ajax(`http://localhost:8080/restful/articles/${id}`);
});

Promise.all(articles)
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.log("request failure");
    console.log(err);
  });
