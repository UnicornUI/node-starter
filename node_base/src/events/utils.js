import { EventEmitter } from "events";

import fs from "fs";

function search(param) {
  const EE = new EventEmitter();
  const a = fs.createReadStream("./tmp/a.txt", { encoding: "utf8" });

  a.on("data", (chunk) => {
    console.log(chunk);
    if (chunk.match(new RegExp(param))) {
      EE.emit("found");
    } else {
      EE.emit("notfound");
    }
  }).on("error", (err) => {
    EE.emit("error", err);
  });
  // 需要将这个 EventEmitter 返回出去
  // 因为只有这样当我们在调用这个函数的时候
  // 才能获取到这个 EventEmitter 实例，方便进行事件的监听器注册
  return EE;
}

export { search };
