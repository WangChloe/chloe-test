---
#blog1
以下内容若有问题烦请即时告知我予以修改，以免误导更多人。

---

##1. js六大数据类型

> null并非typeof出来的类型，不过由于null不可再分，所以将其归于基本数据类型之中。

###基本数据类型
- number    数字
- string    字符串
- boolean   布尔
- undefined 未定义
- function  函数

###复杂数据类型
- object    对象(可拆分为多种数据类型)

##2. 数据类型补充

- null空对象 -> 数据类型(object)
- NaN 非数字 -> 数据类型(number)

>  NaN和任何数据类型都不相等，包括自己

##3. 数字相关判断方法

- ###是否是数字
isNaN() 非数字->true  数字->false
- ###是否是整数
if(num == parseInt(num))

##4. 变量

1. ###全局变量
2. ###局部变量
3. ###闭包
	  子函数可以使用父函数的全局变量

> 变量的遮蔽
  全局变量和局部变量同名
  就近原则->在函数里优先使用自己的变量

##5. 运算符

1. ###算术运算符
2. ###比较运算符
		== -> !=	=== -> !==
3. ###赋值运算符
4. ###逻辑运算符

##6. 常见变量命名前缀
| 前缀 | 		全称      |     含义 	 		 | 示例       |
| :--: | 	   :----: 	  |   :----: 	 		 | :---:      |
| o    | 	   object  	  |   一个对象，一个元素 | oDiv       |
| a    | 	   array 	  |   一组元素 			 | aLi        |
| s    | 	   string 	  |   字符串 			 | sUserName  |
| i    | 	   integer    |   整数 				 | iCount     |
| f    | 	   float 	  |   浮点数 			 | fPrice	  |
| b    | 	   boolean    |   布尔 				 | bOk		  |
| fn   | 	   function   |   函数 				 | fnSucc	  |
| re   | 	   RegExp     |   正则 				 | reMailCheck|

##7. 字符串转化为数字
###parseInt()
- 从左往右开始找，找到第一个非数字(包含小数点)就停止，如果第一个数不是数字，则返回NaN
- eg: '12.5' -> 12	'12abc' -> 12	'abc' -> NaN

###parseFloat()
- 从左往右开始找，找到第一个非数字(不包含小数点)就停止，如果第一个数不是数字，则返回NaN
- eg: '12.5' -> 12.5	'12abc' -> 12	'abc' -> NaN

###Number()
- 既能处理整数，也能处理小数，但只能处理数字
- eg: '12.5' -> 12.5 	'12' -> 12 		'12abc' -> NaN 	'abc' -> NaN

##8. 数字转化为字符串
number + ''

> eg：12 + '' -> '12'

##9. if语句变形
1. 条件 && 语句; (条件为真时执行)
1. 条件 || 语句; (条件为假时执行)
1. 三目运算  条件? 语句1: 语句2;

##10. **js**及**事件**的概念
- js：修改样式
- 事件：用户的操作

>任何标签都可以添加事件，任何属性都可以修改

---
#blog2

---

##1. js操作元素属性
- **.** 属性操作符(不可以接收变量)
- **[]** 中括号可以操作属性也可以接收变量

``` javascript
<script>
	function setValue() {
		//省略获取元素oBtn, oBtn2的伪代码
		oBtn.value = 'bbb';
		oBtn2['value'] = 'bbb';

	}
</script>
```

>凡是**.** 出现的地方都可以用中括号替代

##2. js设置复杂样式

> 非首单词的首字母大写并去掉-符

``` css
<style>
	.complex {
		margin-left: 10px;
	}
</style>
```
``` javascript
<script>
	function setStyle() {
		var oC = document.getElementsByClassName('complex')[0];
		oC.style.marginLeft = '10px';
	}
</script>
```

##3. 物体从中心放大

> * margin-top: -变化的高度/2
> * margin-left: -变化的宽度/2

##4. a链接防止刷新

``` html
<a href="#">点击会刷新页面</a>
```
``` javascipt
<a href="javascript:;">点击不会刷新页面！(推荐使用)</a>
<!-- javascript:;相当于一个伪协议 -->
```

##5. 循环添加事件，事件中的循环变量不能用

``` javascript
<script>
	function clickEg() {
		//获取一组按钮	ps:js一组元素不能一起改变样式或设置事件
		var aBtn = document.getElementsByTagName('button');
		for(var i = 0; i < 3; i++) {
			aBtn[i].onclick = function() {
				//循环中的i变量此时已自增至3
				//aBtn[i].style.background = '#f00';

				//当前事件发生的对象 aBtn[i]为this
				this.style.background = 'f00';
			}
		}
	}
</script>

```
##6. 浏览器加载的过程

1.加载整个页面的标签和属性
2.过滤不符合W3C标准的标签和属性(高级浏览器)
3.执行js -> window.onload

##7. DOM获取元素方法
###1.document.getElementById('id');
###2.document/obj.getElementsByTagName('TagName');
###3.document/obj.getElementsByClassName('ClassName');
兼容：Chrome、FF、IE9+

obj.getElementsByClassName
- 高级浏览器 -> function
- IE8- -> undefined
####兼容写法
``` javascript
<script>
	function getByClass(obj, sClass) {	// obj为从哪个父级下面查找类为sClass的元素
			if(obj.getElementsByClassName) {	// IE8- -> undefined  高级浏览器 -> function
				return obj.getElementsByClassName(sClass);	// 高级浏览器
			} else {	// IE8
				var aEle = document.getElementsByTagName('*');
				var arr = [];
				for(var i=0; i<aEle.length; i++){
					var temp = aEle[i].className.split(' ');
					if(findInArr(sClass, temp)) {
						arr.push(aEle[i]);
					}
				}
				return arr;
			}
		}
</script>
```

> * getElementById只能从document下获取
	var oDiv = document.getElementById('id');
> * getElementsByTagName/getElementsByClassName可以从document下获取，也可以从父级下获取
	var oDiv2 = document.getElementsByClassName('ClassName')[0];
	var oDiv3 = oBox.getElementsByTagName('TagName')[0];

##8. js中的真假
- 真：非0数字，非空字符串，true，非空对象
- 假：0，空字符串('')，false，空对象(null)，undefined，NaN

##9. 获取元素当前样式(兼容)
``` javascript
<script>
	function getStyle(obj, name){	//元素，样式名称
		if(obj.currentStyle) {	// Chrome、FF -> undefined	IE -> object
			// IE系
			return obj.currentStyle[name];	// 兼容IE系
		} else {
			// Chrome、FF
			return getComputedStyle(obj, false)[name];	// 兼容高级浏览器(Chrome、FF、IE9+)
		}

	}
</script>
```
简化
``` javascript
<script>
	function getStyle(obj, name){	//元素，样式名称
		return (obj.currentStyle || getComputedStyle(obj, false))[name];
	}

	// 调用
	console.log(parseInt(getStyle(oDiv, 'heihgt')));
</script>
```
##10. 获取一个n~m之间的随机数(n<m，且不包括m)
``` javascript
<script>
	function rnd(n, m) {
		return parseInt(Math.random() * (m - n) + n);
	}
</script>
```

>应用：随机变色

>``` javascript
<script>
	// rgb色值范围[0, 255]
	oDiv.style.background = 'rgb(' + rnd(0, 256) + ',' + rnd(0, 256) + ',' + rnd(0, 256) + ')';
</script>
```

---
#blog3

以下内容若有问题烦请即时告知我予以修改，以免误导更多人。

---

##1. 返回值问题(return)
1. return语句后面的代码不执行
1. **函数若没有写return，则默认返回undefined**
1. **函数返回语句为return; 也返回undefined**
1. **return必须写在函数function内**

##2. undefined出现的情况
- 函数没有返回值或只有return;
- 定义了一个变量，但没有赋值

eg: 
``` javascript
<script>
  var a; // undefined
  function show(a) {}
  show();	// undefined`
</script>
```

- 访问不存在的属性

> eg: oDiv.aaa;	// undefined

##3. eval(字符串)
> 虽然这个不建议使用，但还是聊聊这个东西是怎么用的吧

eval能把字符串里面的代码转换成js能理解的程序，把引号中的拿出来运行

``` javascript
<script>
	var a = '[1, 2, 3]';	//字符串
	alert(eval(a));		// 1, 2, 3  '[1, 2, 3]' -> [1, 2, 3]
</script>
```

##4. 数字小于10的补零函数
``` javascript
<script>
	function toTen(num) {
		if(num < 10) {
			return '0' + num;
		} else {
			return '' + num;	// 函数的返回类型最好保持一致
		}
	}
</script>
```
简化
``` javascript
<script>
	function toTen(num) {
		return num < 10 ? '0' + num : '' + num;
	}
</script>
```

##5. 定时器
### (1) Interval(每过一段时间执行一次，循环执行)
- 开启定时器
setInterval(函数/函数名, 时间);

> 时间单位是毫秒

- 关闭定时器
clearInterval(定时器的名字);

**interval的问题**

1.时间不能设置太小的值

 eg:设置0其实会超出0
``` javascript
<script>
	var a = 6;
	setTimeout(function(){
		a = 66;
	},0);
	alert(a);	//6
</script>
```

2.时间值越小越不稳定

3.打开其他窗口时，该窗口定时器时间会变长

> *定时器的最佳时间：30ms (时间过小，程序性能开销大)

### (2) Timeout(过一段时间执行一次，只执行一次)
- 开启定时器
setTimeout(函数/函数名, 时间);

> 时间单位是毫秒

- 关闭定时器
clearTimeout(定时器的名字);

``` javascript
	<script>
		// 定时器先关后开
		var bSin = false;
		var timer = setInterval(function() {
			if(bSin) {
				return;
			}
			bSin = true;
		}, 30);

		function clear() {
			clearInterval(timer);
			bSin = false;
		}
	</script>
```

** **

##6. 日期对象
``` javascript
<script>
	// 获取时间
	var oDate = new Date();
	oDate.getFullYear();	// 获取年
	oDate.getMonth();		// 获取月，从0开始，获取+1，设置-1 !important
	oDate.getDate();		// 获取日
	oDate.getDay();			// 获取星期，星期天 -> 0，星期一 ~ 星期六 -> 1 ~ 6

	oDate.getHours();		// 获取小时，记得加s，下同 !important
	oDate.getMinutes();		// 获取分钟
	oDate.getSeconds();		// 获取秒
	oDate.getMillseconds();	// 获取毫秒
	oDate.getTime(); 		// 时间戳 当前时间距离1970/1/1凌晨的毫秒数
</script>
```

``` javascript
<script>
	// 设置时间
	var oDate = new Date();
	oDate.setFulllYear(2017, 11, 13);	// 设置年、月、日  月份设置时-1
	oDate.setHours(0, 0, 0, 0);			// 设置时、分、秒、毫秒

	// 获得时间戳
	oDate.getTime();	// 设置后的时间距离1970/1/1凌晨的毫秒数
</script>
```

##7. 日期对象应用
> oDate.setDate(31); // 假设本月有30天会跑到下个月的第一天 会自动进位
> oDate.setDate(0); // 会跑到上个月的最后一天

###本月有多少天
``` javascript
<script>
	var oDate = new Date();
	oDate.setMonth(oDate.getMonth() + 1); // 当前月份+1
	oDate.setDate(0);	// setDate(0);
	alert(oDate.getDate());

</script>
```
###本月第一天是周几
``` javascript
<script>
	var oDate = new Date();
	oDate.setDate(1);	// setDate(1);
	alert(oDate.getDay());
</script>
```

###本月最后一天是周几
``` javascript
<script>
	var oDate = new Date();
	oDate.setMonth(oDate.getMonth()+1);	// 当前月份+1
	oDate.setDate(0);	// setDate(0);
	alert(oDate.getDay());
</script>
```

##8. 事件函数相同可以合并
eg: oDiv1.onmouseout = oDiv2.onmouseout = function() {};

##9. this
this: 当前方法属于谁，this就是谁
**this默认属于window**

定时器里的this不能直接使用，原因：this指向了window

###(1) 定时器中的this不指向元素，指向window
解决：在定时器外保存this
``` javascript
<script>
oBtn.onclick = function() {
	var _this = this;
	setTimeout(function(){
		_this.style.background = '#f00';
	},1000);
}
</script>
```
###(2) 调用封装函数使用this，this不指向元素，指向window
###(3) 低级浏览器attachEvent)事件绑定里面的this 报错

##10. 闭包
用处：
1. 解决变量名冲突
2. 解决循环添加事件，事件中的循环变量不能用的问题

``` javascript
<script>
	function clickEg() {
		//获取一组按钮	ps:js一组元素不能一起改变样式或设置事件
		var aBtn = document.getElementsByTagName('button');
		for(var i = 0; i < 3; i++) {
			aBtn[i].onclick = function() {
				//循环中的i变量此时已自增至3
				//aBtn[i].style.background = '#f00';

				//当前事件发生的对象 aBtn[i]为this
				this.style.background = 'f00';
			}
		}
	}
</script>

```
闭包写法：

``` javascript
<script>
	function clickEg() {
		//获取一组按钮	ps:js一组元素不能一起改变样式或设置事件
		var aBtn = document.getElementsByTagName('button');
		for(var i = 0; i < 3; i++) {
			(function(index) {
				aBtn[i].onclick = function() {
					aBtn[index].style.background = 'f00';
				}
			})(i);
		}
	}
</script>

```

---

``` javascript
<script>
	for(var i=0; i<2; i++) {
		setTimeout(function(){
			alert(i);
		}, 2000);
	}	// 结果：两秒后alert两次2，两秒后i已为2，然后执行两次循环
</script>

```
闭包写法：

``` javascript
<script>
	for(var i=0; i<2; i++) {
		(function(a){
			setTimeout(function(){
				alert(a);
			},2000);
		})(i);
	}	// 结果：两秒后alert 0、1
</script>

```

---
#blog4

---
##1. 参数的数组arguments
参数中的数组，函数中可以不需要定义参数
``` javascript
<script>
	sum(12, 5, 6);

	function sum() {
		console.log(arguments[1]);	// 5
	}
</script>

```

##2. 设置样式的三种方法
1. style.xxx
oDiv.style.width = '300px';

2. className
oDiv.className = 'active';

3. cssText
批量设置样式
oDiv.style.cssText = 'width: 300px; height: 300px';

##3. 字符串的相关方法
- str.charAt(i); 获取字符串中的第i+1个字符  返回值：相应位置的字符

> str[i]的兼容问题
获取字符串中的第i+1个
- str[i]  兼容：高级浏览器及IE8+
		  IE7 -> undefined
- str.charAt(i)  全兼容

- str.indexOf('w'); 查找w在字符串中的位置  返回值：成功 -> w在字符串中的位置  失败 -> -1

> 
1. 从左往右找
2. 区分大小写
3. 找到第一个相同值即停止
4. 查找多个字符时，返回第一个字符的位置

-  str.lastIndexOf('w'); 查找w在字符串中的位置  返回值：成功 -> w在字符串中的位置  失败 -> -1

> 从右往左倒序查找，返回的索引值与indexOf()规则相同

-  str.search('w'); 与indexOf()规则相同 **常用于正则**

-  str.substring(开始位置, 结束位置); 截取字符串，包含开始位置，不包含结束位置

> str.substring(开始位置); 截取字符串 **从开始位置一直截取到最后**

-  str.substr(开始位置, 截取字符串长度); 定长截取字符串

-  str.slice(开始位置, 结束位置); 截取字符串

-  str.match('w'); 在字符串中匹配w **常用于正则** 返回值：成功 -> 匹配的w  失败 -> null

-  str.split('w'); 切割字符串 **返回值类型：数组**

> 
1. 字符串按w割开，去掉w后组成的数组
2. **若没找到w则原样返回一个长度为1的数组**
3. 若为''(空字符串，无空格)则返回将str中每个字符逐个拆开的数组

-  str.toUpperCase(); str转大写
    str.toLowerCase(); str转小写

-  str.replace('xxx', 'yyy'); **常用于正则** 参数：被替换内容,替换内容

> 
1. **修改第一个被替换内容**
2. **替换不修改原字符串, 需重新声明**
3. **第二个参数可为一个方法**
4. **replace可以连用**

``` javascript
<script>
	var str = 'xxa';
    str.replace('x','y');
    str2 = str.replace('a', 'b');
    str3 = str.replace('x', 'y').replace('a', 'b');
    alert(str);     // xxa
    alert(str.replace('x', 'y'));   // yxa
    alert(str2);    //xxb
    alert(str3);    //yxb
</script>
```
``` javascript
<script>
	var str = 'xxxy';
    var str2 = str.replace('xxx', function(s){
        alert(s);	// xxx  被替换字符 数据类型：string
        var str2 = '';
        for(var i = 0; i < s.length; i++) {
            str2 += '*';
        }
        return str2;	// 替换后的内容
    });

    alert(str2);	// ***y
</script>
```

-  str.charCodeAt(i);	// 获取字符串中的第i+1个字符对应的ASCII编码

> a-> 0x61 -> 97
> b-> 0x62 -> 98
> z -> 0x7A -> 122

##4. 字符串比较
- 英文 按照字典序(a~z)依次比较，z为最大；从两字符串的第一个字符开始，若相当再比较下一个字符
- 数字 按照数字大小依次；从两字符串的第一个字符开始，若相当再比较下一个字符
- 汉字 按照unicode大小比较

##5. 字符串应用
###判断浏览器的类型
window.navigator.userAgent
eg:
``` javascript
<script>
	if(window.navigator.userAgent.indexOf('Chrome') != -1) {
		console.log('Chrome');
	} else if(window.navigator.userAgent.indexOf('Firefox') != -1) {
		console.log('Firefox');
	} else if(window.navigator.userAgent.indexOf('MSIE7.0') != -1) {
		consolle.log('IE7');
	} else {
		console.log('others');
	}
</script>
```
###判断上传文件格式
eg:
``` javascript
<script>
	var index = str.lastIndexOf('.');
   	var type = str.substring(index+1);	//返回文件类型名
</script>
```

##6. 定义数组
1. var arr = [1, 2, 3];
2. var arr = new Array(1, 2, 3);

> Array()只传一个参数时表示定义一个新数组的长度
> new Array(10); 定义一个长度为10的数组

##7. 数组的相关方法
-  arr.push('w'); 往数组最后面添加一项  返回值：新添加的那项
-  arr.unshift('w'); 往数组最前面添加一项  **返回值：新数组长度**
-  arr.pop(); 删除数组最后一项  返回值：删除的那项
-  arr.shift(); 删除数组最前一项  返回值：删除的那项
-  arr.join('w'); 数组各项用w连接成一个字符串  **返回值类型：字符串**
-  arr.concat(arr2, arr3, ...); 数组arr与arr2、arr3...连接
-  arr.reverse(); 数组翻转
-  arr.sort(); 数组排序(按字典序和数字序列)

> 高级排序 数值排序
- 从小到大
arr.sort(function(n1, n2){
	return n1-n2;
});
- 从大到小
arr.sort(function(n1, n2){
	return n2-n1;
});

-  arr.splice(开始位置, 删除个数, 元素1, 元素2);

``` javascript
<script>
	var arr1=[1,2,3,4];
   arr1.splice(1, 0, 'a', 'b');	//添加：在1后添加'a','b'	返回值：返回空数组

   var arr2=[1,2,3,4];
   arr2.splice(1, 2); //删除：删除2、3	返回值：返回删除的各项

   var arr3=[1,2,3,4];
   arr3.splice(1, 1, 8, 88, 888) //修改：先删除再添加 把2改为8,88,888	返回值：返回删除的各项
</script>
```

> splice模拟方法
1) arr.push(c);    -> arr.splice(arr.length, 0, c);
2）arr.unshift(c); -> arr.splice(0, 0, c);
3）arr.pop();      -> arr.splice(arr.length-1, 1);
4）arr.shift();    -> arr.splice(0, 1);

##8. json(object类型)
json格式：{name:value,name2:value2, ...}
json标准格式：{"name":value, "name2":value2, ...}
> 所有键名需双引号,键值非数字时需加引号
> 键值对没有json.length
> json的name是唯一的

- 获取json值: json.name 或者 json['name']
- 添加/修改: json.aaa = 'bbb'; 或者 json['aaa'] = 'bbb';
- 删除: delete json.c; 或者 delete json['c'];

- 判断json内某个属性是否存在

``` javascript
<script>
	var json = {a: 1, b: 2};
	alert('c' in json);	// false 属性c不存在
</script>
```

###json和数组的区别
####length
- 数组：有length
- json：没有length

####循环遍历方法
- 数组：for(var i=0;i<arr.length;i++){alert(arr[i])};	for循环
- json：for(var name in json){alert(json[name])};		for in循环

###访问元素下标类型
- 数组：arr[1]  数字
- json：json['a']  字符串

####顺序
- 数组：有序，根据下标访问
- json：无序，根据键名访问

##9. Math方法
1. `Math.random()`	 			0-1随机数（不包含1）
2. `Math.abs(num)`			绝对值
3. `Math.max(num1, num2, ...)`	最大数
4. `Math.min(num1, num2, ...)`	最小数
5. `Math.floor(num)`			向下取整	12.4 -> 12	12.6 -> 12
6. `Math.ceil(num)`			向上取整	12.5 -> 13	12.1 -> 13
7. `Math.pow(n, m)`			n的m次方	Math.pow(2, 3)=8;
8. `Math.sqrt(num)`			num开平方	Math.sqrt(9)=3;
9. `Math.round(num)`			四舍五入	12.1 -> 12	12.6 -> 13

> `num.toFixed(保留小数个数);`  保留几位小数(自动四舍五入)

##10. try-catch捕获异常
``` javascript
<script>
	try {
		// code
	} catch(ex) {	// exception
		console.log(ex.message);	// 查看错误信息

		// 错误的提示信息
		// 补救的代码
	}
</script>
```

---
#blog5(数组应用)
---
### 1. 数组翻转方法2
eg:
``` javascript
<script>
	var arr=[1,2,3,4];
	var arr2=[];
	while(arr.length) {
		var num=arr.pop();
		arr2.push(num);
	}
	alert(arr2);
</script>
```

### 2. 首字母大写
eg:
``` javascript
<script>
	var str = 'welcome to china';
	var arr = str.split(' ');
	var arr2 = [];
	for(var i = 0; i < arr.length; i++) {
		var first = arr[i].charAt(0).toUpperCase();
		var other = arr[i].substring(1);
		arr2.push(first + other);
	}
	alert(arr2.join(' '));

    //正则写法
	var str2 = str.replace(/\w+/g, function(s) {
		return s.charAt(0).toUpperCase().substring();
	})
	alert(str2);
</script>
```

### 3.快速清空数组
1. length=0;
2. arr=[];
3. arr.splice(0,arr.length);
4. 循环pop或shift

### 4. 数组排序方法
更多方法见后续排序算法篇

``` javascript
<script>
	function findMinIndex(arr, start) {
		var iMin = arr[start];
		var iMinIndex = start;
		for(var i = start + 1; i < arr.length; i++) {
			if(iMin > arr[i]) {
				iMin = arr[i];
				iMinIndex = i;
			}
		}
		return iMinIndex;
	}

	for(var i = 0; i < arr.length; i++) {
		var iMinIndex = findMinIndex(arr, i);
		var temp;
		temp = arr[iMinIndex];
		arr[iMinIndex] = arr[i];
		arr[i] = temp;
	}
</script>
```

### 5. 数组内查找元素是否存在
``` javascript
<script>
	function findInArr(item, arr) {
		for(var i = 0; i < arr.length; i++) {
			if(item == arr[i]) {
				return true;
			} else {
				return false;
			}
		}
	}
</script>
```

### 6. 数组去重的多种方法
#### (1)findInArr

``` javascript
<script>
	var arr2 = [];

	for(var i = 0; i < arr.length; i++) {
		if(!findInArr(arr[i], arr2)) {
			arr2.push(arr[i]);
		}
	}

	// 数组内查找元素是否存在
	function findInArr(item, arr) {
		for(var i = 0; i < arr.length; i++) {
			if(item == arr[i]) {
				return true;
			} else {
				return false;
			}
		}
	}
</script>
```

#### (2)json(自动从小到大排序)

``` javascript
<script>
	var json = {};
	var arr2 = [];

	for(var i = 0; i < arr.length; i++) {
		json[arr[i]] = 'xxx';
	}

	for(var name in json) {
		arr2.push(name);
	}
</script>
```

#### (3)sort()

``` javascript
<script>
	arr.sort();
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == arr[i+1]) {
			arr.splice(i, 1);
			i--;
		}
	}
</script>
```

#### (4) indexOf
这个方法是在前端公众号偶然看到的，数组的indexOf方法第一次用到

``` javascript
<script>
	for(var i = 0; i < arr.length; i++) {
		if(arr2.indexOf(arr[i] < 0)) {
			arr2.push(arr[i]);
		}
	}
</script>
```

#### (5)二分法

``` javascript
<script>
	var arr = [1, 2, 3, 2, 4, 3, 1, 5, 7, 2, 5];

	// 数组内查找元素是否存在
	function findInArr(item, arr) {
		for(var i = 0; i < arr.length; i++) {
			if(item == arr[i]) {
				return true;
			}
		}
        return false;
	}

	function del(arr, s, e) {
		if(s > e) {
			return [];
		} else if(s == e) {
			return [arr[s]];
		}

		var c = Math.floor((s + e) / 2);
		var l = del(arr, s, c);
		var r = del(arr, c + 1, e);

		for(var i = 0; i < r.length; i++) {
			if(!findInArr(r[i], l)) {
				l.push(r[i]);
			}
		}

		return l;
	}

	console.log(del(arr, 0 , arr.length - 1));
</script>
```
---
#blog6

---
##1. select下拉框的相关属性
- 选中的索引值
oSel.selectedIndex
- 获取所有选项
oSel.options
- 获取选中的选项的文本内容
oSel.options[oSel.selectedIndex].innerHTML
oSel.options[oSel.selectedIndex].text
- 添加选项
var option = new Option(文本内容, value值);
oSel.options.add(option);
- 删除选项
oSel.options.remove(index);

##2. 预解析
变量和函数的定义会预先解析，解析在当前script标签内的最上面
> 作用域：(1)script (2)函数

``` javascript
<script>
	var a = 111;
	function show() {
		alert(a);
		var a = 12;
		// 相当于
		// var a;
		// alert(a);	//undefined
		// a = 12;
	}
	show();		// undefined
	alert(a);	// 111
</script>
```

##3. 已知计算机编码查看对应单词
String.fromCharCode('0x4e00');	 // 对应中文 "一"
- 第一个中文 	0x4e00 一
- 最后一个中文	0x9fa5 龥(yu)

**unicode编码：以\u开头 \u4e00(一) ~ \u9fa5(龥)**

##4. 字节长度和编码的关系
英文、数组都占1个字节，与编码格式无关
UTF-8；中文占3个字节
GB2312：中文占2个字节

###封装一个求字节长度的函数
``` javascript
<script>
	function getBytesLen(str, type) {	// 字符串，编码格式
		var result = 0;
		type = type.toLowerCase();
		for (var i = 0; i < str.length; i++) {
			if(str.charAt(i) >= '\u4e00' && str.charAt(i) <= '\u9fa5') {
				if(type == 'gb2312') {
					result += 2;
				} else {
					result += 3;
				}
			} else {
				result++;
			}
		}
		return result;
	}
</script>
```

##5. 严格模式
**非严格模式下，没有用var定义变量时为全局变量，全局的东西都属于window**
``` javascript
<script>
	function show(){
		a = 12;		//a没有var时a为全局变量
		alert(a);	//1. 12
	}
	show();		//需先调用show函数
	alert(a);	//2. 12
</script>
```
严格模式

在script标签内最上面写` 'use strict'; `   **IE6不识别但不报错**

`'use strict';`好处：
1. 修复局部this的问题
2. 不允许if/while/for里面定义函数
3. 去掉了with(){}
4. 定义变量必须加var

作用域：(1)当前script标签内 (2)函数  (3)js文件


**坑**
``` javascript
<script>
	var a = 5;
	if(a % 2) {
		function show() {
			alert('单数');
		}
	} else {
		function show() {
			alert('双数');
		}
	}
	show();	// 单数 最新版高级浏览器中预解析不会覆盖，之前版本预解析后此例预解析覆盖 弹出双数
</script>
```

``` javascript
<script>
	'use strict';
	var a = 5;
	if(a % 2) {
		function show() {
			alert('单数');
		}
	} else {
		function show() {
			alert('双数');
		}
	}
	show();	// show is not defined，严格模式不允许if/for里面定义函数
</script>
```

##6. 连等及逗号运算符
###连等
**函数内部使用连等定义变量，第一个是局部变量，其余是全局变量。**

``` javascript
<script>
	function show(){
		var a=b=c=1;	//a是局部变量，b、c是全局变量
	}
</script>
```

###逗号运算符
**逗号运算符 以最后一个为准**

``` javascript
<script>
	var a = (1, 2, 3); // a=3

	for (var i = 0, j = 5, k = 8; i < 10, j < 10, k < 10; i++, j++, k++) {

	}
	alert(i + j + k); // 2+7+10=19
</script>
```

##7. 文本提示框
聚焦事件：oT.onfocus = function() {};
失焦事件：oT.onblur = function() {};
> 强制获取一个焦点：oT.focus();
> 强制失去一个焦点：oT.blur();

##8. form表单
想要提交数据须有
1. action 提交的地址 <form action=''></form>
2. name   数据名称   <input name="user.tel" />
3. value  数据       input.value

提交方式
1. get(默认) 容量32K左右  不安全，有缓存
** 好处：(1)分享 (2)收藏**

2. post      容量1G左右   相对安全，没有缓存

> 缓存(cache)
对于浏览器而言，相同的地址只会访问一次


---
#blog7(js组成)
---
##1. js的组成部分

###ECMA
ECMAScript(**js核心**)

*兼容：完全兼容
eg:
` if(){}
arr.pop();`
###DOM
Document Object Model  文档对象模型

*兼容：大部分兼容，不兼容可以作兼容处理
eg:
`document.getElementById('id')
 oDiv.style.background = 'red';`
###BOM
Browser Object Model  浏览器对象模型

*兼容：根据使用浏览器来，根本不兼容，且不能作兼容处理
eg:
`window.navigator.userAgent
 alert();`

##2. DOM节点关系
1. 父子节点

- 子节点：父节点.children;	(一级，一层)

- 父节点：子节点.parentNode;

2. 兄弟节点

 - 上一个兄弟节点：
      obj.perviousElementSibling;
            *兼容：高级浏览器
      obj.previousSibling
            *兼容：全兼容
            高级浏览器 -> object text
            低级浏览器 -> 能获取相应的节点

	**兼容写法**

	var oPrev = obj.previousElementSibling || obj.previousSibling;
 - 下一个兄弟节点
       obj.nextElementSibling
             *兼容：高级浏览器
      obj.nextSibling
             *兼容：全兼容
              高级浏览器 -> object text
              低级浏览器 -> 能获取相应的节点

	**兼容写法**

	var oNext = obj.nextElementSibling || obj.nextSibling;

3. 首尾节点

    - 首节点
        父节点.firstElementChild

				*兼容：高级浏览器
				低级浏览器 -> undefined

	 父节点.firstChild

		         *兼容：全兼容
                  高级浏览器 -> object text
                  低级浏览器 -> 能获取相应的节点

	**兼容写法**

	(1) 父节点.fisrtElementChild || 父节点.firstChild

	(2) 父节点.children[0]

    - 尾节点
         父节点.lastElementChild
                    *兼容：高级浏览器
                     低级浏览器 -> undefined
         父节点.lastChild
                    *兼容：全兼容
                     高级浏览器 -> object text
                     低级浏览器 -> 能获取相应的节点

	**兼容写法**

	(1) 父节点.lastElementChild || 父节点.lastChild

	(2) 父节点.children[父节点.children.length - 1]

##3. DOM节点操作
1. 创建一个节点
	var obj = document.createElement('tagName');
2. 添加一个节点
	父节点.appendChild(要添加的节点);
	父节点.insertBefore(要添加的节点, 在谁前面添加);
3. 删除一个节点
	父节点.removeChild(要删除的节点);
4. 替换一个节点
	父节点.replaceChild(新节点, 删除的节点);

##4. DOM属性操作
1. .
2. []
3. 可操作自定义属性
  - 获取属性 obj.getAttribute(属性的名字);
  - 设置属性 obj.setAttribute(属性的名字, 值);
  - 删除属性 obj.removeAttribute(属性的名字);

> 获取设置属性方法尽量不混用

##5. BOM
1. window.open(地址, 方式);	 打开新窗口
	返回值：新的窗体对象
		Chrome：拦截
		FF：阻止
		IE：直接打开
		*：用户自己打开的都不拦截
	打开方式：
		(1) _blank 新窗口打开(默认)
		(2) _self  当前页面打开
	about:blank  空白页
2. window.close();			关闭当前窗口
		Chrome：直接关闭
		FF：没有反应
		IE：提示
		*：只能关闭自己open出来的窗口
3. window.location  		获取地址栏信息
	返回值数据类型：object
  - window.location.href    	获取地址栏信息
	返回值数据类型：string
  - window.location.search  	获取地址栏信息中的数据
	返回值：?(包括?)后面的值
  - window.location.hash    	获取地址栏信息中的锚点
	返回值：#(包括#)后面的值
  - window.location.protocol 	获取地址栏信息中的协议
	返回值：eg: http:
  - window.location.host      获取地址栏信息中的域名
	返回值：eg：localhost:8080  baidu.com
  - window.location.port      获取地址栏信息中的端口
	返回值：eg：8080
   - window.location.pathname  获取地址栏信息中的路径
	返回值：eg：/../../xxx.html
4. window.history           获取地址的历史信息
 - window.history.forward()  前进
  - window.history.back()     后退
  - window.history.go(数字)	
  前进时数字>0  ->  1代表前进1个页面
  后退时数字<0  ->  -1代表后退1个页面
5. window.location.reload();  强制刷新页面


---
#blog8(各种宽高，距离)
---
##1. 滚动距离
**html简写：document.documentElement**
- document.body.scrollTop
	兼容：Chrome
	其他 -> 0
- document.documentElement.scrollTop
	兼容：IE、FF
	其他 -> 0

**兼容写法**
纵向：var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
横向：var scrollL = document.documentElement.scrollLeft || document.body.scrollLeft;

##2. 滚动高度
obj.scrollHeight
- 内容高度 > 盒模型高度    取内容高度
- 盒模型高度 > 内容高度    去盒模型高度

##3. 可视区高度
- 可视区高度：var clientH = document.documentElement.clientHeight;
- 可视区宽度：var clientW = document.documentElement.clientWidth;

兼容：全兼容

##4. 物体高度
**获取的是盒模型大小 = width/height + padding + border;**

- 物体的高度：var oH = obj.offsetHeight;
- 物体的宽度：var oW = obj.offsetWidth;

> 注意：offsetWidth/height只有append进body后才有，创建时获取不到盒模型的大小。

##5. offsetHeight && getStyle()

| 	   	| 		offsetHeight      |     getStyle() 	 		 |
| :--: 	| 	   :----: 	          |   :----: 	 		     |
|返回值 | 	   数字  	  		  |   		字符串 		     |
|获取值 | 获取的是盒模型的大小(width/height+padding+border)  |   获取的是纯width/height			 |
| display:none后   | 	   0    |   仍可以获取 				 |

##6. 物体的相对距离
- 物体距离定位父级左边距离：var oL = obj.offsetLeft;
- 物体距离定位父级上边距离：var oT = obj.offsetTop;

##7. 关于父级
- 结构父级 obj.parentNode    根：document
- 定位父级 obj.offsetParent  根：body

##8. 封装一个物体距离左边/上边的绝对位置的函数
``` javascript
<script>
	function getPos(obj) {
		var l = 0;	// 距离左边的绝对距离
		var t = 0;	// 距离上边的绝对距离
		while(obj) {
			l += obj.offsetLeft;
			t += obj.offsetTop;
			obj = obj.offsetParent;	// 继续查找上一层定位父级
		}

		return {left: l, top: t};
	}
</script>

```


---
#blog9(事件篇)
---

## 1. 事件对象
- event  事件对象(系统自带)  
 *兼容：Chrome IE系
  FF -> 报错
- ev     事件函数传入参数 
  *兼容：高级浏览器(Chrome、FF、IE9+)
   IE8- -> undefined

**兼容写法**：var oEvent = ev || event;

## 2. 事件冒泡
概念：子级的事件会传递给父级。如果父级有相同的事件，会依次从内到外执行，直到相同事件的祖宗节点，否则会继续冒泡。

**阻止事件冒泡：**

子级事件内添加  `oEvent.cancelBubble = true;`

## 3. 事件绑定
**有效解决事件冲突**

- obj.addEventListener(事件名, 函数名/函数, 是否捕获);

*兼容：高级浏览器

事件名 -> 不能加'on'

函数名 -> 不能加括号

是否捕获 -> false

- obj.attachEvent(事件名, 函数名/函数);

*兼容：IE10-

事件名 -> 必须加'on'

函数名 -> 不能加括号

**兼容写法**

封装一个事件绑定的函数
``` javascript
<script>
	function addEvent(obj, sEv, fn) {	//对象, 事件(不加on), 函数名/函数
		if(obj.addEventListner) {	//高级浏览器 -> function  低级 ->undefined
			//高级浏览器
			obj.addEventListener(sEv, fn, false);
		} else {
			//低级浏览器
			obj.attachEvent('on' + sEv, fn);
		}
	}
</script>
```


## 4. 关于捕获(这点理解不是很到位)
事件冒泡：子级 -> 父级
设置捕获：父级 -> 子级

## 5. 事件解绑
- obj.removeEventListener(事件名, 函数名/函数, 是否捕获);

*兼容：高级浏览器

**注意：函数不能是匿名函数，每个匿名函数都相当于新创建了一个函数。**

创建函数 var show = new Function('a','b', 'alert(a + b)');

- obj.detachEvent(事件名, 函数名/函数);

*兼容：IE10-

**兼容写法**

封装一个事件解绑的函数
``` javascript
<script>
	function removeEvent(obj, sEv, fn) {	//对象, 事件(不加on), 函数名/函数
		if(obj.removeEventListner) {	//高级浏览器 -> function  低级 ->undefined
			//高级浏览器
			obj.removeEventListener(sEv, fn, false);
		} else {
			//低级
			obj.detachEvent('on' + sEv, fn);
		}
	}
</script>
```


## 6. 查看鼠标点击位置

var oEvent = ev || event;

X轴：oEvent.clientX;

Y轴：oEvent.clientY;

## 7. 键盘事件

1. obj.onkeydown  按下键盘触发
2. obj.onkeyup    释放键盘触发
3. obj.oninput	 	  键盘输入时实时触发
*兼容：高级浏览器
IE9删除时有问题

- obj.onpropertychange	键盘输入时实时触发
*兼容：IE10-
IE9删除时有问题


**兼容处理**

事件的兼容不需要处理，直接连等

obj.oninput = obj.onpropertychange = function() {}

*处理IE9：定时器


封装一个实时统计字数的函数
``` javascript
<script>
	function calLen(obj1, obj2) {
		if (window.navigator.userAgent.indexOf('MSIE 9.0') != -1) { //IE9
			var timer = null;
			obj1.onfocus = function() {
				timer = setInterval(function() {
					obj2.innerHTML = obj1.value.length;
				}, 50);
			};
			obj1.onblur = function() {
				clearInterval(timer);
			}
		} else { //能不添加定时器时就不添加
			obj1.oninput = obj1.onpropertychange = function() { //高级浏览器、IE10-
				obj2.innerHTML = obj1.value.length;
			}
		}
	}
</script>
```

应用：实时统计输入字数

### 键码 `oEvent.keyCode`

**重要**
- 0~9：48~57
- a~z：65~90
- ctrl：17
- delete：46
- backspace：8
- enter：13
- 左键：37
- 上键：38
- 右键：39
- 下键：40

> 组合键(js中键码不能组合使用)

- ctrl  -> ctrlKey
- shift -> shiftKey
- alt   -> altKey

eg:
`if(oEvent.ctrlKey && oEvent.shiftKey && oEvent.keyCode == 65){...}`

## 8. 鼠标事件
1. obj.oncontextmenu 点击鼠标右键触发(有默认右键菜单行为)

  > 默认行为：
  > 点击右键有菜单 文本框能输入内容 点击a标签能跳转等

  **阻止默认行为：return  false;**

  应用：自定义右键菜单
  应用：自定义输入框

2. obj.onmousedown	按下鼠标时触发
3. obj.onmouseup	抬起鼠标时触发
4. obj.onmousemove	鼠标移动触发

  应用：拖拽
  应用：拖拽(带框)
  应用：磁性吸附

5. obj.onmouseover  鼠标移入时触发

6. obj.onmouseout   鼠标移出时触发

  **问题**

  问题1：移入子级也算重新移入
  解决1：onmouseover -> onmouseenter

  问题2：移出子级也算移出
  解决2：onmouseout -> onmouseleave

7. obj.onmousewheel  滚动鼠标滚轮触发

*兼容：Chrome IE系

DOMMouseScroll       DOM滚轮事件(**DOM事件只能通过事件绑定添加**)

*兼容：FF

**兼容写法**
``` javascript
<script>
	if (window.navigator.userAgent.indexOf('FireFox') != -1) {
		document.addEventListener('DOMMouseScroll', function() { //FF
			//scroll code here
		}, false)
	} else {
		document.onmousewheel = function() { //Chrome IE系
			//scroll code here
		}
	}
</script>
```

###判断滚动方向
- oEvent.wheelDelta

	*兼容：Chrome IE系

	向上：120

	向下：-120

- DOMMouseScroll

	*兼容：FF

	向上：-3

	向下：3

**兼容写法**

封装一个鼠标滚动方向的函数

``` javascript
<script>
	function addWheel(obj, fn) { //向上fn(false)，向下fn(true)
		function wheel(ev) {
			var oEvent = ev || event;

			// var bDown = true;				//默认向下 -->
			// if(oEvent.wheelDelta) {			//FF -> undefined
			// 	//Chrome IE系
			// 	bDown = oEvent.wheelDelta < 0;
			// } else {
			// 	//FF
			// 	bDown = oEvent.detail > 0;
			// }

			var bDown = oEvent.wheelDelta ? oEvent.wheelDelta < 0 : oEvent.detail > 0;

			//判断是否传入函数，执行回调函数
			fn && fn(bDown);

			//FF阻止默认
			oEvent.preventDefault && oEvent.preventDefault();

			//阻止默认
			return false;
		}

		if (window.navigator.userAgent.indexOf('FireFox') != -1) {
			//FF
			document.addEventListener('DOMMouseScroll', wheel, false); //事件中阻止默认没有用
		} else {
			//Chrome IE系
			// document.onmousewheel = wheel;
			addEvent(obj, 'mousewheel', wheel);
		}
	}
</script>

```

  > oEvent.preventDefault();
  兼容：高级浏览器
  IE8- -> undefined

  应用：自定义滚动条

## 9. domReady
- DOMContentLoaded 当DOM加载完成时触发(在页面前) **DOM事件必须通过事件绑定添加**
*兼容：高级浏览器

- onreadystatechange 模拟domReady

**兼容写法**
封装domReady全兼容方法

``` javascript
<script>
	function domReady(fn) {
		if (document.addEventListener) {
			//高级浏览器
			document.addEventListener('DOMContentLoaded', function() {
				fn && fn();
			}, false);
		} else {
			//低级浏览器  模拟domReady
			document.onreadystatechange = function() {
				if (document.readyState == 'complete') {	// 全兼容
					fn && fn();
				}
			}
		}
	}
</script>
```

## 10. 事件委托
概念：子级自己的事件可以委托给父级处理

好处： (1)提高性能  **(2)可以给未来的子元素添加事件**

## 11. 事件源
- oEvent.target
  *兼容：高级浏览器
  低级浏览器 -> undefined

- oEvent.srcElement
  *兼容：Chrome、IE系
  FF -> undefined

**兼容写法**
var oSrc = oEvent.srcElement || oEvent.target;

> 注意：oSrc.tagName获取到的标签名都是大写

###给子级循环添加事件 闭包的替代写法 -> 委托
``` javascript
<script>
	oUl.onclick = function(ev) {
		var oEvent = ev || event;
		var oSrc = oEvent.scrElement || oEvent.target;
		if (oSrc.tagName == 'LI') {	// **注意获取到的标签名都是大写
			this.style.background = '#f00';
		}
	}
</script>
```

---
#blog10(原生运动框架)
---

## move.js

``` javascript
<script>

	function move(obj, json, options) {

		// 运动物体，{改变的属性及终态}，{总时间，运动形式，链式运动的回调}

		options = options || {};
		options.duration = options.duration || 700;  // 默认总时间 [可自定义]
		options.easing = options.easing || 'linear';  // 默认运动形式 [可自定义]

		clearInterval(obj.timer);

		var start = {};  // 起点
		var dis = {};  // 总距离

		for(var name in json) {
			start[name] = parseFloat(getStyle(obj, name));  // 字符串转数字，并保留小数(透明度)
			dis[name] = json[name] - start[name];
		}

		var count = Math.floor(options.duration / 30);  // 总次数 30ms 最佳定时器时间
		var n = 0;
		obj.timer = setInterval(function(){  // 自定义属性加定时器
			n++;
			for(var name in json) {
				switch(options.easing) {  // 自定义运动形式
					case 'linear':
						var a = n / count;
						var cur = start[name] + dis[name] * a;  // 匀速
						break;
					case 'ease-in':
						var a = n / count;
						var cur = start[name] + dis[name] * Math.pow(a, 3);  // 加速 a的3次方 [可自定义]
						break;
					case 'ease-out':
						var a = 1 - n / count;
						var cur = start[name] + dis[name] * (1 - Math.pow(a, 3));  // 减速 [可自定义]
						break;
				}

				if(name == 'opacity') {  // 若改变属性为透明度时另作处理
					obj.style.opacity = cur;
					obj.style.filter = 'Alpha(opacity:' + cur * 100 + ')';
				} else {
					obj.style[name] = cur + 'px';
				}
			}

			if( n == count) {
				clearInterval(obj.timer);
				options.complete && options.complete();  // 链式运动
			}
		}, 30);  // 30ms 最佳定时器时间
	}

	function getStyle(obj, name) {
		return (obj.currentStyle || getComputedStyle(obj, false))[name];
	}


</script>
```

---
#blog11(move框架应用) (上)
---

## 1. 仿jiaThis分享到

[JiaThis - 社会化分享按钮及移动端分享代码提供商！](http://www.jiathis.com/)

``` css
<style>
	* {
		margin: 0;
		padding: 0;
	}
	body {
		overflow: hidden;
	}
	#box {
		position: absolute;
		right: -140px;
		top: 50%;
		margin-top: -75px;
		padding: 20px;
		width: 100px;
		height: 150px;
		background: rgba(0, 0, 0, .1);
		color: #fff;
		font-size: 20px;
	}
	#box span {
		position: absolute;
		left: -20px;
		width: 20px;
		height: 60px;
		line-height: 20px;
		background: #fe0;
		color: #fff;
		font-size: 12px;
		text-align: center;
	}
</style>
```

``` html
	<div id="box">
		<span>分享到</span>
		<p>QQ</p>
		<p>WeChat</p>
		<p>sina</p>
	</div>
```

``` javascript
<script type="text/javascript" src='move.js'></script>
<script type="text/javascript">
	window.onload = function() {
		var oBox = document.getElementById('box');
		var oSpan = oBox.children[0];

		oBox.onmouseover = function() {
			move(oBox, {right: 0}, {duration: 300});
		}

		oBox.onmouseout = function() {
			move(oBox, {right: -140}, {duration: 300});
		}
	}
</script>
```

效果示例
![move框架应用 - 仿jiaThis分享到](http://ojvx9eehr.bkt.clouddn.com/jiaThis%E5%88%86%E4%BA%AB%E5%88%B0.gif)

## 2. 幻灯片

``` css
<style>
	* {
		margin: 0;
		padding: 0;
	}
	#box {
		position: relative;
		margin: 50px auto;
		width: 400px;
		height: 300px;
		overflow: hidden;
	}
	ul {
		position: absolute;
		top: 0;
		left: 0;
		width: 1200px;
		height: 250px;
	}
	ul li {
		width: 400px;
		height: 250px;
		float: left;
		list-style: none;
	}
	ul li img {
		width: 100%;
		height: 100%;
	}
	ol {
		position: absolute;
		left: 50%;
		bottom: 50px;
		margin-left: -45px;
	}
	ol li {
		margin: 10px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: 1px solid #fff;
		font-size: 8px;
		text-align: center;
		line-height: 10px;
		color: #fff;
		cursor: pointer;
	}
	ol li.active {
		background: #ccc;
	}
</style>
```

``` html
	<div id="box">
		<ul>
			<li><img src="img/slide1.jpg"></li>
			<li><img src="img/slide2.jpg"></li>
			<li><img src="img/slide3.jpg"></li>
		</ul>
		<ol>
			<li class="active">1</li>
			<li>2</li>
			<li>3</li>
		</ol>
	</div>
```

``` javascript
<script type="text/javascript" src='move.js'></script>
<script type="text/javascript">
	window.onload = function() {
		var oBox = document.body.children[0];
		var oUl = oBox.children[0];
		var oOl = oBox.children[1];
		var aLi = oUl.children;
		var aLi2 = oOl.children;

		for(var i = 0; i < aLi2.length; i++) {
			aLi2[i].index = i;
			(function(index) {
				aLi2[i].onmouseover = function() {
					for(var i = 0; i < aLi2.length; i++) {
						aLi2[i].className = '';
					}
					this.className = 'active';
					move(oUl, {marginLeft: - this.index * aLi[0].offsetWidth}, {duration: 500});
				}
			})(i);
		}
	}
</script>
```

效果示例
![move框架应用 - 幻灯片](http://ojvx9eehr.bkt.clouddn.com/move%E6%A1%86%E6%9E%B6%E5%BA%94%E7%94%A8%20-%20%E5%B9%BB%E7%81%AF%E7%89%87.gif)


## 3. 手风琴

``` css
<style>
	* {
		margin: 0;
		padding: 0;
	}
	#box {
		position: relative;
		margin: 50px auto;
		width: 380px;
		height: 200px;
		overflow: hidden;
	}
	#box ul {
		width: 380px;
		height: 200px;
	}
	#box ul li {
		position: absolute;
		list-style: none;
		width: 380px;
		height: 200px;
	}
	#box ul li img{
		width: 100%;
		height: 100%;
	}
</style>
```

``` html
	<div id="box">
		<ul>
			<li><img src="img/slide1.jpg"></li>
			<li><img src="img/slide2.jpg"></li>
			<li><img src="img/slide3.jpg"></li>
			<li><img src="img/slide4.jpg"></li>
			<li><img src="img/slide5.jpg"></li>
		</ul>
	</div>
```

``` javascript
<script type="text/javascript" src='move.js'></script>
<script type="text/javascript">
	window.onload = function() {
		var oBox = document.body.children[0];
		var oUl = oBox.children[0];
		var aLi = oUl.children;

		var w = 30;
		for(var i = 1; i < aLi.length; i++) {
			aLi[i].style.left = oBox.offsetWidth - (aLi.length - i) * w + 'px';
		}

		for(var i = 0; i < aLi.length; i++) {
			aLi[i].index = i;
			aLi[i].onmouseover = function() {
				for(var i = 0; i < aLi.length; i++) {
					if(i <= this.index) {
						move(aLi[i], {left: i * w});  // 小于当前位置往右推
					} else {
						move(aLi[i], {left: oBox.offsetWidth - (aLi.length - i) * w});  // 大于当前位置往左推
					}
				}
			}
		}
		}
</script>
```

效果示例
![move框架应用 - 手风琴](http://ojvx9eehr.bkt.clouddn.com/%E6%89%8B%E9%A3%8E%E7%90%B4.gif)

## 4. 多图片展开

> 这个示例是有问题的，展开的z-index没有调整好，在此求解！

``` css
<style>
	* {
		margin: 0;
		padding: 0;
	}
	#box {
		position: relative;
		margin: 50px auto;
		width: 660px;
	}
	#box ul {
		width: 660px;
	}
	#box ul li {
		float: left;
		list-style: none;
		margin: 10px;
		width: 200px;
		height: 100px;
	}
	#box ul li img {
		width: 100%;
		height: 100%;
	}
</style>
```

``` html
	<div id="box">
		<ul>
			<li><img src="img/slide1.jpg"></li>
			<li><img src="img/slide2.jpg"></li>
			<li><img src="img/slide3.jpg"></li>
			<li><img src="img/slide4.jpg"></li>
			<li><img src="img/slide5.jpg"></li>
			<li><img src="img/slide6.jpg"></li>
			<li><img src="img/slide7.jpg"></li>
			<li><img src="img/slide8.jpg"></li>
			<li><img src="img/slide9.jpg"></li>
		</ul>
	</div>
```

``` javascript
<script type="text/javascript" src='move.js'></script>
<script type="text/javascript">
	window.onload = function() {
		var oBox = document.body.children[0];
		var oUl = oBox.children[0];
		var aLi = oUl.children;
		var bSin = false;

		var aPos = [];
		for(var i = 0; i < aLi.length; i++) {
			aPos[i] = {
				left: aLi[i].offsetLeft,
				top: aLi[i].offsetTop
			}
		}

		//浮动定位 -> 绝对定位
		for(var i = 0; i < aLi.length; i++) {
			aLi[i].style.position = 'absolute';
			aLi[i].style.left = aPos[i].left + 'px';
			aLi[i].style.top = aPos[i].top + 'px';
			aLi[i].style.margin = 0;
		}

		//移上中心放大动画
		for(var i = 0; i < aLi.length; i++) {
			aLi[i].index = i;
			aLi[i].onmouseover = function() {
				if(bSin) return;
				bSin = true;
				for(var i = 0; i < aLi.length; i++) {
					aLi[i].style.zIndex = 0;
				}
				move(this, {
					width: 600,
					height: 300,
					left: 30,
					top: 30
				});
				this.style.zIndex = 1;
			}

			aLi[i].onmouseout = function() {
				move(this, {
					width: 200,
					height: 100,
					left: aPos[this.index].left,
					top: aPos[this.index].top
				});
				bSin = false;
				// this.style.zIndex = 0;
			}
		}
	}
</script>
```

> 这个示例是有问题的，展开的z-index没有调整好，在此求解！

效果示例
![move框架应用 - 多图片展开](http://ojvx9eehr.bkt.clouddn.com/move%E6%A1%86%E6%9E%B6%E5%BA%94%E7%94%A8%20-%20%E5%A4%9A%E5%9B%BE%E7%89%87%E5%B1%95%E5%BC%80.gif)


---
#blog12(move框架应用) (中)
---

## 5. 运动时钟

``` css
<style>
	* {
		margin: 0;
		padding: 0;
	}
	#box {
		margin: 20px auto;
		width: 185px;
		height: 35px;
		line-height: 35px;
		overflow: hidden;
	}
	#box ul li {
		float: left;
		position: relative;
		list-style: none;
		width: 23px;
		height: 35px;
	}
	#box ul li img {
		position: absolute;
	}
</style>
```

``` html
	<div id="box">
		<ul>
			<li><img src="img/num.png"></li>
			<li><img src="img/num.png"></li>
			<li>:</li>
			<li><img src="img/num.png"></li>
			<li><img src="img/num.png"></li>
			<li>:</li>
			<li><img src="img/num.png"></li>
			<li><img src="img/num.png"></li>
		</ul>
	</div>
```
``` javascript
<script type="text/javascript" src='move.js'></script>
<script>
	function toDou(num) {
		return num < 10 ? '0' + num : '' + num;
	}

	window.onload = function() {
		var oBox = document.body.children[0];
		var oUl = oBox.children[0];
		var aImg = oUl.getElementsByTagName('img');

		clock();
		setInterval(clock, 1000);

		function clock() {
			var oDate = new Date();
			var iH = oDate.getHours();
			var iM = oDate.getMinutes();
			var iS = oDate.getSeconds();

			var str = toDou(iH) + toDou(iM) + toDou(iS);

			for(var i = 0; i < aImg.length; i++) {
				// aImg[i].style.top = - str.charAt(i) * 35 + 'px';
				move(aImg[i], {top: - str.charAt(i) * 35}, {duration: 500});
			}
		}
	}
</script>
```


效果示例
![move框架应用 - 动态时钟](http://ojvx9eehr.bkt.clouddn.com/%E5%8A%A8%E6%80%81%E6%97%B6%E9%92%9F.gif)

## 6. 返回顶部

> 此例因为涉及documentElement，move.js中没有相关判断，所以用move.js原理写了一个

``` css
<style>
	body {
		height: 3000px;
	    background: linear-gradient(red,blue);
	}
	input {
	    position: fixed;
	    right: 20px;
	    bottom: 20px;
	    display: none;
	}
</style>
```

``` html
	<input type="button" value="返回顶部" id="btn1" />
```
``` javascript
<script>
	window.onload = function() {
	    var oBtn = document.getElementById('btn1');

	    var timer = null;
	    // 添加滚动事件
	    var bSin = false;
	    window.onscroll = function() {
	        if (bSin) {
	            clearInterval(timer);
	        }
	        bSin = true;
	        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	        if (scrollT > 0) {
	            // 按钮出来
	            oBtn.style.display = 'block';
	        } else {
	            oBtn.style.display = 'none';
	        }
	    };

	    // 按钮事件
	    oBtn.onclick = function() {
	        // 先关后开
	        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	        clearInterval(timer);
	        var count = Math.floor(1000/30);
	        var dis = 0 - scrollT;
	        var n = 0;
	        timer = setInterval(function(){
	            bSin = false;
	            n++;
	            var a = 1-n/count;
	            var cur = scrollT + dis*(1-Math.pow(a,3));
	            document.documentElement.scrollTop = document.body.scrollTop = cur;
	            if (n == count) {
	                clearInterval(timer);
	            }
	        },30);
	    };
	};
</script>
```

效果示例
![move框架应用 - 返回顶部](http://ojvx9eehr.bkt.clouddn.com/%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8.gif)

## 7. 无缝滚动

> 此例资源为4张不重复图片，宽度为相应宽度*4

1. ul里的内容复制一份达到无缝的目的，再计算ul宽度

2. **模%求得余数**
  - 往左走(left负数)
	W = oUl.offsetWidth / 2;
	left -= 5;
	left = left % W;
  - 往右走(left正数)
	W = oUl.offsetWidht / 2;
	left += 5;
	left = (left % W - W) % W;

``` css
<style>
	* {
	    margin: 0;
	    padding: 0;
	}
	#box {
	    width: 1280px;
	    height: 220px;
	    border: 1px solid #000;
	    position: relative;
	    margin: 100px auto;
	    overflow: hidden;
	}
	#box ul {
	    position: absolute;
	    left: 0;
	    top: 0;
	}
	#box ul li {
	    float: left;
	    padding: 10px;
	    list-style: none;
	    width: 300px;
	    height: 200px;
	}
	#box ul li img {
	    width: 100%;
	    height: 100%;
	}
	#box span {
	    z-index: 2;
	    position: absolute;
	    top: 0;
	    width: 640px;
	    height: 220px;
	}
	#left {
	    left: 0;
	}
	#right {
	    right: 0;
	}
</style>
```

``` html
	<div id="box">
	    <ul>
	        <li><img src="img/slide1.jpg" alt=""></li>
	        <li><img src="img/slide2.jpg" alt=""></li>
	        <li><img src="img/slide3.jpg" alt=""></li>
	        <li><img src="img/slide4.jpg" alt=""></li>
	    </ul>
	    <span id="left"></span>
	    <span id="right"></span>
	</div>
```
``` javascript
<script>
	window.onload = function() {
	    var oBox = document.getElementById('box');
	    var oUl = oBox.children[0];
	    var oL = oBox.children[1];
	    var oR = oBox.children[2];
	    var aLi = oUl.children;

	    // 内容复制一份达到无缝的目的
	    oUl.innerHTML += oUl.innerHTML;

	    // 重新计算ul宽度
	    oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';

	    var timer = null;
	    oL.onmouseover = function() {
	        toLeft();
	    };
	    oR.onmouseover = function() {
	        toRight();
	    };

	    var left = 0;
	    var W = oUl.offsetWidth/2;

	    toRight();  // 默认向右滚动

	    function toRight() {
	        clearInterval(timer);
	        timer = setInterval(function(){
	            left += 5;
	            oUl.style.left = (left%W-W)%W + 'px';
	        },30);
	    }

	    function toLeft() {
	        clearInterval(timer);
	        timer = setInterval(function(){
	            left -= 5;
	            oUl.style.left = (left%W-W)%W + 'px';
	        },30);
	    }
	};
</script>
```
效果示例
![move框架应用 - 无缝滚动](http://ojvx9eehr.bkt.clouddn.com/%E6%97%A0%E7%BC%9D%E6%BB%9A%E5%8A%A8.gif)


## 8. 无缝幻灯片

1. ul里的内容复制一份达到无缝的目的，再计算ul宽度

2. **模%求得余数**
  - 往左走(left负数)
	W = oUl.offsetWidth / 2;
	left -= 5;
	left = left % W;
  - 往右走(left正数)
	W = oUl.offsetWidht / 2;
	left += 5;
	left = (left % W - W) % W;

``` css
<style>
	* {
		margin: 0;
		padding: 0;
	}
	#box {
		position: relative;
		margin: 50px auto;
		width: 600px;
		height: 350px;
		overflow: hidden;
	}
	#box ul {
		position: absolute;
	}
	#box ul li {
		float: left;
		list-style: none;
		width: 100%;
		height: 100%;

	}
	#box ul li img {
		width: 100%;
		height: 100%;
	}
	#box ol {
		position: absolute;
		left: 50%;
		bottom: 10px;
		width: 100px;
		margin-left: -50px;
	}
	#box ol li {
		float: left;
		margin: 5px;
		list-style: none;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #666;
		opacity: .7;
		cursor: pointer;
	}
	#box ol li.active {
		background: #fff;
	}
	#box a {
		position: absolute;
		z-index: 1;
		top: 50%;
		margin-top: -25px;
		width: 30px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background: #666;
		color: #fff;
		opacity: .1;
		border-radius: 2px;
		text-decoration: none;
	}
	#box a.prev {
		left: 0;
	}
	#box a.next {
		right: 0;
	}
</style>
```

``` html
	<div id="box">
		<a href="javascript:;" class="prev">←</a>
		<a href="javascript:;" class="next">→</a>
		<ul>
			<li><img src="img/slide1.jpg"></li>
			<li><img src="img/slide2.jpg"></li>
			<li><img src="img/slide3.jpg"></li>
			<li><img src="img/slide4.jpg"></li>
			<li><img src="img/slide5.jpg"></li>
		</ul>
		<ol>
			<li class="active"></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ol>
	</div>
```
``` javascript
<script type="text/javascript" src='move.js'></script>
<script>
	window.onload = window.onresize = function() {
		var oBox = document.body.children[0];
		var oPrev = oBox.children[0];
		var oNext = oBox.children[1];
		var oUl = oBox.children[2];
		var oOl = oBox.children[3];
		var aLi = oUl.children;
		var aBtn = oOl.children;

		var iNow = 0;

		oBox.onmouseover = function() {
			clearInterval(timer2);
			move(oPrev, {opacity: 0.7}, {duration: 500});
			move(oNext, {opacity: 0.7}, {duration: 500});
		}

		oBox.onmouseout = function() {
			carousel();
			move(oPrev, {opacity: 0.1}, {duration: 300});
			move(oNext, {opacity: 0.1}, {duration: 300});
		}

		for(var i = 0; i < aLi.length; i++) {
			aLi[i].style.width = oBox.offsetWidth + 'px';
		}
		oUl.innerHTML += oUl.innerHTML;
		oUl.style.width = aLi.length * (aLi[0].offsetWidth) + 'px';

		var timer2 = null;
		carousel();

		function carousel() {
			clearInterval(timer2);
			timer2 = setInterval(function() {
				iNow++;
				tab();
			}, 3000);
		}

		for(var i = 0; i < aBtn.length; i++) {
			aBtn[i].index = i;
			aBtn[i].onmouseover = function() {
				// iNow = this.index;

				//第几轮，解决第二轮之后上移运动回第一轮的问题
				iNow = Math.floor(iNow/aBtn.length)*aBtn.length+this.index;
				tab();
			}
		}

		oPrev.onclick = function() {
			iNow--;
			tab();
		}

		oNext.onclick = function() {
			iNow++;
			tab();
		}

		function tab() {
			for(var i = 0; i < aBtn.length; i++) {
				aBtn[i].className = '';
			}

			//解决当iNow<0时aBtn[iNow%aBtn.length]找不到的问题
            aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className = 'active';
			// move(oUl, {left: - aLi[0].offsetWidth * iNow}, {duration: 500});
			toR(oUl, - aLi[0].offsetWidth * iNow);
		}

		var iW = oUl.offsetWidth / 2;
		var timer = null;
		var left = 0;
		function toR(obj, iTarget) {
			clearInterval(timer);
			var start = left;
			var dis = iTarget - start;
			var count = Math.floor(1000 / 30);
			var n = 0;
			timer = setInterval(function() {
				n++;
				var a = n / count;
				var cur = start + dis * a;
				left = cur;
				oUl.style.left = (left % iW - iW) % iW + 'px';

				if(n == count) {
					clearInterval(timer);
				}
			}, 30);
		}
	}
</script>
```
效果示例
![move框架应用 - 无缝幻灯片](http://ojvx9eehr.bkt.clouddn.com/%E6%97%A0%E7%BC%9D%E5%B9%BB%E7%81%AF%E7%89%87.gif)

## 9. 带进度条的无缝幻灯片

``` css
<style>
	* {
		margin: 0;
		padding: 0;
	}
	#box {
		position: relative;
		margin: 50px auto;
		width: 350px;
		height: 200px;
		overflow: hidden;
	}
	#box ul {
		position: absolute;
	}
	#box ul li {
		float: left;
		list-style: none;
		width: 350px;
		height: 200px;
		text-align: center;
		line-height: 200px;
		font-size: 80px;
		color: #ffb;
	}
	#box ol {
		position: absolute;
		left: 50%;
		bottom: 10px;
		margin-left: -150px;
		width: 300px;
	}
	#box ol li {
		position: relative;
		float: left;
		margin: 10px;
		list-style: none;
		width: 40px;
		height: 10px;
		background: #fff;
	}
	#box ol li span {
		position: absolute;
		top: 0;
		width: 0;
		height: 10px;
		background: #666;
	}
</style>
```

``` html
	<div id="box">
		<ul>
			<li style="background: #aaa">1</li>
			<li style="background: #afe">2</li>
			<li style="background: #50f">3</li>
			<li style="background: #aea">4</li>
			<li style="background: #fe0">5</li>
		</ul>
		<ol>
			<li><span></span></li>
			<li><span></span></li>
			<li><span></span></li>
			<li><span></span></li>
			<li><span></span></li>
		</ol>
	</div>
```
``` javascript
<script type="text/javascript" src='move.js'></script>
<script>
	window.onload = function() {
		var oBox = document.body.children[0];
		var oUl = oBox.children[0];
		var aLi = oUl.children;
		var oOl = oBox.children[1];
		var aSpan = oOl.getElementsByTagName('span');

		oUl.innerHTML += oUl.innerHTML;
		oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';

		var iNow = 0;
		next();

		function next() {
			move(aSpan[iNow % aSpan.length], {width: 40}, {easing: 'ease-out',complete: function(){
				// 回调函数
				iNow++;
				for(var i = 0; i < aSpan.length; i++) {
					aSpan[i].style.width = 0;
				}
				move2(oUl, -iNow * aLi[0].offsetWidth, function() {
					!bSin && next();
				});
			}});
		}

		var iW = oUl.offsetWidth / 2;
		var left = 0;
		var timer = null;

		function move2(obj, iTarget, complete) {
			clearInterval(timer);
			var start = left;
			var dis = iTarget - start;
			var count = Math.floor(1000 / 30);
			var n = 0;
			timer = setInterval(function() {
				n++;
				var a = n / count;
				var cur = start + dis * a;
				left = cur;
				obj.style.left = (left % iW - iW) % iW + 'px';
				if(n == count) {
					clearInterval(timer);
					complete && complete();
				}
			}, 30);
		}

		var bSin = false;
		oBox.onmouseover = function() {
			bSin = true;
			for(var i = 0; i < aSpan.length; i++) {
				clearInterval(aSpan[i].timer);
				aSpan[i].style.width = 0;
			}
		}

		oBox.onmouseout = function() {
			bSin = false;
			next();
		}

	}
</script>
```

效果示例
![move框架应用 - 带进度条的无缝幻灯片](http://ojvx9eehr.bkt.clouddn.com/%E5%B8%A6%E8%BF%9B%E5%BA%A6%E6%9D%A1%E7%9A%84%E6%97%A0%E7%BC%9D%E5%B9%BB%E7%81%AF%E7%89%87.gif)

---
#blog13(move框架应用) (下)
---

## 10. 打字依次显示效果

``` css
<style>
	body {
		background: #000;
	}
	span {
		color: #fff;
		font-size: 20px;
		opacity: 0;
	}
</style>
```

``` html

```
``` javascript
<script type="text/javascript" src='move.js'></script>
<script>
	window.onload = function () {
		var str = '往左走(left负数)W = oUl.offsetWidth / 2;left -= 5;left = left % W;往右走(left正数)W = oUl.offsetWidht / 2;left += 5;left = (left % W - W) % W;';
		for(var i = 0; i < str.length; i++) {
			var oS = document.createElement('span');
			oS.innerHTML = str.charAt(i);
			document.body.appendChild(oS);
		}

		var aSpan = document.body.children;
		var i = 0;

		// 分步运动
		var timer = setInterval(function() {
			move(aSpan[i], {opacity: 1}, {duration: 100});
			i++;
			if(i == aSpan.length) {
				clearInterval(timer);
			}
		}, 100);

	}
</script>
```
效果示例
![move框架应用 - 打字依次显示效果](http://ojvx9eehr.bkt.clouddn.com/%E6%89%93%E5%AD%97%E4%BE%9D%E6%AC%A1%E5%BC%B9%E5%87%BA%E6%95%88%E6%9E%9C.gif)


## 11. 收起当前页放出下一页效果

``` css
<style>
	* {
	    margin: 0;
	    padding: 0;
	}
	ul {
	    width: 516px;
	    margin: 50px auto;
	}
	ul li {
	    list-style: none;
	    width: 150px;
	    height: 150px;
	    background: #ccc;
	    float: left;
	    margin: 10px;
	    border: 1px solid #000;
	}
</style>
```

``` html
	<input type="button" value="下一页" id="btn1" />
	<ul id="ul1">
	    <li></li>
	    <li></li>
	    <li></li>
	    <li></li>
	    <li></li>
	    <li></li>
	    <li></li>
	    <li></li>
	    <li></li>
	</ul>
```

``` javascript
<script type="text/javascript" src='move.js'></script>
<script>
	window.onload = function() {
	    var oBtn = document.getElementById('btn1');
	    var oUl = document.getElementById('ul1');
	    var aLi = oUl.children;

	    // 浮动定位 -> 绝对定位
	    var aPos = [];
	    for (var i = 0; i < aLi.length; i++) {
	        aPos[i] = {
	            left: aLi[i].offsetLeft,
	            top: aLi[i].offsetTop
	        };
	    }
	    for (var i = 0; i < aLi.length; i++) {
	        aLi[i].style.position = 'absolute';
	        aLi[i].style.left = aPos[i].left + 'px';
	        aLi[i].style.top = aPos[i].top + 'px';
	        aLi[i].style.margin = 0;
	    }

	    var timer = null;
	    var bSin = false;
	    oBtn.onclick = function() {
	        if (bSin) return;
	        bSin = true;

	        // 分步运动
	        var i = 0;
	        timer = setInterval(function(){
	            (function(index){
	                // 收起
	                move(aLi[i], {
	                    left: 0, top:0, width: 0,
	                    height: 0, opacity: 0
	                },{
	                    complete: function() {	// 回调函数
	                        if (index == aLi.length-1) {
	                            // 放出
	                            for (var i = 0; i < aLi.length; i++) {
	                                aLi[i].style.background = 'rgb('+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+')';
	                            }

	                            timer = setInterval(function(){
	                                (function(index2){
	                                    move(aLi[index], {
	                                        left: aPos[index].left, top: aPos[index].top, width: 150, height: 150, opacity: 1
	                                    },{
	                                        complete: function(){
	                                            if (index2 == 0) {
	                                            	// 放出最后一张后点击才有效
	                                                bSin = false;
	                                            }
	                                        }
	                                    });
	                                })(index);

	                                index--;
	                                if (index < 0) {
	                                    clearInterval(timer);
	                                }
	                            },200);
	                        }
	                    }
	                })
	            })(i);

	            i++;
	            if (i == aLi.length) {
	                clearInterval(timer);
	            }
	        },200);
	    };
	};
</script>
```
效果示例
![move框架应用 - 收起当前页放出下一页效果](http://ojvx9eehr.bkt.clouddn.com/move%E6%A1%86%E6%9E%B6%E5%BA%94%E7%94%A8%20-%20%E6%94%B6%E8%B5%B7%E5%BD%93%E5%89%8D%E9%A1%B5%E6%94%BE%E5%87%BA%E4%B8%8B%E4%B8%80%E9%A1%B5%E6%95%88%E6%9E%9C.gif)



## 12. 分块运动

1. 自定义行数R、列数C
2. 创建span
   计算oSpan的width、height、left、top、background-position

  > 注意：先appendChild才能获取oSpan的offsetWidth和offsetHeight

3. 分步运动，依次显示span

**优化：setInterval可用for循环+setTimeout替代，可设置行列相关时同一时间出现**

``` css
<style>
	* {
		margin: 0;
		padding: 0;
	}
	#btn{
		margin: 20px auto;
		padding: 5px;
		width: 100px;
		height: 20px;
		background: #f5850e;
		color: #fff;
		font-size: 16px;
		text-align: center;
		line-height: 20px;
		border-radius: 5px;
		cursor: pointer;
	}
	#box {
		position: relative;
		margin: 50px auto;
		width: 500px;
		height: 300px;
		background: url('img/slide0.jpg');
	}
	#box span{
		position: absolute;
		opacity: .1;
		/* opacity: 0; */
	}
</style>
```

``` html
	<div id='btn'>点击随机变换</div>
	<div id="box"></div>
```

``` javascript
<script type="text/javascript" src='move.js'></script>
<script>
	window.onload = function() {
		var oBtn = document.body.children[0];
		var oBox = document.body.children[1];

		var R = 3;
		var C = 5;

		// 整图 -> 分块(绝对定位)
		for(var r = 0; r < R; r++) {
			for(var c = 0; c < C; c++) {
				var oSpan = document.createElement('span');
				oSpan.style.width = oBox.offsetWidth / C + 'px';
				oSpan.style.height = oBox.offsetHeight / R + 'px';
				oBox.appendChild(oSpan);
				oSpan.style.left = oSpan.offsetWidth * c + 'px';
				oSpan.style.top = oSpan.offsetHeight * r + 'px';
				oSpan.style.backgroundPosition = - oSpan.offsetWidth * c + 'px ' + (-oSpan.offsetHeight * r) + 'px';
				oSpan.r = r;
				oSpan.c = c;
			}
		}

		var aSpan = oBox.children;
		var iNow = 0;
		var bSin = false;

		oBtn.onclick = function() {
			if(bSin) {return;}
			bSin = true;
			iNow++;
			oBox.style.background = 'url("img/slide'+ (iNow%9-1+9)%9 +'.jpg")';

			block(parseInt(Math.random()*7+1));		// 随机变换显示方式
		}

		var json = {};
		for(var i = 0; i < 8; i++) {
			json[i] = 0;
		}

		function block(method) {
			json[method]++;
			var med = 1;
			for(var i = 0; i < aSpan.length; i++) {
				(function(index) {
					switch(method) {
						case 1: med = index;
							break;
						case 2: med = aSpan[index].r + aSpan[index].c;  // 斜角显示
							break;
						case 3: med = aSpan[index].r * aSpan[index].c;
							break;
						case 4: med = aSpan[index].r - aSpan[index].c;
							break;
						case 5: med = aSpan[index].r / aSpan[index].c;
							break;
						case 6: med = aSpan.length - index;  // 由下至上
							break;
						case 7: med = Math.random();
							break;
					}
					setTimeout(function(){
						aSpan[index].style.backgroundImage = 'url("img/slide'+ iNow%9 + '.jpg")';
						aSpan[index].style.opacity = 0.1;
						(function(index2) {
							move(aSpan[index], {opacity: 1}, {complete: function() {
									if(index2 == aSpan.length - 1) {
										// 放出最后一个分块后点击才有效
										bSin = false;
									}
							}});
						})(index);
					}, 100*(med));	// 每个分块延迟时间不同，达到依次显示的效果
				})(i);
			}
		}
	}
</script>
```
效果示例
![move框架应用 - 分块运动](http://ojvx9eehr.bkt.clouddn.com/move%E6%A1%86%E6%9E%B6%E5%BA%94%E7%94%A8%20-%20%E5%88%86%E5%9D%97%E8%BF%90%E5%8A%A8.gif)


## 13. 仿Mac 感应变大效果

1. 感应距离：一般为500

  比例：scale = 1 - c/500;

2. 勾股定理计算鼠标至图片中心距离

  var a = getPos(aImg[i]).left + aImg[i].offsetWidth / 2 - oEvent.clientX;

  var b = getPos(aImg[i]).top + aImg[i].offsetHeight / 2 - oEvent.clientY;

 var c = Math.sqrt(a * a + b * b);

3. 计算方放大比例，范围为[0.5, 1]
  var scale = 1 - c / 500;
  scale < 0.5 && (scale = 0.5);
  aImg[i].style.width = scale * 80 + 'px';


``` css
<style>
	* {
		margin: 0;
		padding: 0;
	}

	#box {
		position: absolute;
		bottom: 20px;
		width: 100%;
		text-align: center;
	}
</style>
```

``` html
	<div id="box">
		<img src="img/per-1.png" width="40">
		<img src="img/per-2.png" width="40">
		<img src="img/per-3.png" width="40">
	</div>
```

``` javascript
<script>
	function getPos(obj) {
		var l = 0;
		var t = 0;
		while(obj) {
			l += obj.offsetLeft;
			t += obj.offsetTop;
			obj = obj.offsetParent;
		}

		return {left: l, top: t};
	}
	window.onload = function() {
		var oBox = document.body.children[0];
		var aImg = oBox.children;

		document.onmousemove = function(ev) {
			var oEvent = ev || event;
			for(var i = 0; i < aImg.length; i++) {

				// 勾股定理计算鼠标至图片中心距离
				var a = getPos(aImg[i]).left + aImg[i].offsetWidth / 2 - oEvent.clientX;
				var b = getPos(aImg[i]).top + aImg[i].offsetHeight / 2 - oEvent.clientY;
				var c = Math.sqrt(a * a + b * b);

				//计算方放大比例，范围为[0.5, 1]
				var scale = 1 - c / 500;
				scale < 0.5 && (scale = 0.5);
				aImg[i].style.width = scale * 80 + 'px';
			}
		}
	}
</script>
```
效果示例
![move框架应用 - 感应变大效果](http://ojvx9eehr.bkt.clouddn.com/move%E6%A1%86%E6%9E%B6%E5%BA%94%E7%94%A8%20-%20%E6%84%9F%E5%BA%94%E5%8F%98%E5%A4%A7.gif)



---
#blog14
---