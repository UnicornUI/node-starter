import { log } from "../../../../logconfig.js";
import fs from "fs";
import mime from "mime";
import path from "path";

function readStaticFile(res, filePath) {
  let ext = path.parse(filePath).ext;
  let fileType = mime.getType(ext) || "text/html";
  if (fs.existsSync(filePath)) {
    if (fileType) {
      fs.readFile(filePath, (err, cont) => {
        if (err) {
          res.writeHead(400, {
            "content-type": "text/plain",
          });
          res.write("404 - NOT FOUND");
        } else {
          res.writeHead(200, {
            "content-type": `${fileType}`,
          });
          res.write(cont);
        }
        res.end();
      });
      // 返回的是 true 表示, 客户端想要的是静态文件
      return "successful";
    } else {
      // 返回 false 表示用户请求的不是静态文件
      return "failure";
    }
  } else {
    return "file not exists";
  }
}

export { readStaticFile };
