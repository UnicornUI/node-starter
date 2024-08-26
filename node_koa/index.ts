import Koa, { type ExtendableContext }  from "koa";
import fs from "fs";
import path from "path";

console.log("Hello via Bun!");
const server = new Koa()
server.use(async (ctx: ExtendableContext ) => {
  console.log(ctx.request, ctx.response);
  if (ctx.request.url == "/") {
    ctx.response.set("content-type", "text/html");
    const content = await fs.promises.readFile(path.resolve(__dirname, "app/index.html"))
    ctx.response.status = 200;
    ctx.response.body = content.toString();
  }
  if (ctx.request.url === "/main.js") {
    ctx.response.set("content-type", "text/javascript");
    const content = await fs.promises.readFile(path.resolve(__dirname, "app/main.js"))
    ctx.response.status = 200;
    ctx.response.body = content.toString();
  }
  if (ctx.request.url === "/App.vue") {
    // vue 文件经过文本替换, ast 抽象语法分析，最终解析为 js 文件
    //
    ctx.response.set("content-type", "text/plain");
    const content = await fs.promises.readFile(path.resolve(__dirname, "app/App.vue"))
    ctx.response.status = 200;
    ctx.response.body = content.toString();
  }
})
server.listen(9000, () => {
  console.log(`Server start at : http://localhost:9000`)
});


