import express from "express";
import { router } from "./router/index.js";
import bodyParser from "body-parser";
import ArtTemplate from "express-art-template";
import path from "path";

const app = express();

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parser application/json
app.use(bodyParser.json());

// 配置静态资源中间
app.use(express.static("./public"));

// 设置模板引擎
app.engine("art", ArtTemplate);
app.set("view options", {
  debug: (process.env.NODE_ENV = "production"),
  // 为了当中xxr攻击，字符进行了转码。不需要转码设置为false
  escape: false,
});
app.set("views", path.join("./", "view"));
app.set("view engine", "art");

app.use("/", router);

app.listen(8080, () => {
  console.log("http://localhost:8080");
});

/**
 * -------------------------------------------------------------------
 * express 服务端渲染的template SSR (server side render)
 * -------------------------------------------------------------------
 * - ejs
 * - pug
 * - jade
 * - art-template
 */
