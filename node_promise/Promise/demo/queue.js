/**
 * ---------------------------------------------------------------
 *  基于Promise 的队列原理，每一个任务都返回一个Promise, 依赖于上
 *  一个Promise 状态的改变。
 * ---------------------------------------------------------------
 */

let promise = Promise.resolve("hello");

promise = promise.then((value) => {
  return new Promise((resolve, reject) => {
    console.log(value);
    setTimeout(() => {
      resolve("world");
    }, 2000);
  });
});

promise = promise.then((value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(value);
      resolve("!!");
    }, 2000);
  });
});

promise = promise.then((value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(value);
      resolve("ok");
    }, 100);
  });
});

// ......
//------------------------------------------------------------------------
// 多个 promise 任务按照队列的顺序来执行, 下一个任务依赖上一个任务的通知
// 这样可以用来控制执行的先后顺序。

function queue(tasks) {
  let promise = Promise.resolve();
  tasks.map((e) => {
    // 要将本次执行的Promise生成的Promise 对象保存起来作为下一个Promise
    // 生成的起点，如此循环往复，直至最后一个任务完成。
    promise = promise.then((_) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(e);
          resolve();
        }, 1000);
      });
    });
  });
  // 任务生成生成是在异步执行的，这里的输出是在主线程中，最先输出
  console.log("end");
}

queue([1, 2, 3, 4, 5]);

//------------------------------------------------------------------------
// 任务1
function task1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("task1");
      resolve();
    }, 5000);
  });
}
// 任务2
function task2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("task2");
      resolve();
    }, 1000);
  });
}

// 将传入的任务按照顺序执行
function queueTask(tasks) {
  let promise = Promise.resolve();
  tasks.map((e) => {
    promise = promise.then((_) => {
      return e();
    });
  });
}

queueTask([task1, task2]);

/*
 * ===========================================================================
 *  基于 reduce 来实现 Promise 队列
 * --------------------------------
 */
function reduceQueue(tasks) {
  tasks.reduce((promise, n) => {
    return promise.then((_) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(n);
          resolve();
        }, 1000);
      });
    });
  }, Promise.resolve());
}

reduceQueue(["a", "b", "c", "d", "f", "g"]);
