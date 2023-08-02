/*
-------------------------------------------------------------------
系统中的一些其他的对象也有可能被 封装成 Promise 对象来处理,原理就是：
不管返回的是对象还是类等，会检查原型中是否有then(res,rej)这样的方法
如果有.就使用这个方法。
-------------------------------------------------------------------
*/
let pro = new Promise((resolve, reject) => {
  resolve("fulfilled");
})
  .then(
    (value) => {
      // 返回一个对象，这个对象内部有一个 then 方法， 并由两个回调函数作为参数
      // 这时候，内部会将各个对象封装为 Promise
      console.log(value);
      return {
        then(resolve, reject) {
          resolve("这是对象");
        },
      };
    },
    (reason) => {}
  )
  .then(
    (val) => {
      console.log(val);
    },
    (err) => {
      console.log(err);
    }
  );
/* ----------------------------------------------------------------
使用类封装为 Promise 来返回
-------------------------------------------------------------------
*/
let cpro = new Promise((resolve, reject) => {
  resolve("fulfilled");
})
  .then(
    (value) => {
      // 返回一个对象，这个对象内部有一个 then 方法， 并由两个回调函数作为参数
      // 这时候，内部会将各个对象封装为 Promise
      console.log(value);
      class ClassPromise {
        then(resolve, reject) {
          resolve("这是类");
        }
      }
      return new ClassPromise();
    },
    (reason) => {}
  )
  .then(
    (val) => {
      console.log(val);
    },
    (err) => {
      console.log(err);
    }
  );
// -------------------------------------------------------------------
// 使用静态方法来处理
// -------------------------------------------------------------------
let spro = new Promise((resolve, reject) => {
  resolve("fulfilled");
})
  .then(
    (val) => {
      return class {
        static then(resolve, reject) {
          resolve(这是静态方法);
        }
      };
    },
    (err) => {}
  )
  .then(
    (val) => {
      console.log(val);
    },
    (err) => {
      console.log(err);
    }
  );
