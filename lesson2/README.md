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
一旦我们有放置在项目文件夹里面的package.json文件，我们必须在可控制台调用**npm install**。通过这样，包管理器将创建一个node_modules文件夹以及存放Express和他的依赖。如下：

!["Express"](img/test1.png)

第三行像我们展示的是版本号，接下来的几行是Express所依赖的模块。现在，我们准备实验Express。如果我们打出require(“express”)，Node.js将开始寻找在本地node_modules目录里的库。因为我们不使用绝对路径，这是通常的习惯。如果我们没有运行**npm install 命令行，我们将被Error: Cannot find module ‘express’提醒**。

#### 使用命令行工具

有一个命令行工具被称为express-generator。一旦我们运行npm install -g express-generator，我们将安装它，并如同其他的命令行在我们的终端使用它。

如果你在几个项目中使用这个框架，你将会注意到重复的地方。我们甚至可以从一个应用中拷贝粘贴到另一个应用中，这是非常好的。我们也许甚至用我们自己的模板结束，以及常常从那个地方开始。Express的命令行版本做着相同的事情。它接受一些参数并基于它们，它为使用创建骨架。在有些案件中这将会非常的方便，并且将无疑节省时间。让我们看看下面可获取的参数：

+ -h, --help:这意味着输出包信息。
+ -v, --version:这显示Express版本。
+ -e, --ejs:这个参数添加EJS模板引擎支持。一般，我们需要一个库来处理我们的模板。写纯HTML是不现实的。默认引擎被设置为JADE。
+ -h, --hogan:这个参数是Hogan-enabled(另一个模板引擎)。
+ -c, --css:如果我们想使用css预处理器，这个选项将让我们使用LESS(Learner CSS的缩写)或者Stylus。默认是纯CSS。
+ -f, --force: 这个参数强制Express在一个非空目录运行。

让我们尝试用LESS作为一个CSS预处理器生成一个Express应用骨架。我们使用如下的命令：

```
express --css less myapp
```

一个新的myapp文件夹被创建以及文件结构，正如下面所看见的：

!["App"](img/test2.png)

我们仍然需要安装依赖，因此 cd myapp $$ npm install 是必须的。我们现在跳过生成目录的说明，并将进入app.js编辑。从初始化依赖模块开始，如下：

```
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
```

我们的框架是express，path 是一个本地的Node.js模块。中间架构是favicon，logger，cookieParser，和bodyParser。routes和users是客户端模块，被放置在本地项目文件夹中。类似的，就像在Model-View-Controller(MVC)设计模式中，这些事我们应用的控制器。很快，一个app变量被创建；这代表Express库。我们使用这个变量来识别我们的应用。通过设置一些key-value对，这个脚本持续着。下一代码片段定义了我们的视图和默认模板引擎的路径：

```
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
```

这个框架使用set和get方法定义内部属性。事实上，我们可以使用这些方法定义我们自己的变量。如果值是布尔类型，我们可以使用enable和disable重置set和get。如下：

```
app.set(‘color’, ‘red’);
app.set(‘color’); //red
app.enable(‘isAvailable’);
```

接下来的代码添加了中间架构到框架中。如下：

```
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
```

第一个中间件充当应用的favicon。第二行负责在控制台中输出。如果我们删掉它，我们将不能得到来到我们服务器上请求的信息。

json和urlencoded中间件与伴随请求发送的数据相关。我们需要他们是因为他们将信息转换成容易使用的格式。同样，对于cookies也有一个中间件。它填充请求对象，因此我们稍后有权限获得这个数据。生成的app使用LESS作为一个css预处理，我们需要通过设置目录饱含.less.文件来识别它。我们将在第十章讨论LESS，编写灵活的、模块化的CSS，将详细的介绍。终究，我们定义了静态源，这应该通过服务器来传递。这仅仅的几行，我们就已经识别了整个应用。我们也许移除或删掉了一些模块，以及其他的继续起作用。地图文件中定义的两个路由到两个不同的处理器，代码如下：	

app.use('/', routes);
app.use('/users', users);

如果用户试图打开一个不存在的页面，Express仍然通过转发到错误处理来处理这个请求，如下：

```
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
```
这个框架表明了两种类型的错误处理：开发环境和生产服务器。两者的不同在于后者隐藏掉错误的栈迹，栈迹应该只为应用的开发者所见。如我们所见如下的代码：我们正不同地校验env属性的值和处理错误。

```
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
```

最后，app.js文件大哦哦出创建了的Express变量，如下：

```
module.exports = app;
```

运行application，我们需要执行 **node ./bin/www** 这个代码app.js所需要的和开始服务器，通过默认监听3000端口。

```
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('myapp:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
```

process.evn申明提供一个访问定义在当前开发环境的变量的权限。如果没有port的设置，Express使用3000作为值。所需的debug模块使用一个类似的途径来找出它是否有必要在控制台显示信息。

### 路由管理

应用的输入是路由。用户在指定URL访问我们的页面，并且我们必须匹配这个URL到指定的逻辑。在Express上下文中，这可以很容易做到：

```
var controlller = function(req, res, next) {
    res.send("response");
}
app.get("/example/url", controlller);
```

我们甚至有控制整个HTTP的方法，那就是，我们能够捕获POST、PUT或者DELETE。如果我们是想保留一个路径地址而不是应用一个不同的逻辑，那么这个是很方便的。例如：

```
var getUsers = function(req, res, next) {
    // ...
}
var createUser = function(req, res, next) {
    // ...
}
app.get("/users", getUsers);
app.get("/users", createUser);
```

路径仍然相同，/users，但是如果一个POST请求那个连接，应用将会试图创建一个新的用户。否则，如果方法是GET，将会返回所有注册成员列表。有一个方法，app.all，我们可以用它来一次性处理所有的方法。如下：

```
app.all("/", serverHomePage);
```

在Express中，有一些关于路由的趣事。我们也许传递处理很多处理。这就意味着我们可以创建一系列方法都对应到一个URL。例如，我们需要知道用户是否登录，有个模块专为此。我们可以添加另一个验证当前用户和获取变量到请求的对象的方法，如下：

```
var isUserLogged = function(req, res, next) {
    req.userLogged = Validator.isCurrentUserLogged();
    next();
}
var getUser = function(req, res, next) {
    if (req.userLogged) {
        res.send("You are logged in. Hello!");
    } else {
        res.send("Please log in first.");
    }
}
app.get("/user", isUserLogged, getUser);
```

Validator类是一个类，用来检测当前用户session。这个思想是简单地，我们添加另一个处理器，这个处理器充当额外的中间件。呈现所需的行为之后，我们调用next方法，这个方法传递流到下一个处理器，getUser。因为响应和请求对象对于所有中间件是相同的，所以我们有权限访问userLogged变量。这就是使得Express真正灵活的原因。有很多非常详细的可得到的，但他们是自选的。最后，创建一个简单地例子来实现相同的逻辑。

### 处理动态URLs和HTML表单

Express框架也支持动态dynamicURLs。在我们的系统中每个用户都有单独的页面。那些页面的地址看起来如下：

```
/user/45/profile
```

在数据库中，45是用户的唯一编号。对于这种功能使用一种功能是很正常的。我们不能真正为每个用户定义不同的功能。这个问题可以通过以下的语法解决：

```
var getUser = function(req, res, next) {
    res.send("Show user width id = " + req.params.id);
}
app.get("/user/:id/profile", getUser);
```

事实上，路由像正则表达式，里面有变量。之后，这个变量可以在req.params对象中获取。我们可以有一个以上的变量。如下是一个轻量级的单更复杂的例子：

```
var getUser = function(req, res, next) {
    var getId = req.params.id;
    var actionToPerform = req.params.action;
    res.send("User (" + userId +") : " + actionToPerform );
}
app.get("/user/:id/profile/:action", getUser);
```

如果我们打开http://localhost:3000/user/451/profile/edit, 我们会看到User (451) : edit作为一个相应结果。这就是怎样得到好看并有好的URL。

当然，有时候我们需要通过GET或POST传递参数。可能有一个链接像http://localhost:3000/user?action=edit。解析他很简单，我们只需要本地url模块，这个模块有一些有用的功能来解析URLs：

```
var getUser = function(req, res, next) {
    var url = require("url");
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    res.send("User: " + query.action);
}
app.get("/user", getUser);
```

一旦模块解析URL，我们的GET参数被存在.query对象中。POST变量不一样。我们需要新的中间件来处理它。幸运的是，Express有这个，如下：

```
app.use(express.bodyParser());
var getUser = function(req, res, next) {
    res.send("User: " + req.body.action);
}
app.post("/user", getUser);
```

express.bodyParser()中间件用POST数据填充req.body对象。我们必须把HTTP由.get改成 .post或者.all。

如果我们想在Express中读取cookies，我们可以使用cookieParser中间件。类似body解析器，需要被安装和添加到package.json文件。下面的例子就是设置中间件和证明它的用法：

```
var cookieParser = require("cookie-parser");
app.use(cookieParser("optional secret string"));
app.get("/", function(req, res, next) {
    var prop = req.cookies.propName;
});
```

### 返回响应

返回响应
我们的服务接受请求，做着相同的事情，最后，发送响应到客户端浏览器。这可以是HTML,JSON,XML或者二进制数据。正如我们所知，默认情况下Express中的每个中间件接受两个对象，request和response。respond中的方法可以发送和响应客户端。每一个响应必须有一个正确的content type和length。Express指定过程是通过提供功能和来设置HTTP头和发送内容到浏览器。大部分情况我们将使用.send方法，如下：

```
res.send(“simple text”);
```

用硬盘上的文件来响应是很有可能的。如果我们不使用框架，那么我们就需要读取文件，设置当前的HTTP头，以及发送内容。然而，Express提供.sendfile方法，这些方法封装了如下的操作：

```
res.sendfile(__dirname + "/images/photo.jpg");
```

再次，内容类型是自动设置的；这次是基于文件名字的扩展。

当使用用户界面创建websites或者应用时，我们通常需要服务于一个HTML。当然，我们可以在JavaScript中手动写一个，但是他的优点在于使用模板引擎。这就意味着我们都保存到外部文件，引擎都从这里读取标记。用数据填充这些，最后，提供ready-to-show内容。在Express里，整个过程概括为一种方法，.render。然而，为了正确的工作，我们必须指示框架保证使用哪个框架：

```
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
```

说下下面的模板(/views/index.jade)：

```
h1 = title;
p Welcome to #{title}
```

HTML生成看起来如下：

```
<h1>Page title here</h1><p>Welcome to Page title here</p>
```

如果我们传递第三个参数，function，我们将访问已经生成的HTML。然而它不会作为一个响应被发送到浏览器。

### 日志系统

我们已经了解了Express的主要说明。现在就行动起来。接下来的几个页面呈现一个简单地网站，在这里只要用户登录，他们户可以读取。现在开始建立应用。我们开始使用Express命令行工具。通过 npm install -g express-gennerator安装。我们为这个例子创建了一个新的文件夹，通过终端导航，以及执行 express --css less site。一个新的目录site将会被创建。如果我们运行npm install，Exprss就会下载所有需要的依赖。如之前所见，默认情况下我们有两个路由和两个控制器。对于简单地例子，我们将只使用第一个，app.use(“/”, routes)。如下，改变views/index.jade文件内容：

```
doctype html
html
    head
        title = title
        link(rel=’stylesheet’, href=’/stylesheets/style.css)
    body
        h1 = title
        hr
        p That’s a simple application using Express.
```

现在，如果我们运行node ./bin/www 和 open [http://127.0.0.1:3000]()，我们将会看到page.Jade用缩进来解析我们的模板。因此我们不应该混淆tabs和spaces。否则，我们将得到错误。

下一步，我们需要保护我们的内容。我们检测正确的用户是否有sessions创建；如果没有，一个登录表单就会显示出来。这是一个合适的创建新的中间件。

在Expess中使用sessions，要安装额外的模块：express-sessions。我们需要打开package.json文件，并添加下面的一行代码：

```
“express-sessions”: “~1.0.0”
```

一旦我们这样做了之后，快速运行npm intsall将会带来模块到我们的应用中来。所有我们必须要做的就是使用它。如下app.js代码：

```
var session = require('express-session');
app.use(session({ secret: 'app', cookie: {maxAge: 60000}}));

var verifyUser = function(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.send("show login form");
    }
}
app.use('/', verifyUser, routes);
```

注意，我们改变了原始的app.use(‘/’, routes)行。**Session要在cookie后面使用**。Session中间件被初始化并添加到Express中。veriFyUser 方法在页面渲染之前就被调用。它使用req.session对象，并检查一个loggedIn变量是否被定义，以及它的值是不是true。如果我们再次运行这个脚本，我们将会看到show login form文本在每次请求中都会显示。这就像是因为没有代码按照我们想得方式设置session。我们需要用户填入他们的用户名和密码的表单。我们将处理表单的结果，如果证书是正确的，loggedIn变量将会被设置为true。让我们创建一个新的Jade模块， /view/login.jade:

```
doctype html
html
    head
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
    body
        h1= title
        hr
        form(methord='post')
            label Username:
            br
            input(type='text', name='username')
            br
            input(type='submit')
```

代替用res.send(“show login form”)发送文本，我们应该渲染新的模板：

```
res.render(“login”, {title: “Please log in.”});
```

我们选择POST作为表单的方法。我们需要中间件来填充req.body对象的用户数据，如下：

```
app.use(bodyParser());
```

处理提交的用户名和密码如下：

```
var verifyUser = function(req, res, next) {
    if (req.session.loggIn) {
        next();
    } else {
        var username = "admin", password = "admin";
        if (req.body.username === username && req.body.password === password) {
            req.session.loggIn = true;
            res.redirect('/');
        } else {
            res.render("login", {title: "Please log in."});
        }
    }
}
```

有效的证书都被设置为admin/admin。在一个真实的应用中，我们也许需要访问一个数据库或者从其他的地方获取信息。在代码中放置用户名和密码不是一个很好思想；然而，在我们的这个小试验中这样尝试还是不错的。之前的代码检验传递的数据是否与我们预定义的值相匹配。如果所有都是正确的，那就设置session，在这之后用户被转到home page 页面。

一旦你登陆了，你就应该能够退出。在index page页面添加一个链接：

```
a(href='/logout') logout
```

一旦用户点击这个链接，他们将被跳转到一个新的页面。我们只需要为新的路由创建处理器，移除掉session，并将他们转到 index page，在这里登录表单被重定向。下面就是退出处理器：

```
var logout = function(req, res, next) {
    req.session.loggIn = false;
    res.redirect('/');
}
app.all('/logout', logout);
```

设置loggedIn参数为 false 足够可以使session无效的。重定向发送用户到他们所来的那个相同内容的页面。然而，同时，这些内容被隐藏，登录表单显示。










