/**
 * -----------------------------------------------------------------
 *  async / await 语法糖的异常错误的捕捉与处理
 * ---------------------------------------------
 */

async function handler() {
  return new Promise((_, reject) => {
    reject(new Error("Exception handler"));
  });
}

handler().then(
  (value) => {
    console.log(value);
  },
  (error) => {
    console.log(error.message);
  }
);

handler().catch((error) => {
  console.log(error.message);
});

await handler().catch((error) => {
  console.log(error.message);
});

/**
 * -----------------------------------------------
 *  await 可以添加 try.. catch () 处理异常与错误
 * ---------------------------------------------
 *  1、函数内部进行错误捕获与处理
 *  2、函数在调用的时候进行处理
 */

// 函数内部进行错误的处理
async function getData() {
  try {
    await new Promise((resolve, reject) => {
      reject(new Error("error occur"));
    });
  } catch (e) {
    /* handle error */
    console.log(e.message);
  }
  // 捕获异常之后，后续代码可以正常执行
  console.log("end");
}

getData();

async function progress() {
  return new Promise((resolve, reject) => {
    reject(new Error(">> error <<"));
  });
}

// 将异常放在函数调用的时候进行处理
try {
  let result = await progress();
} catch (e) {
  /* handle error */
  console.log(e.message);
}
