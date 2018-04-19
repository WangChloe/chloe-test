<!-- MarkdownTOC -->

- HTML5语法概要
- 1. H5新增元素
	- \(1\) 结构元素
	- \(2\) 其他元素
	- \(3\) input元素类型
	- \(4\) *废除的元素
- 2. H5新增属性
	- \(1\) 表单相关属性
	- \(2\) 链接相关属性
	- \(3\) 其他属性
	- \(4\) *废除属性
	- \(5\) 全局属性
- 3. H5选择器补充
	- querySelectorAll 对比 getElements 的优势
	- jQuery的选择器即是querySelectorAll
- 4. H5自定义属性 dataset
- 5. H5元素类名操作 classList
	- 隐式原型上的方法\(不一一列举\)
- 6. H5本地存储 localStorage
	- Web Storage实际上由两部分组成：sessionStorage与localStorage
	- sessionStorage与localStorage操作相同
- 7. H5地理位置 geolocation
	- \(1\) 测试用例
	- \(2\) 百度地图API
- 8. H5音频 audio
	- \(1\) 属性
	- \(2\) 方法
	- \(3\) 应用：钢琴弹奏
	- \(4\) 应用：音乐播放器
- 9. H5视频 video
	- \(1\) 属性
	- \(2\) 方法
- 10. H5文件 FileReader
	- \(1\) 文件拖拽
	- \(2\) File接口
	- \(3\) 示例
- 11. H5 web工作线程 webworker
	- \(1\) 方法
	- \(2\) 示例
- 12. H5 webSocket 网络套接字
- 13. H5画布 canvas
	- \(1\) 应用 canvas笑脸
	- \(2\) 应用 canvas画图
	- \(3\) 应用 canvas变换
	- \(4\) 应用 canvas内长方形拖拽
	- \(5\) 应用 canvas内圆形拖拽
	- \(6\) 应用 下载canvas绘图
	- \(7\) 应用 canvas运动回调
	- \(8\) canvas框架 jCanvaScript.js
- 14. H5内联SVG
	- \(1\) 位图 && 矢量图
	- \(2\) SVG使用
	- \(3\) SVG梗概
	- \(4\) SVG应用
	- \(5\) 矢量图形库 Raphael.js

<!-- /MarkdownTOC -->



[翻译-你必须知道的28个HTML5特征、窍门和技术](http://www.zhangxinxu.com/wordpress/2010/08/%E7%BF%BB%E8%AF%91-%E4%BD%A0%E5%BF%85%E9%A1%BB%E7%9F%A5%E9%81%93%E7%9A%8428%E4%B8%AAhtml5%E7%89%B9%E5%BE%81%E3%80%81%E7%AA%8D%E9%97%A8%E5%92%8C%E6%8A%80%E6%9C%AF/)

[html5shiv项目让IE6-IE9浏览器都支持HTML5中的元素](http://www.zhangxinxu.com/wordpress/2013/02/github-html5shiv-readme-translate/)

## HTML5语法概要
1. 内容类型
2. DOCTYPE声明
3. 指定字符编码
4. 可以省略标记的元素
5. 具有boolean值的元素
6. 省略行内属性赋值的引号

## 1. H5新增元素

![H5标签集合](http://ojvx9eehr.bkt.clouddn.com/H5%E6%A0%87%E7%AD%BE%E9%9B%86%E5%90%88.jpg)

![H5页面常用结构](http://ojvx9eehr.bkt.clouddn.com/H5%E9%A1%B5%E9%9D%A2%E5%B8%B8%E7%94%A8%E7%BB%93%E6%9E%84.gif)

### (1) 结构元素
#### section
对网站内容分块、分段
当容器需要被直接定义样式或通过脚本定义行为时，推荐使用div而非section

结构(标题+内容)
``` html
<section>
	<h1></h1>
	<p></p>
</section>
```
#### article
代表文档内容 独立性 可嵌套使用
可看作特殊的section元素

常见结构
``` html
<article>
	<header>
		<h1></h1>
	</header>
	<article>
		<header>
			<h2></h2>
		</header>
		<p></p>
		<footer></footer>
	</article>
	<footer></footer>
</article>
```

#### aside
用来表示当前页面或文章的附属信息(相关引用、侧边栏、广告、导航条)

常见结构
``` html
<header>
	<h1></h1>
</header>
<article>
	<h1></h1>
	<p></p>
	<aside>
		<h1></h1>
		<p></p>
	</aside>
</article>
<aside>
	<nav>
		<h2>评论</h2>
		<ul>
			<li><a href="javascipt:;"></a></li>
			<li><a href="javascipt:;"></a></li>
		</ul>
	</nav>
</aside>
```

#### nav
常见应用：导航条、侧边栏导航、页内导航、翻页操作
**不能用menu元素代替nav元素**

常见结构
``` html
<nav>
	<ul>
		<li><a href="javascript:;"></a></li>
		<li><a href="javascript:;"></a></li>
	</ul>
</nav>

<article>
	<header>
		<nav>
			<ul>
				<li><a href="javascript"></a></li>
				<li><a href="javascript"></a></li>
			</ul>
		</nav>
	</header>
	<section>
		<h1></h1>
		<p></p>
	</section>
	<section>
		<h1></h1>
		<p></p>
	</section>
	<footer>
		<a href="javascript:;"></a>
		<a href="javascript:;"></a>
	</footer>
</article>
```

#### figure
figure -> 内容相关，去掉不影响理解的内容
figcaption -> figure里

```
<figure>
  <img src="xxx.jpg">
  <figcaption>描述</figcaption>
</figure>
```

#### time
用来区分各时区或编码

常见结构
``` html
	<time datetime="2017-1-1">2017-1-1</time>
	<time datetime="2017-1-1T20:00">2017-1-1</time>
```

#### pubdate
指明发布时间

常见结构
``` html
	<article>
		<header>
			<h1></h1>
			<p>
				<time datetime="2017-1-1" pubdate>2017-1-1</time>
			</p>
		</header>
	</article>
```
#### header
header可出现多次

常见结构
``` html
<header>
	<h1></h1>
	<nav>
		<ul>
			<li><a href=""></a></li>
			<li><a href=""></a></li>
			<li><a href=""></a></li>
		</ul>
	</nav>
</header>
<article>
	<header>
		<h1></h1>
	</header>
</article>
```

#### footer
footer可出现多次
常见应用：脚注(相关链接、版权信息)

常见结构
``` html
<footer>
	<ul>
		<li><a href="">版权信息</a></li>
		<li><a href="">联系我们</a></li>
		<li><a href="">加入我们</a></li>
	</ul>
</footer>
```
#### hgroup
将标题及其子标题进行分组

常见结构
``` html
<article>
	<header>
		<hgroup>
			<h1>主标题</h1>
			<h2>子标题</h2>
		</hgroup>
		<p>
			<time datetime="2017-1-1">2017-1-1</time>
		</p>
	</header>
	<div></div>
	<footer>
	</footer>
</article>
```

#### address
在文档中呈现联系信息(作者名字、网站连接、电子邮箱、地址、手机号)

常见结构
``` html
<address>
	<a href=""></a>
	<a href=""></a>
</address>
<footer>
	<div>
		<address>
			<a href=""></a>
		</address>
		<time datetime="2017-1-1">2017-1-1</time>
	</div>
</footer>
```

#### 整体应用
``` html
<header>
	<h1>xxx</h1>
	<nav>
		<ul>
			<li><a href="#">a1</a></li>
			<li><a href="#">a2</a></li>
		</ul>
	</nav>
</header>
<article>
	<hgroup>
		<h1>主标题</h1>
		<h2>子标题</h2>
	</hgroup>
	<p>正文</p>
	<section>
		<div>
			<article>
				<h1>评论标题</h1>
				<p>评论正文</p>
			</article>
		</div>
	</section>
</article>
<footer>
	<small>版权***</small>
</footer>
```

### (2) 其他元素
#### video
不同浏览器支持的格式不同，可能需要转码，在source标签里引入多种格式

FF不支持mp4，支持ogg

controls属性显示自带控制进度条

常见结构
``` html
<html>
	<video src="xxx.mp4" controls></video>
	<hr>
	<video  controls>
		<source src="xxx.mp4">
		<source src="xxx.ogg">
	</video>
	<hr>
	<video src="xxx.mp4" id="v1" width="400px" height="200px"></video>
	<button onclick="play()">播放/暂停</button>
</html>
```

``` javascript
<script>
	var v1 = document.getElementById('v1');
	function play() {
		if(v1.paused) {
			v1.play();
		} else {
			v1.pause();
		}
	}
</script>
```

#### audio
controls属性显示自带控制进度条

常见结构
``` html
<html>
	<audio src="xxx.mp3" controls></audio>  <!-- 显示音频自带播放器样式 -->
	<hr>
	<audio src="xxx.mp3" id="a1"></audio>  <!-- 只显示下面的按钮 -->
	<button onclick="play()">播放/暂停</button>
</html>
```

``` javascript
<script>
	var a1 = document.getElementById('a1');
	function play() {
		if(a1.paused) {
			a1.play();
		} else {
			a1.pause();
		}
	}
</script>
```

#### canvas

#### meter
meter -> 度量条
eg:
```
<meter value="3" min="0" max="10">3/10</meter><br>
<meter value="0.6">60%</meter>`
```

#### progress
progress -> 下载进度条
eg:
```
<progress max="100"></progress>
<progress value="22" max="100"></progress>
```

#### details summary
summary -> 总结/梗概(下拉按钮展开details内容)
details -> summary里 -> 详情
eg:
```
<details>
	<summary>HTML 5</summary>
	This document teaches you everything you have to learn about HTML 5.
</details>
```


#### ...

### (3) input元素类型
- email
- url
- number
- range

- date
- time

- Date Pickers

### (4) *废除的元素
- 能用CSS替代的元素：basefont、big、center、font、s、tt、u等
- frame框架
- 只有部分浏览器支持的元素

## 2. H5新增属性

### (1) 表单相关属性
####form
form的元素可写在form外，只要指向相同id

常见结构
``` html
<form id="form1">
	<input type="text">
</form>
<textarea form="form1"></textarea>
```
#### formaction
不同表单元素不同action路径

常见结构
``` html
<form id="form1">
	<input type="text">
	<input type="submit" name="s1" value="v1" formaction="fc1">
	<input type="submit" name="s2" value="v2" formaction="fc2">
	<input type="submit" name="s3" value="v3" formaction="fc3">
</form>
```

#### formmethod
不同表单元素不同提交方法

常见结构
``` html
<form id="form1">
	<input type="text">
	<input type="submit" name="s1" value="v1" formmethod="get" formaction="fc1">
	<input type="submit" name="s2" value="v2" formmethod="post" formaction="fc2">
</form>
```
#### formenctype
不同表单元素不同编码方式

常见结构
``` html
<form id="form1">
	<input type="text" formenctype="text/plain" value="表单数据中的空格转换为加号">
	<input type="text" formenctype="multipart/form-data" value="文件上传">
	<input type="text" formenctype="application/x-www-form-urlencoded" value="get方式时把表单数据转换为字符">
</form>
<textarea form="form1"></textarea>
```

#### formtarget
不同表单元素不同提交后在何处打开加载页面

常见结构
``` html
<form id="form1">
	<input type="text">
	<input type="submit" name="s1" value="v1" formtarget="_blank" formaction="fc1">
	<input type="submit" name="s1" value="v1" formtarget="_self" formaction="fc1">
	<input type="submit" name="s1" value="v1" formtarget="_parent" formaction="fc1">
	<input type="submit" name="s1" value="v1" formtarget="_top" formaction="fc1">
	<input type="submit" name="s1" value="v1" formtarget="framename" formaction="fc1">
</form>
```

#### autofocus
表单元素自动获得焦点

常见结构
``` html
<form id="form1">
	<input type="text" autofocus>
	<input type="text">
</form>
```

#### require
提交时内容为空不允许提交，并显示提示

常见结构
``` html
<form id="form1">
	<input type="text" required>
	<input type="text">
	<input type="submit">
</form>
```
#### labels
验证提示信息

常见结构
``` html
<form id="form1">
	<label for="t1" id="l1"></label>
	<input type="text" id="t1">
	<input type="button" id="btn1" value="验证" onclick="validate()">
</form>
```

``` javascript
<script>
	function validate() {
		var t1 = document.getElementById('t1');
		var btn1 = document.getElementById('btn1');
		var fm1 = document.getElementById('form1');

		if(t1.value.trim() == "") {
			var l1 = document.getElementById('l1');
			l1.setAttribute('for', 't1');
			f1.insertBefore(l1, btn1);	// 在button前显示验证提示信息
			t1.labels[1].innerHTML = '输入为空';
		}
	}
</script>
```

#### placeholder
输入提示信息

常见结构
``` html
<form id="form1">
	<input type="text" placeholder="请输入...">
</form>
```

#### datalist
可输入的下拉框

常见结构
``` html
<form id="form1">
	<input type="text" name="n1" list="ns">  <!-- 点击下拉箭头时显示datalist -->
	<datalist id="ns" style="display: none">
		<option value="v1">v1</option>
		<option value="v2">v2</option>
	</datalist>
</form>
```
#### autocomplete
输入自动填充

#### pattern
表单元素正则验证，输入错误时不跳转

常见结构
``` html
<form id="form1" action="xxx">
	<input type="text" pattern="{a-z}[3]" >
	<input type="submit">
</form>
```

#### selectionDirection
*Chrome不支持

#### indeterminate
复选框checkbox 的第三种状态 “尚未明确是否选取”状态

#### image按钮的width/height

### (2) 链接相关属性
### (3) 其他属性
### (4) *废除属性

### (5) 全局属性
contentEditable
designMode
hidden
spellcheck       拼写检查
tabindex         设置tab键焦点的顺序

## 3. H5选择器补充
*兼容：IE8+

- document/dom.querySelector() 匹配指定 css 选择器的一个元素

- querySelectorAll()  匹配指定 css 选择器的所有元素 (NodeList)

> **注意：** querySelectorAll()方法得到的类数组对象是非动态实时的

### querySelectorAll 对比 getElements 的优势
可以操作数组

``` html
	<div class="box"></div>
	<div class="box"></div>
	<div class="box"></div>
```

``` javascript
<script>
	var aBox = document.querySelectorAll('div');

	// getElements得到的是伪数组，不能操作各项的属性

	// var aBox = document.getElementsByTagName('div');
	// for (var i = 0; i < aBox.length; i++) {
	// 	aBox[i].onclick = function() {
	// 		alert(1);
	// 	}
	// }

	aBox.forEach(function(item, index) {
		item.onclick = function() {
			alert(index);
			// 弹出当前点击div的索引值，依次为0、1、2
		}
	})
</script>
```


### jQuery的选择器即是querySelectorAll

``` javascript
<script>
	function $(selector) {
		var items = document.querySelectorAll(selector);

		if(items.length > 1) {
			return items;
		} else if (items.length == 0) {
			return;
		} else {
			return items[0];
		}
	}
</script>
```

## 4. H5自定义属性 dataset

[HTML5自定义属性对象Dataset简介](http://www.zhangxinxu.com/wordpress/2011/06/html5%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E5%AF%B9%E8%B1%A1dataset%E7%AE%80%E4%BB%8B/)

[HTML5 datalist在实际项目中应用的可行性研究](http://www.zhangxinxu.com/wordpress/2013/03/html5-datalist-%E5%AE%9E%E9%99%85%E5%BA%94%E7%94%A8-%E5%8F%AF%E8%A1%8C%E6%80%A7/)

示例
``` html
	<a data-link="#" data-user-name="chloe">wangchloe.vip</a>
```

``` javascript
<script>
	var oA = document.querySelector('a');
	oA.dataset.link = 'http://wangchloe.vip';
	oA.href = oA.dataset.link + '?name=' + oA.dataset.userName;
	// http://wangchloe.vip?name=chloe
	// *注意：两个及以上属性名调用时需转化为驼峰命名
</script>
```

## 5. H5元素类名操作 classList

[HTML5 DOM元素类名相关操作API classList简介](http://www.zhangxinxu.com/wordpress/2013/07/domtokenlist-html5-dom-classlist-%E7%B1%BB%E5%90%8D/)

``` html
<!-- 该示例来源于张鑫旭个人博客 -->
<body class="a b c"></body>
```

``` javascript
<script>
	console.log(document.body.classList);
	console.log(document.body.className);
	console.log(document.body.classList.toString() === document.body.className;)	// true
</script>
```

> HTML5 DOM元素类名相关操作API classList简介>>>测试

![HTML5 DOM元素类名相关操作API classList简介>>>测试](http://img.blog.csdn.net/20170110000715296?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdzk1MDkxNQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### 隐式原型上的方法(不一一列举)

- obj.add(cName1, cName2, ...);

- obj.remove(cName1, cName2, ...);

- obj.toggle(cName);

- obj.contains(cName);

## 6. H5本地存储 localStorage

[HTML5 localStorage本地存储实际应用举例](http://www.zhangxinxu.com/wordpress/2011/09/html5-localstorage%E6%9C%AC%E5%9C%B0%E5%AD%98%E5%82%A8%E5%AE%9E%E9%99%85%E5%BA%94%E7%94%A8%E4%B8%BE%E4%BE%8B/)

**cookie && localStorage && sessionStorage** (来源CSDN)

- 共同点：
     都是保存在浏览器端，且同源的。

- 不同点：
	1. cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。

	2. cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。

	3. 存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

	4. 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。

	5. 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。

	6. Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者。Web Storage 的 api 接口使用更方便。

### Web Storage实际上由两部分组成：sessionStorage与localStorage

- sessionStorage用于本地存储一个会话(session)中的数据，这些数据只有在同一个会话中的页面才能访问并且当前会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。

- localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。

> *兼容：可以先测试，以确定window.localStorage是否存在。

### sessionStorage与localStorage操作相同

- 设置

`localStorage.key = value;`

`localStorage.setItem(key, value);`

``` javascript
<script>
	var userName = 'chloe';

	//存储，IE6~7 cookie 其他浏览器HTML5本地存储
	if (window.localStorage) {
		localStorage.setItem("name", userName);
	} else {
		Cookie.write("name", userName);	// MooTools框架下cookie的写法
	}
</script>
```

- 读取

`localStorage.key;`

`localStorage.getItem(key);`

``` javascript
<script>
	var userName = window.localStorage ? localStorage.getItem("name") : Cookie.read("name"); // MooTools框架下cookie的写法
</script>
```

- 遍历

``` javascript
<script>
	var storage = window.localStorage;
	for (var i = 0, len = storage.length; i < len; i++) {
		var key = storage.key(i);
		var value = storage.getItem(key);
		console.log(key + "=" + value);
	}
</script>
```

- 删除

`delete localStorage.key;`

`localStorage.removeItem(key);`

``` javascript
<script>
	if (window.localStorage) {
		localStorage.removeItem("name");
	} else {
		Cookie.dispose('name'); // MooTools框架下cookie的写法
	}
</script>
```

- 清空

`localStorage.clear();`

- 监听
`window.onStorage` 监听localStorage变化

## 7. H5地理位置 geolocation

LBS -> Location Based Service 基于位置服务

### (1) 测试用例

``` javascript
<script>
	window.navigator.geolocation.getCurrentPosition(function(res) {
		console.log(res);
	}, function(err) {
		console.log(err);
	})
</script>
```

#### PositionError
错误码 错误信息

- `code: 1`
`message: "User denied Geolocation"` -> 用户拒绝授权

- `code: 1`
`message: "Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).` -> 仅允许HTTPS访问

- `code:2`
`message:"Network location provider at 'https://www.googleapis.com/' : No response received."` -> 没翻墙

### (2) 百度地图API
- timestamp 时间戳

- coords -> 地理坐标
  - accuracy:26 -> 精确度
  - altitude:null -> 海拔
  - altitudeAccuracy:null -> 海拔高度精确度
  - heading:null -> 方向
  - latitude:31.167638 -> 纬度
  - longitude:121.423593 -> 经度
  - speed:null -> 速度

```
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
		body, html,#allmap {
			user-select: none;
			width: 100%;
			height: 100%;
			overflow: hidden;
			margin: 0;
			font-family: "微软雅黑";
		}
	</style>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=wmwHFMPxi66GlPBVUrdgEhDzbLUqlSrM"></script>
	<title>上海师范大学 - 百度地图</title>
</head>
<body>
	<div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
	var map = new BMap.Map("allmap");

	map.centerAndZoom(new BMap.Point(121.423593, 31.167638), 20); // 初始化地图,设置中心点坐标和地图级别

	map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
	map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

	navigator.geolocation.getCurrentPosition(function(res) {
		var {
			coords: {
				longitude,
				latitude
			}
		} = res;

		var point = new BMap.Point(longitude, latitude);

		var marker = new BMap.Marker(point);
		map.addOverlay(marker);

		marker.setAnimation(BMAP_ANIMATION_BOUNCE)

		map.panTo(point)
	}, function(err) {
		console.log(err);
	})
</script>
```

## 8. H5音频 audio

- 音频格式：mp3 wma flat ape wav ogg

### (1) 属性
- src -> 音频路径
- controls -> 显示自带控制进度条
- loop -> 音频循环
- autoplay -> 自动播放 只有pc端可以实现
- muted -> 静音

- currentTime -> 当前播放时间
- duration -> 音频总时间
- volume -> 音量 [0,1]

- ontimeupdate -> 进度更新

- play -> 是否在播放 返回true/false
- pause -> 是否暂停 返回true/false

### (2) 方法
- play() -> 播放歌曲
- pause() -> 暂停歌曲
- load() -> 重新加载歌曲
- onended() -> 音频播放完毕

常见结构
``` html
<html>
	<audio src="xxx.mp3" controls></audio>  <!-- 显示音频自带播放器样式 -->
	<hr>
	<!-- 自定义播放器 -->
	<audio src="xxx.mp3" id="a1"></audio>  <!-- 只显示下面的按钮 -->
	<!-- 进度条 -->
	<div class="progress">
		<div class="inner"></div>
	</div>
	<input type="range" min="0" max="100" value="100">音量
	<button onclick="aPlay()">播放/暂停</button>
	<button onclick="aMute()">静音</button>
</html>
```

``` javascript
<script>
	var a1 = document.getElementById('a1');
	var progress = document.querySelector('.progress');
	var oInner = document.querySelector('.inner');
	var oRange = document.querySelector('[type=range]');

	// 自定义进度条
	// setInterval(function() {
	// 	oInner.style.width = (a1.currentTime / a1.duration) * 100 + '%';
	// }, 16);

	a1.ontimeupdate = function(){
		oInner.style.width = (a1.currentTime / a1.duration) * 100 + '%';
	}

	progress.onclick = function({
		clientX
	}) {
		var leftDelta = clientX - this.offsetLeft;

		var percentage = leftDelta / this.offsetWidth;

		a1.currentTime = a1.duration * percentage;
	}

	oRange.oninput = function(){
		a1.volume = this.value/100;
	}

	function aPlay() {
		if (a1.paused) {
			a1.play();
		} else {
			a1.pause();
		}
	}

	function aMute() {
		a1.muted = !oA.muted;
	}

</script>
```

### (3) 应用：钢琴弹奏

- **sound.js**

钢琴示例

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>钢琴示例</title>
	<style>
		body {
			user-select: none;
		}
		ul, li {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		ul {
			width: 400px;
			margin: 40px auto;
		}
		li {
			width: 38px;
			border: 1px solid black;
			height: 198px;
			float: left;
			text-align: center;
			line-height: 350px;
			margin-left: 10px;
			transform-origin: top center;
		}
		li:active {
			transform: perspective(800px) rotateX(-10deg);
		}
		li.active {
			transform: perspective(800px) rotateX(-10deg);
		}
	</style>
</head>
<body>
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
		<li>4</li>
		<li>5</li>
		<li>6</li>
		<li>7</li>
		<li>8</li>
	</ul>
	<script src="statics/sound.js"></script>
	<script>
		var aLi = document.querySelectorAll('li');

		aLi.forEach(function(oLi, index) {
			oLi.onmousedown = function() {
				playSound(index + 49);
			}
		})

		window.onkeydown = function({
			keyCode
		}) {
			playSound(keyCode);

			aLi[keyCode - 49].classList.add('active');
		}

		window.onkeyup = function({
			keyCode
		}) {
			if (keyCode >= 49 && keyCode <= 56) {
				aLi[keyCode - 49].classList.remove('active');
			}
		}

		function playSound(index) {
			new Audio(oggSound[`sound${index}`]).play();
		}
	</script>
</body>
</html>
```

### (4) 应用：音乐播放器

- 歌词显示

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		#box {
			width: 200px;
			margin: 40px auto;
			text-align: center;
			padding: 10px;
			border: 2px solid black;
			-webkit-background-clip: text;
			background-image: linear-gradient(90deg, red 30%, blue 30%);
			color: transparent;
		}
	</style>
</head>
<body>
	<div id="box">
		西湖的水我的泪
	</div>
	<script>
		var progress = 0;
		var oBox = document.querySelector('div');

		setInterval(function() {
			oBox.style.backgroundImage = `linear-gradient(90deg,red ${progress}%,blue ${progress}%)`

			progress += 0.4;
		}, 16)
	</script>
</body>
</html>
```

## 9. H5视频 video
不同浏览器支持的格式不同，可能需要转码，在source标签里引入多种格式

FF不支持mp4，支持ogg

### (1) 属性
- src -> 视频路径
- controls -> 显示自带控制进度条
- loop -> 视频循环
- autoplay -> 自动播放
- muted -> 静音

- currentTime -> 当前播放时间
- duration -> 视频总时间
- volume -> 音量 [0,1]

- ontimeupdate -> 进度更新

- play -> 是否在播放 返回true/false
- pause -> 是否暂停 返回true/false

### (2) 方法
- play() -> 播放视频
- pause() -> 暂停视频
- load() -> 重新加载视频
- onended() -> 视频播放完毕

常见结构
``` html
<html>
	<video src="xxx.mp4" controls></video>
	<hr>
	<video  controls>
		<source src="xxx.mp4">
		<source src="xxx.ogg">
	</video>
	<hr>
	<video src="xxx.mp4" id="v1" width="400px" height="200px"></video>
	<button onclick="play()">播放/暂停</button>
</html>
```

``` javascript
<script>
	var v1 = document.getElementById('v1');
	function play() {
		if(v1.paused) {
			v1.play();
		} else {
			v1.pause();
		}
	}
</script>
```

## 10. H5文件 FileReader

### (1) 文件拖拽
- ondragover -> 只要悬浮，一直触发
- ondragenter -> 进入时触发，有子节点时有问题
- ondragleave -> 离开时触发，有子节点时有问题
- ondrop -> 释放鼠标时触发，对应DOM节点的dragover事件必须取消默认事件

### (2) File接口
`var reader = new FileReader();`  新建文件读取对象

方法
- `.readAsText(file)` -> 读取文本文件
- `.readAsDataURL(file)` -> 读取多媒体

- `.onload` -> 资源读取完毕  reader.result
- `.onprogress` -> 读取进度更新时触发

`<progress max="100"></progress>`

```
<script>
	reader.onprogress = function(ev){
		oProgress.value = ev.loaded/ev.total*100;
	}
</script>
```

- `.onloadstart` -> 加载开始时触发
- `.onloadend` -> 加载结束时触发
- `.onerror` -> 出现错误时触发
- `.onabort` -> 加载过程中中止时触发

- `.abort` -> 手动中止加载


### (3) 示例

- 文本

``` javascript
<script>
	oBlock.ondrop = function(ev) {
		var file = ev.dataTransfer.files[0];

		var reader = new FileReader();

		reader.readAsText(file);	// 读取文本文件

		reader.onload = function(ev) {
			console.log(reader.result);
		}

		ev.preventDefault();
	}
</script>
```

- 多媒体

``` javascript
<script>
	oBlock.ondrop = function(ev) {
		var file = ev.dataTransfer.files[0];

		var reader = new FileReader();

		reader.readAsDataURL(file);		// 读取多媒体

		reader.onload = function(ev) {
			new Audio(reader.result).play();
		}

		ev.preventDefault();
	}
</script>
```

- 处理文本/多媒体

``` javascript
<script>
	oBlock.ondrop = function(ev) {
		var file = ev.dataTransfer.files[0];

		var reader = new FileReader();

		if (/text/.test(file.type)) {  // 处理文本

			reader.readAsText(file);

			reader.onload = function() {
				document.write(reader.result);
			}

			console.log('text');

		} else {  // 处理多媒体
			reader.readAsDataURL(file);

			reader.onload = function() {
				if (/image/.test(file.type)) {
					console.log('image');

					var oImage = new Image();
					oImage.src = reader.result;

					document.body.appendChild(oImage)

				} else if (/video/.test(file.type)) {

					console.log('video');

					oVideo.src = reader.result;
					oVideo.play();

				} else {

					console.log('audio');
					new Audio(reader.result).play();

				}
			}
		}

		ev.preventDefault();
	}
</script>
```

## 11. H5 web工作线程 webworker
- 进程
- 线程

`var worker = new Worker('js文件');`  新建worker

> 	1. 需在服务器环境下
	2. 不会改变数据类型
	3. 不会改变父线程数据
	4. DOM/BOM 不可使用(console.log可用)
    5. 只能有一层子线程，子线程不可再开子线程

### (1) 方法
- worker.postMessage('Data')  向worker内传递数据 (1)
- worker.onmessage 监听事件 (4)
- worker.terminate 停止worker

worker内部
监听事件：
- this.onmessage -> ev -> ev.data //'Data' (2)
- this.postMessage 向父线程传递数据  (3)

### (2) 示例

- 主程序

``` javascript
<script>
	var worker = new Worker('./calc.js');

	worker.postMessage(2);
</script>
```

- calc.js

``` javascript
<script>
	this.onmessage = function(ev) {
		console.log(ev.data)
	}

	function fibonacci(n){
		if( n == 1 || n == 2 ) return 1;

		return fibonacci(n-1) + fibonacci(n-2);
	}
</script>
```

## 12. H5 webSocket 网络套接字

- 客户端
	1.发消息 -> emit
	2.接消息 -> on

- 服务端
	1.接消息 -> on
	2.发消息 -> emit

在以前 HTTP 协议中所谓的 keep-alive connection 是指在一次 TCP 连接中完成多个 HTTP 请求，但是对每个请求仍然要单独发 header。

WebSocket 解决的第一个问题是，通过第一个 HTTP request 建立了 TCP 连接之后，之后的交换数据都不需要再发 HTTP request了，使得这个长连接变成了一个真.长连接。

> Websocket只需要一次HTTP握手，所以说整个通讯过程是建立在一次连接/状态中，也就避免了HTTP的非状态性，服务端会一直知道你的信息，直到你关闭请求，这样就解决了接线员要反复解析HTTP协议。

## 13. H5画布 canvas

基于 JavaScript 的绘图 API

`<canvas></canvas>`

获取绘图上下文
``` javascript
<script>
	var oC = document.querySelector('canvas');
	var ctx = oC.getContext('2d');
</script>
```

ctx.
  - moveTo(x, y)  移动
  - lineTo(x, y)  划线
  - fillStyle = "color"  更改填充颜色
  - fill()  填充
  - strokeStyle = "color"  更改描边样式
  - stroke()  描边

- 矩形
ctx.
  - fillRect(x, y, w, h)  填充矩形(没有路径)
  - strokeRect(x, y, w, h)  描边矩形(没有路径)
  - rect(x, y, w, h)  举行路径
  - clearRect(x, y, w, h)  清空区域

- 弧
ctx.
  - arc(cx, cy, r, startDegree, endDegree, anticlockwise)  圆心x，圆心y，半径，起始角度(弧度制)，结束角度(弧度制)，是否逆时针
  - fill()  填充

- 文本
ctx.
  - font = "字号 字体"
  - textAlign = "left/center/right"  竖轴对齐方式
  - textBaseline ="top/middle/bottom" 横轴对齐方式
  - fillText('文字', x, y)  填充文字
  - strokeText('文字', x, y)  描边文字
  - measureText('文字')  返回文字长度(width)

ctx.
  - beginPath()  开始路径
  - closePath()  闭合路径

- 线条样式
ctx.
  - lineCap = "round/butt(默认)/square"  更改线帽
  - lineJoin = "round/miter(默认)/bevel(切角)"  更改连接点样式
  - lineWidth = 20  线宽

- 阴影
ctx.
  - shadowColor	设置或返回阴影颜色
  - shadowBlur	设置或返回阴影模糊级别
  - shadowOffsetX	设置或返回阴影距形状的水平距离
  - shadowOffsetY	设置或返回阴影距形状的垂直距离

- 渐变
ctx.
  - createLinearGradient(x0, y0, x1, y1)  创建线性渐变 起始位置 结束位置（用在画布内容上）
  - createPattern(img, "repeat|repeat-x|repeat-y|no-repeat")	在指定的方向上重复指定的元素
  - createRadialGradient(x0, y0, r0, x1, y1, r1)	创建径向渐变 起始位置 结束位置（用在画布内容上）
  - addColorStop(位置, 颜色)	规定渐变对象中的颜色和停止位置(0~1)

- 画图
ctx.
  - drawImage(img, x, y)  在画布上绘制图像、画布或视频
  - drawImage(img, x, y, width, height)
  - drawImage(img, sx, sy, swidth, sheight, x, y, width, height)  剪切图像，并在画布上定位被剪切的部分 s-裁剪

	```
	<script>
		var oC = document.querySelector('canvas');
		var ctx = oC.getContext('2d');

		var oImage = new Image();
		oImage.src = 'xxx.png';

		oImage.onload = function() {
			ctx.drawImage(oImage, 0, 0);
		}
	</script>
	```

- 像素操作
ctx.
  - getImageData(x, y, w, h)  画布指定矩形复制像素数据  **需服务器环境**
    imgData包括{data, width, height}  其中data是像素数组
    - red=imgData.data[0];
	- green=imgData.data[1];
	- blue=imgData.data[2];
	- alpha=imgData.data[3];
  - putImageData(imgData, x, y) 将图像数据放回画布

- 变换
ctx.
  - scale(sW, sH)	缩放当前绘图至更大或更小
  - rotate(角度*Math.PI/180)	旋转当前绘图
  - translate(x, y)	重新映射画布上的 (0,0) 位置
  > 注意translate和moveTo的区别

  - transform(a,b,c,d,e,f)	替换绘图的当前转换矩阵(相对变化)  水平缩放 水平倾斜 垂直倾斜 垂直缩放 水平移动 垂直移动
  - setTransform(a,b,c,d,e,f)	将当前转换重置为单位矩阵(不相对变化)  水平缩放 水平倾斜 垂直倾斜 垂直缩放 水平移动 垂直移动

ctx.
  - isPointInPath(x, y)  点是否在路径内

ctx.
  - save()	保存当前环境的状态
  - restore()	返回之前保存过的路径状态和属性

### (1) 应用 canvas笑脸
```
<canvas width="800" height="1200"></canvas>
<script>
	var oC = document.querySelector('canvas');
	var ctx = oC.getContext('2d');

	// face
	ctx.fillStyle = 'yellow';
	ctx.arc(400, 250, 180, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.stroke();

	// mouth
	ctx.beginPath();
	ctx.lineCap = 'round';

	ctx.lineWidth = 20;
	ctx.fillStyle = 'red';
	ctx.arc(400, 280, 80, 0, Math.PI, false);
	// ctx.fill();  // 红色实心半圆张嘴笑脸
	ctx.stroke();  // 黑色半圆弧微笑脸

	// eyes
	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.moveTo(350, 200);
	ctx.arc(350, 200, 20, 0, 2 * Math.PI, false);

	ctx.moveTo(450, 200);
	ctx.arc(450, 200, 20, 0, 2 * Math.PI, false);

	ctx.closePath();

	ctx.fill();
</script>
```

### (2) 应用 canvas画图
```
<canvas width="800" height="600"></canvas>
<script>
	var oC = document.querySelector('canvas');
	var ctx = oC.getContext('2d');

	oC.onmousedown = function(ev) {

		var {
			clientX,
			clientY
		} = ev;

		ctx.moveTo(clientX, clientY)

		oC.onmousemove = function(ev) {

			ctx.clearRect(0, 0, oC.width, oC.height);

			var {
				clientX,
				clientY
			} = ev;

			ctx.lineWidth = 5;
			ctx.lineTo(clientX, clientY);
			ctx.stroke();
		}

		oC.onmouseup = function() {
			oC.onmousemove = null;
			oC.onmouseup = null;
		}
	}
</script>
```

### (3) 应用 canvas变换
```
<canvas width="800" height="600"></canvas>
	<script>
		var oC = document.querySelector('canvas');
		var ctx = oC.getContext('2d');

		var degree = 1;

		var x1 = 300;
		var y1 = 300;
		var w1 = 100;
		var h1 = 100;

		var x2 = 100;
		var y2 = 100;
		var w2 = 50;
		var h2 = 50;

		var rotate1 = 0;
		var rotate2 = 0;

		setInterval(function() {
			ctx.clearRect(-oC.width, -oC.height, oC.width * 2, 2 * oC.height);

			ctx.save();
			ctx.translate(x1, y1);
			ctx.rotate(rotate1);
			ctx.fillRect(-w1 / 2, -h1 / 2, w1, h1);
			ctx.restore();

			ctx.save();
			ctx.translate(x2, y2);
			ctx.rotate(rotate2);
			ctx.fillRect(-w2 / 2, -h2 / 2, w2, h2);
			ctx.restore()

			rotate1++;
			rotate2 += 0.2;
		}, 100)

		function d2a(deg) {
			return deg / 180 * Math.PI
		}
	</script>
```

### (4) 应用 canvas内长方形拖拽
```
<canvas width="800" height="600"></canvas>
<script>
	var oC = document.querySelector('canvas');
	var ctx = oC.getContext('2d');

	var rect = {
		x: 0,
		y: 0,
		w: 100,
		h: 100
	}

	ctx.fillRect(
		rect.x,
		rect.y,
		rect.w,
		rect.h
	);

	oC.onmousedown = function({
		clientX,
		clientY
	}) {
		var {
			x,
			y,
			w,
			h
		} = rect;

		var disX = clientX - x;
		var disY = clientY - y;

		if (
			clientX > x &&
			clientX < x + w &&
			clientY > y &&
			clientY < y + h
		) {
			oC.onmousemove = function({
				clientX,
				clientY
			}) {

				ctx.clearRect(0, 0, oC.width, oC.height)  // **先清空画布再画

				var deltaX = clientX - disX;
				var deltaY = clientY - disY;

				rect.x = deltaX;
				rect.y = deltaY;

				ctx.fillRect(
					rect.x,
					rect.y,
					rect.w,
					rect.h
				);
			}

			oC.onmouseup = function() {
				oC.onmousemove = null;
				oC.onmouseup = null;
			}
		}
	}
</script>
```

### (5) 应用 canvas内圆形拖拽
```
<canvas width="800" height="600"></canvas>
<script>
	var oC = document.querySelector('canvas');
	var ctx = oC.getContext('2d');

	var circle = {
		x: 50,
		y: 50,
		r: 50
	}

	ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, false);

	ctx.fill();

	oC.onmousedown = function({
		clientX,
		clientY
	}) {
		var {
			x,
			y,
			r
		} = circle;

		var disX = clientX - x;
		var disY = clientY - y;

		if (
			ctx.isPointInPath(clientX, clientY)  // 利用isPointInPath函数
		) {
			oC.onmousemove = function({
				clientX,
				clientY
			}) {
				ctx.clearRect(0, 0, oC.width, oC.height);
				ctx.beginPath();

				var deltaX = clientX - disX;
				var deltaY = clientY - disY;

				circle.x = deltaX;
				circle.y = deltaY;

				ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, false);
				ctx.fill();
			}

			oC.onmouseup = function() {
				oC.onmousemove = null;
				oC.onmouseup = null;
			}
		}
	}
</script>

```

### (6) 应用 下载canvas绘图
```
<canvas width="600" height="400"></canvas>
<br>
<button>Download</button>
<script>
	var oC = document.querySelector('canvas');
	var ctx = oC.getContext('2d');
	var oBtn = document.querySelector('button');

	var data = [
		rnd(100, 1000),
		rnd(100, 1000),
		rnd(100, 1000),
		rnd(100, 1000),
		rnd(100, 1000)
	]

	var start = 0;

	var sum = sumUp(data);

	data.forEach(function(number, index) {
		var color = `rgb(${rnd(0,255)},${rnd(0,255)},${rnd(0,255)})`;

		var delta = number / sum * 2 * Math.PI;

		ctx.fillStyle = color;

		ctx.beginPath();

		ctx.moveTo(300, 200)
		ctx.arc(300, 200, 100, start, start + delta, false);
		ctx.lineTo(300, 200)

		ctx.fill();

		start = start + delta;
	})

	function sumUp(array) {
		var sum = 0;

		array.forEach(function(n) {
			sum += n
		})

		return sum;
	}

	function rnd(n, m) {
		return parseInt(Math.random() * (m - n) + n);
	}

	// **下载canvas图片
	oBtn.onclick = function() {
		var oA = document.createElement('a');
		oA.href = oC.toDataURL();
		oA.download = '默认命名';
		// oA.download = fileName.value ? fileName.value : '默认命名' + '.png';

		oA.click();
	}
</script>
```

### (7) 应用 canvas运动回调
```
<script>
	function loadStatics(statics, callback) {
		var count = 0;

		statics.forEach(function(path, index) {
			var oImage = new Image();
			oImage.src = `img/${path}.png`

			resources[path] = oImage;

			oImage.onload = function() {

				count++

				if (count == statics.length) {
					callback && callback();
				}
			}
		})
	}

	function d2a(d) {
		return d / 180 * Math.PI
	}

	function a2d(a) {
		return a / Math.PI * 180
	}

	function rnd(n, m) {
		return parseInt(Math.random() * (m - n) + n)
	}

	function rndSign() {
		return Math.random() < 0.5 ? -1 : 1
	}
</script>
```

### (8) canvas框架 jCanvaScript.js
[jCanvaScript.js](http://jcscript.com/)

示例
```
<canvas id="c1" width="500" height="500"></canvas>
<script src="libs/jCanvaScript.1.5.18.min.js"></script>
<script>
    var idCanvas = "c1";
    onload_1();

    var interval_1 = 0;

    function startShow() {
        var r = Math.floor(Math.random() * (254)),
            g = Math.floor(Math.random() * (254)),
            b = Math.floor(Math.random() * (254)),
            x = Math.floor(Math.random() * (439)),
            y = Math.floor(Math.random() * (554)),
            color = "rgba(" + r + ", " + g + ", " + b + ", 0.5)",
            filled = true,
            radius = 1;
        jc.circle(x, y, radius, color, filled)
            .animate({
                radius: 100,
                opacity: 0
            }, 1500, function() {
                this.del();
            });
    }

    function onload_1() {
        jc.start(idCanvas, true);
        interval_1 = setInterval(startShow, 200);
    }

    function start_1(idCanvas) {
        if (interval_1) return;
        onload_1();
    }

    function stop_1(idCanvas) {
        clearInterval(interval_1);
        interval_1 = 0;
        jc.clear(idCanvas);
    }
</script>
```

## 14. H5内联SVG
SVG(Scalable Vector Graphic 可伸缩矢量图形)
VML(The Vector Markup Language  矢量可标记语言)

> SVG 使用 XML 格式定义图形

### (1) 位图 && 矢量图
- 位图 -> 由像素点构成的图形
  - 优点: 色彩信息相当复杂
  - 缺点: 失真、体积大

- 矢量图 -> 由数学语言描述出的图形
  - 优点: 体积小不失真
  - 缺点: 色彩信息单一，图形简单

### (2) SVG使用
1.
```
<img src="xxx.svg">
```
```
<?xml version="1.0" encoding="UTF-8"?>
<svg width="801px" height="792px" viewBox="0 0 801 792" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	...
</svg>
```

2.
```
<svg>
	<rect x="20" y="20" rx="20" ry="20" width="250" height="250" style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9"/>
</svg>
```

3.
```
<svg width="200" height="200"></svg>
<script>
	var oSvg = document.querySelector('svg');
	var oLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

	oLine.setAttribute('x1', '10');
	oLine.setAttribute('y1', '10');
	oLine.setAttribute('x2', '100');
	oLine.setAttribute('y2', '100');
	oLine.setAttribute('stroke', 'green');

	oSvg.appendChild(oLine);
</script>
```


### (3) SVG梗概
- `<rect>`     矩形
  eg: `<rect x="20" y="20" rx="20" ry="20" width="250" height="250" style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9"/>`
  - x, y  位置
  - width, height  宽高
  - rx, ry  圆角矩形
  - style  css属性

- `<circle>`   圆形
  eg: `<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>`
  - cx, cy  圆心坐标 默认(0, 0)
  - r  半径

- `<ellipse>`  椭圆
  eg: `<ellipse cx="300" cy="150" rx="200" ry="80"style="fill:rgb(200,100,50);stroke:rgb(0,0,100);stroke-width:2"/>`
  - cx, cy  圆心坐标
  - rx, ry  水平/垂直半径

- `<line>`     线
  eg: `<line x1="0" y1="0" x2="300" y2="300"style="stroke:rgb(99,99,99);stroke-width:2"/>`
  - x1, y1  开始坐标
  - x2, y2  结束坐标

- `<polyline>` 折线
  eg: `<polyline points="0,0 0,20 20,20 20,40 40,40 40,60"style="fill:white;stroke:red;stroke-width:2"/>`
  - points 每个折点的x,y坐标

- `<polygon>`  多边形
  eg: `<polygon points="220,100 300,210 170,250"style="fill:#cccccc;stroke:#000000;stroke-width:1"/>`
  - points  每个角的x,y坐标(自动闭合)

- `<path>`     路径
  eg: `<path d="M250 150 L150 350 L350 350 Z" style="#ccc;"/>`  **大写表示绝对定位，小写表示相对定位。**
  - M  moveto
  - L  lineto
  - H  horizontal lineto
  - V  vertical lineto
  - C  curveto
  - S  smooth curveto
  - Q  quadratic Belzier curve
  - T  smooth quadratic Belzier curveto
  - A  elliptical Arc
  - Z  closepath


- `<filter>`    高斯滤镜  **<filter> 标签必须嵌套在 <defs> 标签内。**  definitions 定义
  eg: `<defs><filter id="Gaussian_Blur"><feGaussianBlur in="SourceGraphic" stdDeviation="3" /></filter></defs>`
  `<ellipse cx="200" cy="150" rx="70" ry="40" style="fill:#ff0000;stroke:#000000;stroke-width:2;filter:url(#Gaussian_Blur)"/>`
  - <filter>id  定义名称

  - filter:url(#xxx)  链接滤镜

- `<linearGradient>`  线性渐变  **<linearGradient> 标签必须嵌套在 <defs> 的内部。**
  eg: `<defs><linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1"/><stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1"/></linearGradient></defs>`
  `<ellipse cx="200" cy="190" rx="85" ry="55" style="fill:url(#orange_red)"/>`
  - <linearGradient>id  定义名称
  - <linearGradient>x1,y1  渐变开始位置
  - <linearGradient>x2,y2  渐变结束位置
  - <stop>  渐变颜色

  - fill:url(#xxx)  链接渐变

- `<radialGradient>`  径向渐变  **<radialGradient> 标签必须嵌套在 <defs> 中。**
  eg: `<defs><radialGradient id="grey_blue" cx="50%" cy="50%" r="50%"fx="50%" fy="50%"><stop offset="0%" style="stop-color:rgb(200,200,200);stop-opacity:0"/><stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1"/></radialGradient></defs>`
  `<ellipse cx="230" cy="200" rx="110" ry="100" style="fill:url(#grey_blue)"/>`
  - <radialGradient>id  定义名称
  - <radialGradient>cx,cy,r  外圈
  - <radialGradient>fx,fy  内圈
  - <stop>  渐变颜色

  - fill:url(#xxx)  链接渐变

### (4) SVG应用

[纯CSS实现帅气的SVG路径描边动画效果](http://www.zhangxinxu.com/wordpress/2014/04/animateion-line-drawing-svg-path-%E5%8A%A8%E7%94%BB-%E8%B7%AF%E5%BE%84/)

- `stroke-dasharray`  各虚线长度
- `stroke-dashoffset`  虚线的起始偏移

获取路径长度
```
<script>
	var path = document.querySelector('path');
	var length = path.getTotalLength();
</script>
```

#### 2017

``` css
<style>
	.one {
		stroke-dasharray: 600;
		stroke-dashoffset: 600;
		animation: ani 2s forwards;
	}
	.two {
		stroke-dasharray: 600;
		stroke-dashoffset: 600;
		animation: ani 1.8s forwards 0.2s;
	}
	.three {
		stroke-dasharray: 600;
		stroke-dashoffset: 600;
		animation: ani 1.6s forwards 0.4s;
	}
	@keyframes ani {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
```

三个颜色变换

``` html
<svg width="800" height="600">
	<!-- one -->
	<path d="M149.593084,114.512754 C149.593084,80.6086232 265.458217,31.6263568 265.458217,144.647923 C265.458217,257.669489 149.593084,288.726563 149.593084,288.726563 L291.550902,288.726563" class="one" stroke="#4A4A4A" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<path d="M391.00506,81.6608912 C297.400634,81.6608912 275.086722,284.767558 384.426619,284.767558 C493.766517,284.767558 484.609487,81.6608912 391.00506,81.6608912 Z" class="one"  stroke="#4A4A4A" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<path d="M508.720275,85.6448695 C519.572766,106.125165 510.370277,296.381449 510.370277,296.381449" class="one"  stroke="#4A4A4A" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<path d="M570.187369,93.0436865 C570.187369,93.0436865 703.312123,69.0165013 703.312123,103.354018 C703.312123,137.691534 595.118196,304.797696 595.118196,304.797696" class="one"  stroke="#4A4A4A" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<!-- two -->
	<path d="M149.593084,114.512754 C149.593084,80.6086232 265.458217,31.6263568 265.458217,144.647923 C265.458217,257.669489 149.593084,288.726563 149.593084,288.726563 L291.550902,288.726563" class="two" stroke="#029df9" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<path d="M391.00506,81.6608912 C297.400634,81.6608912 275.086722,284.767558 384.426619,284.767558 C493.766517,284.767558 484.609487,81.6608912 391.00506,81.6608912 Z" class="two" stroke="#029df9" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<path d="M508.720275,85.6448695 C519.572766,106.125165 510.370277,296.381449 510.370277,296.381449" class="two" stroke="#029df9" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<path d="M570.187369,93.0436865 C570.187369,93.0436865 703.312123,69.0165013 703.312123,103.354018 C703.312123,137.691534 595.118196,304.797696 595.118196,304.797696" class="two" stroke="#029df9" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<!-- three -->
	<path d="M149.593084,114.512754 C149.593084,80.6086232 265.458217,31.6263568 265.458217,144.647923 C265.458217,257.669489 149.593084,288.726563 149.593084,288.726563 L291.550902,288.726563" class="three" stroke="#90da32" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<path d="M391.00506,81.6608912 C297.400634,81.6608912 275.086722,284.767558 384.426619,284.767558 C493.766517,284.767558 484.609487,81.6608912 391.00506,81.6608912 Z" class="three" stroke="#90da32" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<path d="M508.720275,85.6448695 C519.572766,106.125165 510.370277,296.381449 510.370277,296.381449" class="three" stroke="#90da32" stroke-width="8" fill="none" stroke-lineCap="round"></path>
	<path d="M570.187369,93.0436865 C570.187369,93.0436865 703.312123,69.0165013 703.312123,103.354018 C703.312123,137.691534 595.118196,304.797696 595.118196,304.797696" class="three" stroke="#90da32" stroke-width="8" fill="none" stroke-lineCap="round"></path>
</svg>
```

### (5) 矢量图形库 Raphael.js
[Raphaël Reference](http://dmitrybaranovskiy.github.io/raphael/reference.html)

示例
```
<script src="libs/raphael.min.js"></script>
<script>
	// Creates canvas 320 × 200 at 10, 50
	var paper = Raphael(10, 50, 320, 200);

	// Creates circle at x = 50, y = 40, with radius 10
	var circle = paper.circle(50, 40, 10);
	// Sets the fill attribute of the circle to red (#f00)
	circle.attr("fill", "#f00");

	// Sets the stroke attribute of the circle to white
	circle.attr("stroke", "#fff");

	circle.click(function() {
		this.animate({
			fill: '#fe0',
			y: 100
		}, 500, 'bounce');
	})

	// circle.drag(function(dx,dy){
	// 	this.attr({
	// 		x: x + dx,
	// 		y: y + dy
	// 	})
	// },function(){
	// 	x = this.attr('x')
	// 	y = this.attr('y')
	// })
</script>
```