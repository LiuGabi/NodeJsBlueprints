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

如果我们要写很多代码，迟早会意识到我们的逻辑应该被分成到不同的模块中。在很多语言中，通过类和包来这么做，或者其他语言标准。然而，在JavaScript中，自身并没有类。所有都是对象，在实践中，对象继承对象。在JavaScript中，有几种方式来完成面向对象实现。可以使用原型继承、文本对象或者回调函数。感激的是，Node.js有标准化的方式来定义模块。这个方式就是通过实现CommonJS达成的，CommonJS是一个指定为JavaScript的生态系统的项目。

因此，你想通过提供有用的api方法来封装你的逻辑。如果你能到达这一刻，那么你绝对是在正确的方向。这是很重要的，也许这就是现如今项目中最具挑战性的方面。分解业务和分配功能的功能的能力不总是简单的任务。往往，这种任务被低估了，但是这是良好架构的关键。如果一个模块包含很多依赖关系，使用不同的数据存储操作，或有几种责任，那么，我们很容易犯错。这样的代码不会测试通过的，并且难以维护。即使我们很小心这两样，但代码仍然难以继承和继续使用。这就是为什么为不同的模块定义不同的功能的好处了。在Node.js中通过exports关键字定义模块，参考于module.exports。

#### 创建一个汽车结构应用

使用简单的例子来阐述这个过程。假设我们要建一个构造汽车的应用。我们需要主模块（car）和其他模块，不同模块管理小车的不同部分（轮子、窗户、门等等）。先从定义小车轮子的模块开始，代码如下：

```
// demo3-wheels.js
var typeOfTires;
exports.init = function(type) {
	typeOfTires = type;
}
exports.info = function() {
	console.log("The car uses " + typeOfTires + " tires.");
}
```

上面的代码是demo3-wheels.js的组成部分。包含两个方法。init方法首先会被调用，设置轮胎的类型。info方法只是简单的输出信息。在主文件demo3-car.js中，我们需要使用已提供的api方法获取一个轮子实例。代码如下：

```
// demo3-car.js
var wheels = require("./demo3-wheels.js");
wheels.init("winter");
wheels.info();
```
当你用node demo3-car.js命令运行上面的代码，你将得到下面的输出：

!["Print"](img/test2.jpg)

因此，你想要向外展现的任何事物都应赋予导出对象。注意，typeOfTires是模块内部变量，只能在demo3-wheels.js起作用，而不是car.js。直接应用对象或方法到接口对象是常见的，如下代码：

```
// demo3-engine.js
var Class = function() {
	// ...
};
Class.prototype = {
	forward: function() {
		console.log("The car is moving forward.");
	},
	backward: function() {
		console.log("The car is moving backward.");
	}
}
module.exports = Class;
```

在JavaScript中，一切都是对象，每一个对象都有一个prototype（原型）属性。prototype就像一个存储器，保存可访问变量和方法。在JavaScript继承当中，prototype被大量使用，这是因为它提供逻辑转移机制。

我们将会理清一下module.exports和exports之间的区别。正如你所看到的，demo3-wheels.js中，我们直接为全局exports接口对象分配了init和info两个方法。事实上，exports是module.exports的一个参照，每一个依附于exports的方法或变量对外界都是可访问的。然而，如果我们直接为export对象分配新对象或者方法时，我们不应该在文件加载requiring进来后期望得到他的访问权。这时应该用module.exports。如下：

```
// demo4-file.js
module.exports.a = 10;
exports.b = 20;
// demo4-app.js
var file = require("./demo4-file");
console.log(file.a, file.b);
```

app.js和file.js，在同一个目录下。如果运行node app.js，将会得到10和20的结果。然而，考虑到在改变demo4-file.js文件将会发生的事情，代码如下：

```
// demo5-file.js
module.exports = { a: 10 };
exports.b = 20;
```
在这个案例中我们将得到10和 undefined 结果。这是因为module.exports被分配了新的对象，而exports仍然指向原来的。

#### 使用汽车发动机

现在讲讲控制汽车模块的的demo6-engine.js。他有向前移动和向后移动的功能。因为逻辑被定义在单独的类中，并且类作为module.exports的值直接被传递，所以是有点不同的。此外，当我们导入一个功能而不是一个对象时，我们的变量应该用关键字new创建。我们将会看到车子使用new关键字如何起作用的，代码如下：

```
// demo6-engine.js
var Engine = require("./demo3-engine");
var e = new Engine();
e.forward();
```

通过所需方法来返回模块，Node.js对其进行缓存。这样做的目的是阻止循环事件的阻塞以及增强呈现。这是同步操作的，如果没有缓存，Node.js将会重复相同的工作。通过一个文件夹的名字调用方法是比较好的，但是应该有一个package.json或者一个index.js文件在目录里面。在Node.js官方文档（http://nodejs.org）中,所有的机制都被很好的描述。需要注意的是，Node.js环境鼓励模块化编程。所有我们所需要的自带实现都在系统中，没必要使用第三方提供的模块。

就像客户端代码，每一个Node.js模块都可以被继承。同样，正如在普通的JavaScript中我们也要写代码，我们可以使用众所周知的继承。如下：

```
// demo6-engine.js
var Engine = require("./demo3-engine");
var e = new Engine();
e.forward();
```

Node.js事件为此提供有用的方法。现在讲讲，当我们想继承demo3-engine.js类和添加API方法在左右两个方向移动。可以像下面的代码一样：

```
// demo7-control.js
var util = require("util");
var Engine = require("./engine.js");
var Class = function() {}
util.inherts(Class, Engine);
Class.prototype.left = function() {
	console.log("The car is moving to left.");
};
Class.prototype.right = function() {
	console.log("The car is moving to right");
};
module.exports = Class;
```

第一行获取一个参考到Node.js自带的utils模块。这个非常有用。第四行就是奇迹的发生。通过条用inherits方法，可以设置Class对象的新属性。记住每个新方法应该使用已经应用的属性。这就是为什么left和right在继承之后才被定义。最后，我们的车将可以在4个方向移动，如下：

```
// demo7-move.js
var Control = require("./demo7-control.js");
var c = new Control();

c.forward();
c.right();
```

### 理解跨模块沟通
### 异步编程
### 探索中间件架构
### 组成与集成
### 管理依赖