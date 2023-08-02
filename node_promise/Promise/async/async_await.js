/*
---------------------------------------------------------------
async / await  在 EMCA7中的新语法,是基于promise的语法糖
---------------------------------------------------------------
使用方式：
    // 定义异步函数
    async function f(){
      // 执行一个promise, 返回了结果. 这里的 response 相当于
      // 是 Promise 之后的 then 接收到的结果了,而不再需要使用
      // .then 来进行后续的处理
      const response = await fetch("https://....")
    }
    f(); // 得到的是一个promise对象
---------------------------------------------------------------
说明:
  1、使用了await之后，程序可以进行其他的任务，例如，进行点击操作
    更新界面等。并不会需要等待程序执行完成，js底层基于事件循环机制
    实现。
  2、不可再普通的函数前面使用await,要想在异步函数中使用await修饰
    一个函数，这个函数需要先在外部被定义成一个异步的函数。
  3、在一些旧版本的浏览器中不支持的async / await 语法，也可以使用
    打包工具转译成相同功能的代码
*/
// fetch 函数返回一个promise 对象，可以直接使用await 对这个对象进行处理
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    return response.json(); // 返回一个promise
  })
  .then((json) => {
    console.log(json);
  });
// =======================================================================
// 这里使用 async/await 语法糖来操作的时候 ======>>
// =======================================================================
// 这里相当于使用了then得到了结果
let result = await fetch("http://localhost:8080/restful/articles/10");
// json() 返回的也是一个Promise 对象，可以直接使用await 来处理
let json = await result.json();
console.log(json);

// --------------------------------------------------------------
// 使用 await时候的几个陷阱
// 1、多个 await 并行使用的时候并不会并发执行, 需要使用await统一管理才可以
// async function f(){
//    // 这样的写法任务会逐个等待之后再执行
//    const a = await fetch("https://.../port/1")
//    const a = await fetch("https://.../port/2")
//    ......
// }
// -------------------
async function allAwait() {
  const promiseA = fetch("https://.../port/1");
  const promiseB = fetch("https://.../port/2");
  const [a, b] = await Promise.all([promiseA, promiseB]);
}
allAwait();

// ----------------------------------------------------------------------
// 需要在循环中使用异步编程的时候，不能使用foreach, map 这类高阶的函数的，
// 尽管写了await, 这些个函数都不会等待异步函数的执行，而是立即返回
// 需要使用传统的 for 循环。
// ----------------------------------------------------------------------
// async function f(){
//    [1,2,3].forEach(async(i) => {
//      await someAsyncOperation();
//    });
//    console.log("done");
// }
//
// f();
//
async function forAwait() {
  for (let i of [1, 2, 4]) {
    await someAsyncOperation(i);
  }
  console.log("done");
}

async function someAsyncOperation(i) {
  console.log(i);
  fetch("https://....");
}

// ---------------------------------------------------
// 也可以使用 for await 方式
async function asyncFor() {
  const promises = [
    someAsyncOperation(1),
    someAsyncOperation(2),
    someAsyncOperation(3),
    someAsyncOperation(4),
  ];
  for await (let result of promises) {
    console.log(result);
    // ...
  }
  console.log("done");
}
