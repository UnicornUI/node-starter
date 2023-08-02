let hd = {
  then(resolve, _) {
    resolve("hello");
  },
};

// 直接使用Promise 将对象封装为一个Promise
Promise.resolve(hd).then((value) => {
  console.log(value);
});

// 失败的处理
Promise.reject("fail")
  .then((value) => console.log(value))
  .catch((err) => {
    console.log(err);
  });

new Promise((resolve, _) => {
  resolve("success");
})
  .then((value) => {
    // 模拟处理过程中的处理失败
    if (value !== "successful") {
      // 可以使用这种方式直接改变通知，
      // 将错误的通知外抛，之后会被异常处理接收到
      return Promise.reject("handle failure");
    }
  })
  .catch((err) => {
    console.log(err);
  });
