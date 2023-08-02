import url from "url";
import { log } from "../../logconfig.js";

let urlstr = "https://registry.npm.taobao.org/local?keyword=gulp";

//   字符串解析出来一个 Url 对象
//   ----------------------------------------
//    1. url.parse(string)
//   ----------------------
log.debug(url.parse(urlstr));

const urlObj = {
  protocol: "https:",
  slashes: true,
  auth: null,
  host: "registry.npm.taobao.org",
  port: null,
  hostname: "registry.npm.taobao.org",
  hash: null,
  search: "?keyword=gulp",
  query: "keyword=gulp",
  pathname: "/",
  path: "/?keyword=gulp",
  href: "https://registry.npm.taobao.org/local?keyword=gulp",
};

//   Url 对象转换为一个url字符串
//   ----------------------------------------
//    2. url.format(Object)
//   ----------------------
log.debug(url.format(urlObj));

// 将查询的条件转换为一个map
const params = new URLSearchParams(urlObj.search);
// log.debug(params);
// log.debug(params.get("keyword"));

const query = new URLSearchParams(urlObj.query);
log.debug(query.get("keyword"));
log.debug(query);

log.debug(urlObj.hostname);
log.debug(urlObj.protocol);

//  Url 解析
//  ------------------------------------------
//  url.resolve(url: string, operation: string)
//  ------------------------------------------
//   operation：
//     1、以单词开始 => 从当前url 路径开始拼接
//     2、以`/` 开始，从根目录看是替换
// --------------------------------------------
let a = url.resolve("/one/two/three", "four/five");
log.debug(a);
let e = url.resolve("/one/two/three/", "four/five");
log.debug(e);
let o = url.resolve("/one/two/three", "/four/five");
log.debug(o);
let b = url.resolve("http://example.com/search", "/one");
log.debug(b);
let p = url.resolve("http://example.com/search/", "/one");
log.debug(p);

// -------------------------------------------------------------------------
// 可以通过 ulrStr 字符串来构建  URL 对象
// ------------------------------------------

let gitUrl = new URL("https://github.com/ancion/LuaVim/search?q=scoop");
log.debug(gitUrl);

let search = new URLSearchParams(gitUrl.searchParams);
log.debug(search);
log.debug(search.get("q"));

// 添加新的数据，删除数据
search.append("a", "b");
log.debug(search);
search.delete("a");
log.debug(search);
