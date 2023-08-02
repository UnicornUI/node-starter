import { log } from "../../../logconfig.js";
import { readStaticFile } from "./util/readFile.js";
import http from "http";
import path from "path";
import url from "url";

http
  .createServer((req, res) => {
    const urlObj = url.parse(req.url);
    let pathName = urlObj.pathname;
    let filePath = path.join(".", "/public/", pathName);
    let result = readStaticFile(res, filePath);
    log.debug(pathName + ":" + result);
  })
  .listen(3000, "localhost", () => {
    log.debug("sever running......");
    log.debug("http://localhost:3000");
  });
