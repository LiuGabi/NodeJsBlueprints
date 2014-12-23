## Node.js fundamentals

### 重点

* Node.js基础
* 在modules中组织代码逻辑
* 理解跨模块沟通
* 异步编程
* 探索中间件架构
* 组成与继承
* 管理依赖

### Node.js基础

Node.js是单线程技术。这就意味着每次请求都是但是单线程处理。在其他语言中，例如Java和Web服务每次请求都会实例化一个新的线程。然而，这也意味着Node.js使用异步处理，其中有一个原理，使它单线程工作带来友好呈现。单线程应用的问题是I/O运行阻塞；例如， 当我们需要从硬盘上读取文件响应客户端时。 一旦一次新的请求登录服务器，我们就会打开文件并读取，那么问题就会发生在另一个随机的请求上，应用仍然在第一个请求上进行。让我们用下面的例子来阐明这个问题：

```
var http = require("http");

var getTime = function() {
	var d = new Date();
	return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" +d.getMilliseconds();
};
var respond = function(res, str) {
	res.writeHead(200, {"Content-Type":"text/plain"});
	res.end(str +"\n");
	console.log(str + " " + getTime());
};
var handleRequest = function(req, res) {
	if (req.url === "/favicon.ico") {
		return;
	}
	console.log("new request: " + req.url + "  - " + getTime());

	if (req.url == "/immediately") {
		respond(res, "A");
	} else {
		var now = new Date().getTime();
		while(new Date().getTime() < now + 5000) {
			// synchronous reading of the file
		}
		respond(res, "B");
	}

};

http.createServer(handleRequest).listen(88, "127.0.0.1");
```

第一行初始化的http模块是用来运行web服务。getTime方法以字符串形式返回当前时间，respond方法向客户端浏览器发送简单的文本来报告进来的请求已经被处理。最有趣的方法是handleRequest，这是逻辑的入口点。创建一个为期5秒的while循环来模拟读取大文件。一旦运行服务，我们将能够作出HTTP请求到http://localhost:88。为演示单线程行为我们将同时发送两条行为。如下请求：

- 探索中间件架构
- 组成与继承
- 管理依赖
