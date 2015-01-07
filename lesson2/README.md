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

### 安装Express

有两种方式来安装Express。我们先从简单的开始，然后继续到更先进的技术。简单方法产生的模板，我们也许使用这个模板开始直接写业务逻辑。同样的情况，这可以节约我们的时间。来自其他的观点，如果我们正在开发一个惯见的应用，我们需要用常见的设置。我们也可以使用模板，我们用先进的技术获取模板；这也许并不为我们工作。

#### 使用package.json

Express和其他模块一样。它在包得注册中有它自己的位置。如果我们想使用它，我们需要在package.json中添加框架。Node.js的生态系统是建立在Node Package Manager之上。它使用JSON文件找出我们所需要的，以及在当前目录安装它。因此我们的package.json文件内容看起来像下面的代码：

```
{
	"name": "projectname",
	"description": "description",
	"version": "0.0.1",
	"dependencies": {
		"express": "3.x"
	}
}
```

这些都是必须添加的。更精确的说，我们必须强调强制性的区域是name和version。然而，添加依赖和我们模块会好些，特别是如果我们想要在注册处发布我们工作，这些信息都是相当的重要。否则，其他的开发者将不知道我们的库正在做什么。当然，有一大堆的其他的区域，例如贡献者，关键字，或者开发依赖，我们将坚持有限的选项，因此我们聚焦在Express。
一旦我们有放置在项目文件夹里面的package.json文件，我们必须在可控制台调用npm install。通过这样，包管理器将创建一个node_modules文件夹以及存放Express和他的依赖。如下：

!["Express"](img/test1.png)

第三行像我们展示的是版本号，接下来的几行是Express所依赖的模块。现在，我们准备实验Express。如果我们打出require(“express”)，Node.js将开始寻找在本地node_modules目录里的库。因为我们不使用绝对路径，这是通常的习惯。如果我们没有运行npm install 命令行，我们将被Error: Cannot find module ‘express’提醒。

#### 使用命令行工具

有一个命令行工具被称为express-generator。一旦我们运行npm install -g express-generator，我们将安装它，并如同其他的命令行在我们的终端使用它。










