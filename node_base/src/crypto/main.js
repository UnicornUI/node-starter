import crypto from "crypto";

const passward = "local@12138";

const hash = crypto.createHash("sha1").update(passward, "utf8").digest("hex");

console.log(hash);
