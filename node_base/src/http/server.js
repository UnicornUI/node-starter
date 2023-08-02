import { log } from "../../logconfig.js";

import http from "http";

/**
 * -----------------------------------------------------
 *  使用 http 模块构建服务端程序
 * -----------------------------
 *
 */

const server = http.createServer((request, response) => {
	log.debug(request);
	// 获取请求的 url
	log.debug(request.url);

	response.writeHead(200, {
		// 返回json 格式的数据
		//"content-type": "application/json;charset=utf-8;",
		// 默认的类型
		// "content-type": "text/html",
		"content-type": "text/plain", // 返回的html 文本不会被解析渲染
		// 允许跨域
		"Access-Control-Allow-Origin": "*",
	});
	// 服务器响应客户端的数据
	response.write("<div> hello </div>");
	// 响应完成之后于需要将流关闭，否则会一直阻塞，客户端得不到响应
	response.end();
});

server.listen(8080, () => {
	console.log("localhost:8080");
});
