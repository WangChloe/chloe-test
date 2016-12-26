---
#blog1
以下内容若有问题烦请即时告知我以修改，以免误导更多人。

---

##1. js六大数据类型

> 这里的数据类型是按照typeof返回来分类，也不是很懂有些教程写数据类型还有null，求解答数据类型应该是哪几类？

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

>>``` javascript
<script>
	// rgb色值范围[0, 255]
	oDiv.style.background = 'rgb(' + rnd(0, 256) + ',' + rnd(0, 256) + ',' + rnd(0, 256) + ')';
</script>
```

---
#blog3

---

##1. 返回值问题(return)
1. return语句后面的代码不执行
1. **函数若没有写return，则默认返回undefined**
1. **函数返回语句为return; 也返回undefined**
1. **return必须写在函数function内**

##2. undefined出现的情况
1. 函数没有返回值或只有return;
2. 定义了一个变量，但没有赋值

> eg: var a; // undefined
	  function show(a) {}
	  show();	// undefined

3. 访问不存在的属性

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
1. Interval(每过一段时间执行一次，循环执行)
- 开启定时器
setInterval(函数/函数名, 时间);

> 时间单位是毫秒

- 关闭定时器
clearInterval(定时器的名字);

2. Timeout(过一段时间执行一次，只执行一次)
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

1.定时器中的this不指向元素，指向window
解决：在定时器外保存this
oBtn.onclick = function() {
	var _this = this;
	setTimeout(function(){
		_this.style.background = '#f00';
	},1000);
}
2.调用封装函数使用this，this不指向元素，指向window
3.(低级浏览器attachEvent)事件绑定里面的this 报错

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
1. str.charAt(i); 获取字符串中的第i+1个字符  返回值：相应位置的字符

> str[i]的兼容问题
获取字符串中的第i+1个
- str[i]  兼容：高级浏览器及IE8+
		  IE7 -> undefined
- str.charAt(i)  全兼容

2. str.indexOf('w'); 查找w在字符串中的位置  返回值：成功 -> w在字符串中的位置  失败 -> -1

> 
1. 从左往右找
2. 区分大小写
3. 找到第一个相同值即停止
4. 查找多个字符时，返回第一个字符的位置

3. str.lastIndexOf('w'); 查找w在字符串中的位置  返回值：成功 -> w在字符串中的位置  失败 -> -1

> 从右往左倒序查找，返回的索引值与indexOf()规则相同

4. str.search('w'); 与indexOf()规则相同 **常用于正则**

5. str.substring(开始位置, 结束位置); 截取字符串，包含开始位置，不包含结束位置

> str.substring(开始位置); 截取字符串 **从开始位置一直截取到最后**

6. str.substr(开始位置, 截取字符串长度); 定长截取字符串

7. str.slice(开始位置, 结束位置); 截取字符串

8. str.match('w'); 在字符串中匹配w **常用于正则** 返回值：成功 -> 匹配的w  失败 -> null

9. str.split('w'); 切割字符串 **返回值类型：数组**

> 
1. 字符串按w割开，去掉w后组成的数组
2. **若没找到w则原样返回一个长度为1的数组**
3. 若为''(空字符串，无空格)则返回将str中每个字符逐个拆开的数组

10. str.toUpperCase(); str转大写
    str.toLowerCase(); str转小写

11. str.replace('xxx', 'yyy'); **常用于正则** 参数：被替换内容,替换内容

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

12. str.charCodeAt(i);	// 获取字符串中的第i+1个字符对应的ASCII编码

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
1. arr.push('w'); 往数组最后面添加一项  返回值：新添加的那项
2. arr.unshift('w'); 往数组最前面添加一项  **返回值：新数组长度**
3. arr.pop(); 删除数组最后一项  返回值：删除的那项
4. arr.shift(); 删除数组最前一项  返回值：删除的那项
5. arr.join('w'); 数组各项用w连接成一个字符串  **返回值类型：字符串**
6. arr.concat(arr2, arr3, ...); 数组arr与arr2、arr3...连接
7. arr.reverse(); 数组翻转
8. arr.sort(); 数组排序(按字典序和数字序列)

> 高级排序 数值排序
- 从小到大
arr.sort(function(n1, n2){
	return n1-n2;
});
- 从大到小
arr.sort(function(n1, n2){
	return n2-n1;
});

9. arr.splice(开始位置, 删除个数, 元素1, 元素2);

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
1. Math.random()	 			0-1随机数（不包含1）
2. Math.abs(num)				绝对值
3. Math.max(num1, num2, ...)	最大数
4. Math.min(num1, num2, ...)	最小数
5. Math.floor(num)			向下取整	12.4 -> 12	12.6 -> 12
6. Math.ceil(num)			向上取整	12.5 -> 13	12.1 -> 13
7. Math.pow(n, m)			n的m次方	Math.pow(2, 3)=8;
8. Math.sqrt(num)			num开平方	Math.sqrt(9)=3;
9. Math.round(num)			四舍五入	12.1 -> 12	12.6 -> 13

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
#blog5

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
String.fromCharCode('0x4e00');	// 一
- 第一个中文 	0x4e00 一
- 最后一个中文	0x9fa5 龥(yu)

unicode编码：以\u开头 \u4e00(一) ~ \u9fa5(龥)

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

在script标签内最上面写 'use strict'; **IE6不识别但不报错**

'use strict';	IE6不识别但不报错
好处：
1. 修复局部this的问题
2. 不允许if/while/for里面定义函数
3. 去掉了with(){}
4. 定义变量必须加var

作用域：(1)当前script标签内 (2)函数  (3)js文件


坑
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
1. 连等
函数内部使用连等定义变量，第一个是局部变量，其余是全局变量

``` javascript
<script>
	function show(){
		var a=b=c=1;	//a是局部变量，b、c是全局变量
	}
</script>
```

2. 逗号运算符
逗号运算符 以最后一个为准

``` javascript
<script>
	var a=(1,2,3);	// a=3

	for(var i=0, j=5, k=8; i<10, j<10, k<10; i++, j++, k++) {

	}
	alert(i+j+k);	// 2+7+10=19
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
> 好处：(1)分享 (2)收藏

2. post      容量1G左右   相对安全，没有缓存

> 缓存(cache)
对于浏览器而言，相同的地址只会访问一次

##9. 事件对象
- event  事件对象(系统自带)  兼容：Chrome IE系
						    FF -> 报错
- ev     事件函数传入参数    兼容：高级浏览器(Chrome、FF、IE9+)
						    IE8- -> undefined

兼容写法：var oEvent = ev || event;


---
#blog6(数组应用)
---
##数组应用
###数组翻转方法2
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

###首字母大写
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

###快速清空数组
1. length=0;
2. arr=[];
3. arr.splice(0,arr.length);
4. 循环pop或shift

###数组排序方法
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

###数组内查找元素是否存在
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

###数组去重的多种方法
1. findInArr

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

2. json(自动从小到大排序)

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

3. sort()

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

4. indexOf
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

---
#blog7(js组成)
---
##1. js的组成部分

###ECMA
ECMAScript
js核心
兼容：完全兼容
eg: if(){}
	arr.pop();
###DOM
Document Object Model  文档对象模型
兼容：大部分兼容，不兼容可以作兼容处理
eg: document.getElementById('id')
	oDiv.style.background = 'red';
###BOM
Browser Object Model  浏览器对象模型
兼容：根据使用浏览器来，根本不兼容，且不能作兼容处理
eg: window.navigator.userAgent
	alert();

##2. DOM节点关系
1. 父子节点
- 子节点：父节点.children;	(一级，一层)
- 父节点：子节点.parentNode;
2. 兄弟节点
- 上一个兄弟节点：obj.perviousElementSibling;
				兼容：高级浏览器
		obj.previousSibling
		兼容：全兼容
		高级浏览器 -> object text
		低级浏览器 -> 能获取相应的节点
	兼容写法：
	var oPrev = obj.previousElementSibling || obj.previousSibling;
- 下一个兄弟节点：obj.nextElementSibling
				兼容：高级浏览器
		obj.nextSibling
		兼容：全兼容
		高级浏览器 -> object text
		低级浏览器 -> 能获取相应的节点
	兼容写法：
	var oNext = obj.nextElementSibling || obj.nextSibling;
3. 首尾节点
- 首节点：父节点.firstElementChild
				兼容：高级浏览器
				低级浏览器 -> undefined
		父节点.firstChild
		兼容：全兼容
		高级浏览器 -> object text
		低级浏览器 -> 能获取相应的节点
	兼容写法：
	(1) 父节点.fisrtElementChild || 父节点.firstChild
	(2) 父节点.children[0]
- 尾节点：父节点.lastElementChild
				兼容：高级浏览器
				低级浏览器 -> undefined
		父节点.lastChild
		兼容：全兼容
		高级浏览器 -> object text
		低级浏览器 -> 能获取相应的节点
	兼容写法：
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
- window.history.go(数字)	前进时数字>0 1代表前进1个页面
							后退时数字<0 -1代表后退1个页面


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

兼容写法：
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
- 物体的高度：var oH = obj.offsetHeight;
- 物体的宽度：var oW = obj.offsetWidth;

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


