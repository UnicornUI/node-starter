import express from "express";

import bodyParser from "body-parser";
import { homePage } from "../controller/index.js";
const router = express.Router();

/**
 * ----------------------------------------------------------------------------
 *  router.get() 与 use() 不同, 只有精确匹配的url参会执行, 不会进行多项匹配
 *  也就不会执行多个回调函数
 * ---------------------------
 */

// 分离出来一个controller层面
router.get("/api/list", homePage);

// get 查询数据
router.get("/index", (req, res, next) => {
  let query = req.query;
  res.json(query);
  // res.send(query);
  // res.send("index page");
});

// 提交数据
router.post("/index", (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.send("post response");
});

// 修改数据, 覆盖式修改
router.put("/index", (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.send("put response");
});

// 修改数据, 增量修改
router.patch("/index", (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.send("patch response");
});

// 删除数据
router.delete("/index", (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.send("delete response");
});

// 接收所有类型的请求;
router.all("/home", (req, res, next) => {
  res.send(req.body);
});

export { router };
