/**
 * 当我们在上一个Promise.then()中返回一个新的Promise 对象，
 * 主线上的下一个 then 会接收到这个Promise 的通知并开始处理
 * -----------------------------------------------------
 */
let promise = new Promise((resolve, reject) => {
  // 发送一个成功的通知，这个成功的回调函数会执行
  resolve();
})
  .then(
    (value) => {
      // 这个promise 需要返回，只有返回了这个promise, 下一个then 才能接收到这个通知
      // 并开始处理，如果这里没有返回，哪个下面一个then 的处理依旧是针对的原来的
      // promise.then() 产生的promise, 而不是在里面构架的 promise.
      return new Promise((resolve, reject) => {
        console.log("return a new promise");
        resolve("second layer");
      });
    },
    (error) => {
      return new Promise((resolve, reject) => {
        reject("second error");
      });
    }
  )
  .then(
    (value) => {
      console.log("receive: " + value);
    },
    (error) => {
      console.log("receive: " + value);
    }
  );

/*
  -----------------------------------------------------
当我们在上一个Promise中返回一个Promise, 但是这个promise 是一个已经被then
处理之后的promise, 这时候，外层Promise中下一个.then 收到的是内部返回
  .then处理之后新生成的Promise 对象
  */
let pro = new Promise((resolve, reject) => {
  resolve("first level");
})
  .then(
    async (value) => {
      const val = await new Promise((resolve, reject) => {
        resolve("return level");
      });
      console.log("return: ", val);
      return val;
    },
    (error) => {
      return error;
    }
  )
  .then(
    (val) => {
      console.log("val: ", val);
    },
    (err) => {
      console.log(err);
    }
  );
