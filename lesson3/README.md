## 第三章 使用Node.js和AngularJS开发一个博客应用

### 重点

* 研究 AngularJS
* 选择和初始化数据库
* 使用Angular开发客户端
* 实现控制面板

在这一章节中，我们将用Node.js和AngularJS建立一个博客应用。我们的系统支持添加、编辑和删除，因此需要一个控制面板。MangoDB或者MySQL数据库将处理信息的存储，Express框架将用作网站的基础。这将传递JavaScript、css、HTML 到客户端，并提供一个API访问数据库。我们将使用Angular来建立用户界面以及客户端管理页面逻辑。

这章覆盖如下的话题：

+ AngularJS 基础
+ 选择和初始化数据库
+ 用 AngularJS实现应用的客户端部分

### 研究 AngularJS

AngularJS是Google开发的一个开源客户端JavaScript框架。它很有特点，具备官方文档。它几乎变成了单页面应用开发中的标准。Angular官方网站，[http://angular.org](http://angular.org)，提供友好构建文献。由于这个框架被广泛的使用，所以这方面的资料和教程很多。作为JavaScript的一个库，它和Node.js的合作关系非常好。在这一节里，我们将用控制面板建立一个简单地博客。

在我们开始开发项目之前，先看一看框架。在页面上，Angular能非常好的控制整个数据。我们不需要考虑DOM选择元素，以及值的填充。幸运的是，由于可以数据绑定，我们能再JavaScript部分更新数据，并在HTML部分看到改变。这也适用于反响。一旦我们在HTML中改变某些东西，我们就会在JavaScript中得到新的值。这个框架有很强大的依赖注册。预定义类是为了呈现AJAX请求和路由管理。

你可以读 Mastering Web Development  width AngularJS by Peter Bacon Darwin and Pawel Kozlowski, published by Packt Publishing.

#### 引导 AnguarJS 应用

引导AngularJS应用需要添加ng-app属性到HTML标签上。重要的是选择正确的一个。有ng-app的地方将意味着所有的子节点将被框架处理。把属性放在HTML标签上是很常见的做法。代码如下：

```
<html ng-app>
	<head>
		<script src="angular.min.js"></script>
	</head>
	<body>
		...
	</body>
</html>
```

往往，我们应用一个值到属性上。这个将是一个模块名。开发博客面板的同时我们将会做这个。放置ng-app的地方是很自由的，这就意味着我们能够决定我们的哪一块标记将被AngularJS控制。这样非常好，因为如果有大量的HTML文件，我们不想花费资源解析整个文档。当然，我们可以手动引导我们的逻辑，当在页面上有多余一个AngularJS应用的时候这就被需要。

#### 使用指令和控制器

在AngularJS中，我们可以实现Model-View-Controller模式。控制器充当数据（model）和用户（view）之间的纽带。在框架上下文中，控制器是简单地方法。例如，下面的HTML代码描述的是一个控制器的简单方法：

```
<html ng-app>
	<head>
		<script src="angular.min.js"></script>
		<script src="HeaderController.js"></script>
	</head>
	<body>
		<header ng-controller="HeaderController">
			<h1>{{title}}}</h1>
		</header>
	</body>
</html>
```

在<head>所在页面，我们添加压缩版的库和HeaderController.js；一个将控制控制器的文件。我们也在HTML标签上设置一个ng-controller属性。控制器定义如下：

```
function HeaderController ($scope) {
	$scope.title = "Hello world";
}
```

每一个控制器作用域。那个区域称之为scope。在我们的案例中，HeaderController定义（title）变量。AngularJS有一个很精彩的依赖注入系统。幸运的是，因为这个机制，$scope变量是自动初始化并传递到我们的方法。ng-controller属性被指令调用，他就是，一个属性，对AngularJS有意义的属性。我们有很多指令可以用。也许那就是框架中最好的一个之一。我们可以在模块里面直接实现复杂的逻辑，例如，数据绑定、过滤或者模块化。

#### 数据绑定

数据绑定是一个自定更新视图一旦模块更新的过程。由于很早就提过，我可以在应用部分JavaScript改变一个变量，随即HTML部分将自动更新。我们不需要创建一个引用DOM元素或附加事件监听器。所有事情都被框架处理。继续阐述前面的例子，如下：

```
<html ng-app>
	<head>
		<script src="angular.min.js"></script>
	</head>
	<body>
		<header ng-controller="HeaderController">
			<h1>{{title}}</h1>
			<a href="#" ng-click="updateTitle()">change title</a>
		</header>
	</body>
</html>
```

一个链接被添加，它包含ng-click指令。updateTitle方法是一个定义在控制里面的方法，如下：

```
function HeaderController($scope) {
	$scope.title = "Hello world";
	$scope.updateTitle = function() {
		$scope.title = "That's a new title.";
	}
}
```

我们不关心DOM元素以及{{title}}变量在哪。我们只需改变$scope属性和每件事的工作。当然我们有input域和我们想绑定他们的值。如果在这种情况，ng-model指令可以被应用。如下：

```
<header ng-controller="HeaderController">
	<h1>{{title}}</h1>
	<a href="#" ng-click="updateTitle()">change title</a>
	<input type="text" ng-model="title" /> 
</header>
```

在输入字段里面的被绑定到相同的标题变量。这次，我们不需要编辑控制器。AngularJS自动改变h1标签的内容。

#### 使用模块封装逻辑

使用控制器是非常棒的一件事。然而把所有事情都放在全局定义的方法里并不是一个好的实践。这几是为什么使用模块系统比较好。如下是模块的定义：

```
angular.module('HeaderModule', []);
```

第一个参数是模块的名字，第二个参数是一个数组，这个数组保存模块的依赖。通过依赖，我的意思是其他的模块、服务、或者常用的其他东西，这些我们可以在模块内部使用的。同样需要被设置为ng-app指令的一个值。如下：

```
angular.module('HeaderModule', [])
.controller('HeaderController', function($scope) {
	$scope.title = "Hello world";
	$scope.updateTitle = function() {
		$scope.title = "That's a new title.";
	}
});
```

因此，第一行定义了一个模块。我们可以将模块中不同的方法和其中的控制器方法连接起来。接下来将我们的代码放到模块里面，我们将封装逻辑。这是一个很好的建筑标志。当然，使用模块，我们能获得不同的功能，例如过滤器、指令、常用的服务等。

#### 使用过滤准备数据

当我们想要准备我们的数据，先要被呈现给用户，这时候过滤器会很方便。比方说，例如，当标题的长度超过20字符，我们更需要关注标题在大写的的情况：

```
angular.module('HeaderModele', [])
.filter('customuppercase', function() {
	return function(input) {
		if (input.length > 20) {
			return input.toUpperCase();
		} else {
			return input;
		}
	}
})
.controller('HeaderController', function($scope) {
	$scope.title = "Hello world";
	$scope.updateTitle = function() {
		$scope.title = "That's a new title.";
	}
});
```

这是一个常用的“customuppercase”过滤器的定义。过滤器接收输入内容和呈现简单的check。他所返回的就是用户最终所看的内容。以下就是滤镜被如何使用在Html中：

```
<h1>{{title | customuppercase}}</h1>
```

当然，我们可能为一个变量添加更多的过滤器。有一些提前定义好的过滤器来限制长度，例如JavaScript到Json的转换，或者例如数据的格式化。

#### 依赖注入

有时候依赖管理是非常困难的。我们也许把所有事情分割到不同的模块或组件当中。他们有已经写好的APIS和文档。然而，不久，我们也许意识到了我们需要创建大量的对像。通过提供我们所需要的的依赖注入正解决了这个问题。我们已经在行为当中看到了这些。$scope参数传递到我们的控制器，事实是被Angular的injector创建的。作为依赖获取一些东西，我们需要在某处定义它并让框架知道他。如下：

```
angular.module('HeaderModele', [])
.factory("Data", function() {
	getTitle: function() {
		return "A better title.";
	}
})
.controller('HeaderController', function($scope, Data) {
	$scope.title = Data.getTitle();
	$scope.updateTitle = function() {
		$scope.title = "That's a new title.";
	}
});
```

Module类有一个factory方法。他注册一个新的服务，可以作为一个依赖之后用到。这个方法返回一个含有一个getTitle的方法的对象。当然服务的名字应该和控制器的参数名字匹配。否则AngularJS不能找到依赖源。

#### AngularJS上下文模型

在众所周知的 Model-View-Controller 模式中，model就是应用中存储数据的部分。AngularJS没有标准的流程来定义模型。$scope变量可以被认为是一个模型。我们保持数据附加到当前的作用域属性。之后，我们可以使用ng-model指令侦测和绑定属性到DOM节点。在之前的章节中我们已经知道这个如何工作。框架也许不提供常用的模型表单，但是我们可以写我们自己的实现。事实上，AngularJS使用普通的JavaScript对象工作，使得这个任务更容易可行。

#### AngularJS总结

AngularJS是框架领导者之一，不仅因为它是由谷歌制造的，而是因为他的灵活性。我们可以只使用一小块或者使用巨型收纳框来构建稳固架构。

#### 选择和初始化数据库

建立一个博客应用，我们需要一个数据库来存储发布的文章。在大部分情况下数据库的选择依赖于当前的项目。有性能和扩展性等因素，我们需要把它们牢记于心。为了有更好的可能解决方案，我们将看看两个最流行的数据库：MongoDB和MySQL。第一个是NoSQL类型数据库之一。

换句话说，他比一个SQL数据库简单，往往存储数据用Key值类型。往往存储和处理大量数据时这些方案都会被采用。这同样是很流行的方式当我们需要灵活的架构或者我们想要使JSON。这真的取决于我们正在建设什么样的系统。在某些情况，MySQL是一个很好的选择，然，在其他情况MongoDB会是更好的选择。在我们的博客案例中，我们将两者都使用。

为了做到这些，我们将需要一个层来连接数据库服务和接受请求。为使事情更有趣点，我们将创建一个模块，这个模块只有一个api，但可以在两个数据库中切换。

#### 使用NoSQL和MongoDB

从MongoDB开始。在我们存储信息之前，我们需要一个MongoDB服务运行。我们不会手动的处理数据库的通信。有一个为Node.js开发的标准驱动。称为mongodb，我们需要将它包含在我们的package.json文件。通过npm install成功安装之后，驱动将在我们的脚本中被得到。如下：

```
"dependencies": {
	"mongodb": "1.3.20"
}
```

我们将坚持Model-View-Controller架构和模型中与数据库操作相关的文章。如下：

```
var crypto = require("crypto"),
	type = "mongodb",
	client = require('mongodb').MongoClient,
	mongodb_host = "127.0.0.1",
	mongodb_port = "27017",
	collection;

module.exports = function() {
	if (type == "mongodb") {
		return {
			add: function(data, callback) {},
			update: function(data, callback) {},
			get: function(callback) {},
			remove: function(id, callback) {}
		}
	} else {
		return {
			add: function(data, callback) {},
			update: function(data, callback) {},
			get: function(callback) {},
			remove: function(id, callback) {}
		}
	}
}
```

他首先定义了几个依赖，以及为MongoDB设置了几个链接。第一行要求加密模块。我们将使用它为每篇文章自动生成唯一的IDS。type变量定义了哪个数据库是当前被访问了的。第三行初始化了MongoDB的驱动。我们将使用它和数据库服务通信。在那之后，我们为这之间的连接和最后的全局变量collection设置了host和port，这将保持一个参考为收集的文章。在MongoDB中，collections类似于MySQL中的tables。下一个逻辑步骤是建立一个数据库链接和执行所需的操作，如下：

```
connection = 'mongodb://';
connection += mongodb_host + ':' + mongodb_port;
connection += '/blog-application';
client.connect(connection, function(err, database) {
	if (err) {
		throw new Error("Can't connect");
	} else {
		console.log("Connection to MongoDB server successful.");
		collection = database.collection('articles');
	}
});
```

我们传递host和port，驱动做了所有其他的事情。当然这是一个很好的实践来处理错误和抛出一个异常。在我们的方案中这个是非常需要的，因为数据库中没有信息前端就没有内容展示。模块的其他部分包含方法，add，edit，retrieve，和delete记录：

```
return {
	add: function(data, callback) {
		var date = new Date();
		data.id = randomBytes(20).toString('hex');
		data.date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
		collection.insert(data, {}, callback || function(){});
	},
	update: function(data, callback) {
		collection.update(
			{ID: data.id},
			data,
			{},
			callback || function(){ }
		);
	},
	get: function(callback) {
		collection.find({}).toArray(callback);
	},
	remove: function(id, callback) {
		collection.findAndModify(
			{ID: id},
			[],
			{},
			{remove: true},
			callback
		);
	}
}
```

add 和 update方法接受data参数。那是个简单的javascript对象。例如，如下：

```
{
	title: "Blog post title",
	text: "Article's text here ..."
}
```

记录被自动生成唯一id识别。update方法需要这个，目的是为了自动找到所需记录来编辑。所有方法都有一个回调。这是非常重要的，因为模块意味着被作为一个黑盒所应用，也就是说，我们需要能够为他创建一个变量，执行数据，最后继续应用其他的逻辑。

#### 使用 MySQL

我们将使用数据库的SQL类型和MySQL。

### 选择和初始化数据库
### 使用Angular开发客户端
### 实现控制面板












