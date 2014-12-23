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

* 探索中间件架构
* 组成与继承
* 管理依赖

下面的截图是在检测两条url之后从服务器上打印输出的：

!["Print"](img/test1.jpg)

正如我们所看到的，第一条请求在13:57:11:66，响应时间在13:57:16:68，正是5秒之后。然而问题就在于当第一次请求完成之后第二次请求才被注册。这是因为第一次请求时Node.js线程正忙于处理while循环。
当然，Node.js有解决这种I/O运行阻塞的方案。将他们转换成异步运行并接受回调。一旦运行完成，Node.js就移除回调，并通知这项工作已被处理。这种途径的好处就是当在等待获取I/O的结果时，服务器可以处理另外一条请求。处理外部事件并将这些转换成回调调用的实体被称为event循环。event循环充当一个非常好的管理者并且分配任务给不同的工作者。异步从不堵塞，并且只是等待事情的发生，例如一条文件写入成功的通知。
现在，取代同步文件读取方式，我们使用异步代码改变我们的上诉例子。修改过的代码看起来像下面的代码：

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
		setTimeout(function() {
			// reading the file
			respond(res, "B");
		}, 5000);
	}

};
```
第一条请求仍然是在5秒后得到响应结果，然而，第二条请求在第一条请求后立刻发出。

#### 在modules中组织代码逻辑
