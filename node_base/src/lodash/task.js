import fs from "fs";
import fk from "folktale/concurrency/task/index.js";
import fp from "lodash/fp.js";

// 返回读取读取文件的task函子
function readFile(filename) {
  return fk.task((resolver) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) resolver.reject(err);
      resolver.resolve(data);
    });
  });
}

readFile("../../package.json")
  .map(fp.split("\n"))
  .map(fp.find((x) => x.includes("version")))
  .run()
  .listen({
    onRejected: (err) => console.log(err),
    onResolved: (value) => console.log(value),
  });
