import express from "express";

const app = express();

app.listen(8080, () => {
  console.log("localhost:8080");
});

/** ---------------------------------------------------------------------------------
 * use 做路由匹配的时候, 是从上往下的,只要上面有个匹配了, 这个请求就被上面拦截处理了
 * 不会进入到下面匹配到的规则
 * --------------------------
 *  ==> 中间件栈 的形成:
 *  > 匹配的规则的回调函数会放入到一个回调的队列中,当回调中第三个 next(); 方法被执行,
 *  > 那么回调函数队列将会进入到下一个回调函数
 *
 *
 */

/* 
 app.use(
  "/api",
  (req, res, next) => {
    console.log("world");
    next();
  },
  (req, res, next) => {
    console.log("stop");
    next();
  },
  (req, res, next) => {
    console.log("time");
    next();
  }
); 
*/

// 将中间件栈作为数组传入时的执行情况
let middlewares = [
  (req, res, next) => {
    console.log(1);
    next();
  },
  (req, res, next) => {
    console.log(2);
    next();
  },
  (req, res, next) => {
    console.log(3);
    next();
  },
];
app.use("/api", middlewares);

// 前端传递的路径不匹配当前的路径, 回调函数不会进入队列,
// 无论加不加next()不会影响中间件栈的执行()
app.use("/ajax", (req, res, next) => {
  res.send("ajax");
  next();
});

app.use("/", (req, res) => {
  res.send("hello");
});
