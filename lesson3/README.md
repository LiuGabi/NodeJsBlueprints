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

### 选择和初始化数据库
### 使用Angular开发客户端
### 实现控制面板