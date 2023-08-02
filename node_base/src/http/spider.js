import { log } from "../../logconfig.js";
import http from "http";
import https from "https";
import cheerio from "cheerio";

const server = http.createServer((req, res) => {
  let data = "";
  https.get("https://www.meizu.com", (result) => {
    result.on("data", (chunk) => {
      data += chunk;
    });
    result.on("end", () => {
      log.debug(data);
      filerData(data);
    });
    result.on("error", (err) => {
      log.debug(err);
    });
  });
});

server.listen(8080, () => {
  log.debug("localhost:8080");
});

function filerData(data) {
  // 对数据筛洗
  let $ = cheerio.load(data);
  $(`.section-item-box p`).each((i, e) => {
    log.debug($(e).text());
  });
}
