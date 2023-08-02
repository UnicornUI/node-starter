import { log } from "../../logconfig.js";
import http from "http";

import qs from "querystring";

const postData = qs.stringify({
  province: "shanghai",
  city: "shanghai",
  district: "baoshan",
  latitude: "29.53453",
  longitude: "140.35353",
  message: "find a fish",
  contact: "13666669999",
  typt: "sell",
  time: 15712126751,
});

const options = {
  protocal: "http:",
  hostname: "localhost",
  method: "POST",
  port: 8848,
  path: "/index",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(postData),
  },
};

// ----------------------------------------------------------
// 接收一个请求, 并在这个服务中访问另一个服务。
// ----------------------------------------------------------
let server = http.createServer((req, res) => {
  let data = "";
  const request = http
    .request(options, (result) => {
      // 请求返回的结果：
      result.on("data", (chunk) => {
        data += chunk;
      });
      result.on("end", () => {
        console.log(data);
        res.end(JSON.stringify({ status: 200, content: data }));
      });
      result.on("error", (err) => {
        log.debug(err.message);
      });
    })
    .on("error", (err) => {
      log.debug(err.message);
    });
  request.write(postData);
  // 请求结束
  request.end();
});

server.listen("8080", () => {
  console.log("localhost:8080");
});
