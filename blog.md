---
blog1

---
目录
[TOC]

1. ##js六大数据类型

###基本数据类型
- number    数字
- string    字符串
- boolean   布尔
- undefined 未定义
- function  函数

###复杂数据类型
- object    对象(可拆分为多种数据类型)

1. ##数据类型补充

> null空对象 -> 数据类型(object)
> NaN 非数字 -> 数据类型(number)
	: NaN和任何数据类型都不相等，包括自己

1. ##数字相关判断方法

###是否是数字
isNaN() 非数字->true  数字->false
###是否是整数
if(num == parseInt(num))

1. ##变量

1. ###全局变量
2. ###局部变量
3. ###闭包
	  子函数可以使用父函数的全局变量

> 变量的遮蔽
  全局变量和局部变量同名
  就近原则->在函数里优先使用自己的变量

1. ##运算符

1. ###算术运算符
2. ###比较运算符
		== -> !=	=== -> !==
3. ###赋值运算符
4. ###逻辑运算符

1. ##字符串转化为数字
###parseInt()
- 从左往右开始找，找到第一个非数字(包含小数点)就停止，如果第一个数不是数字，则返回NaN
- eg: '12.5' -> 12	'12abc' -> 12	'abc' -> NaN
###parseFloat()
- 从左往右开始找，找到第一个非数字(不包含小数点)就停止，如果第一个数不是数字，则返回NaN
- eg: '12.5' -> 12.5	'12abc' -> 12	'abc' -> NaN
###Number()
- 既能处理整数，也能处理小数，但只能处理数字
- eg: '12.5' -> 12.5 	'12' -> 12 		'12abc' -> NaN 	'abc' -> NaN

1. ##数字转化为字符串
number + ''

> eg：12 + '' -> '12'

1. ##常见变量命名前缀
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

1. ##**js**及**事件**的概念
###js：修改样式
###事件：用户的操作
>任何标签都可以添加事件，任何属性都可以修改

1. ##js操作元素属性
- . 属性操作符(不可以接收变量)
- [] 中括号可以操作属性也可以接收变量

``` javascript
<script>
	function setValue() {
		//省略获取元素oBtn, oBtn2的伪代码
		oBtn.value = 'bbb';
		oBtn2['value'] = 'bbb';

	}
</script>
```

>凡是.出现的地方都可以用中括号替代

1. ##js设置复杂样式

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

1. ##物体从中心放大

> * margin-top: -变化的高度/2
> * margin-left: -变化的宽度/2

1. ##a链接防止刷新

``` html
<a href="#">点击会刷新页面</a>
```
``` javascipt
<a href="javascript:;">点击不会刷新页面！(推荐使用)</a>
<!-- javascript相当于一个伪协议 -->
```

1. ##循环添加事件，事件中的循环变量不能用

``` javascript
<script>
	function clickEg() {
		//获取一组按钮
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
---
blog2

---
目录
[TOC]
```
1. ##浏览器加载的过程

1.加载整个页面的标签和属性
2.过滤不符合W3C标准的标签和属性(高级浏览器)
3.执行js -> window.onload

1. ##DOM获取元素

> * getElementById只能从document下获取
	var oDiv = document.getElementById('id');
> * getElementsByTagName/getElementsByClassName可以从document下获取，也可以从父级下获取
	var oDiv2 = document.getElementsByClassName('ClassName')[0];
	var oDiv3 = oBox.getElementsByTagName('TagName')[0];




