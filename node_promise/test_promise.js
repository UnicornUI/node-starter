import fs from "fs";

async function sayHello() {
  await say();
}

console.log("hello main");

async function say() {
  return new Promise((resolve, _) => {
    resolve();
  }).then(() => {
    console.log("say");
  });
}
sayHello();
console.log("end");

async function fetchSome() {
  const article = await fetch("http://localhost:8080/restful/articles/1");
  let json = await article.json();
  console.log(json.resultContent.title);
}

fetchSome();

async function task() {
  const a = await fs.promises.readFile("a.txt", "utf-8");
  console.log(a);
  const b = await fs.promises.readFile("b.txt", "utf-8");
  console.log(b);
  const c = await fs.promises.readFile("c.txt", "utf-8");
  console.log(c);
}
