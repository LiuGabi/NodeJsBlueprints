## 第二章 使用Node.js和Express开发一个基础网站

### 重点

* 了解Express
* 安装Express
* 管理路由
* 处理动态URLs和HTML表单
* 返回响应
* 日志系统

在之前的章节中，我们了解到常见的编程范式以及如何应用到Node.js，在这一章节中，我们将继续使用Express框架。这个框架是最流行以及可得到的框架之一。Express仍然广泛被使用部分开发者将他作为起点。

### 了解Express
Express[(http://expressjs.com/)](http://expressjs.com/)是Node.js专有的一个web框架。它建立在Connect[(http://www.senchalabs.org/connect/)](http://www.senchalabs.org/connect/)之上,这就意味着他是实现中间架构的。在之前的章节中，当我们研究Node.js时，我们会发现这种设计定案的好处：这种框架充当一种系统插件。也就是说，Express不但适合简单的也适合复杂的应用，这是因为的他的架构。我们也许只使用流行中间架构中的几种，或者添加一堆的详情和仍然保持应用模块。

普遍的，Node.js中的大部分项目呈现两种功能：运行监听标准端口的服务器和处理进来的请求。Express是一个包装器，对于这两种功能。如下：

```
var http = require("http");
http.createServer(function(req, res) {
	res.writeHead(200, {"Content-type": "text/plain"});
	res.end("Hello World\n");
}).listen(1337, "127.0.0.1");
console.log("Server running at http://127.0.0.1:1337/");
```

这是从Node.js官方文档中摘取下来的例子。如上所示，我们使用本地的http模块并运行在1337端口上的服务。有一个请求处理方法，这个方法简单的发送Hello world字符串到浏览器。现在，让我们相同的功能，使用Express框架，如下：

```
var express = require("express");
var app = express();
app.get("/", function(req, res, next) {
	res.send("Hello World\n");
}).listen(1337);
console.log("Server running at http://127.0.0.1:1337/");
```

这几乎是相同的事情。然而，我们并不需要响应头或者在结尾添加一新行字符串，因为框架已经帮我们做了这样的工作。此外，我们可以得到一大堆的中间架构，这些可以帮助我们更简单的处理请求。Express就像一个工具箱。我们有很多工具来做这些令人厌烦的工作，使我们注意力集中到应用的逻辑和内容上。Express的诞生就是通过提供好的功能为开发者节约时间。
