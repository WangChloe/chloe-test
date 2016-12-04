##11.7 
###课程内容
####1.语言基础
####2.语言特性
####3.DOM，BOM
####4.事件对象
####5.运动

####6.cookie 
####7.模块化(Require Sea)
####8.正则
####9.面向对象

#### 兼容性
#### ps: fixed (ie6不兼容 需hack)

###js:修改样式 事件：用户的操作（任何标签都可以添加事件，任何属性都可以修改）
####onclick事件 onclick="div1.style.display='block'";//全兼容 div1为login框id 但不符合规范！important
####           onclick="document.getElementById("div1").style.display='block'"

##11.8

###js复杂样式赋值
####style.margin-left -> style.marginLeft

###让一个物体从中心放大
####margin-top: -变化的高度/2
####margin-left: -变化的宽度/2

###a链接
####<a href="#"></a> -> <a href="javascript:;"></a>	//防止页面跳动 不要再写#!important
####http: http协议 javascript:;伪协议

###js中建议使用单引号

### . 属性操作符(不可以接收变量)     [] 中括号可以操作属性也可以接收变量
####凡是.出现的地方都可以用中括号替代 （属性都是字符串）
#### oBtn.value = 'bbb'; -> oBtn['value'] = 'bbb'; 
#### document.getElementById -> document['getElementById']

###行为[js] 样式[css] 结构[html]

###不能直接写 oBtn.onclick = show(); //任何时候不能加括号，只要有括号加载页面时就会执行show() !important
####可以改为 oBtn.onclick = show;  或者 oBtn.onclick = function() {...} //匿名函数/事件函数

###window.onload事件 //页面加载完成时就执行onload函数
####页面加载完成：css html img flex ...
####window.onload = show; 或者window.onload = function() {...};

###变量命名 单个元素命名：oDiv-> Object   元素数组命名：aDiv -> Array 

###js内一组元素不能一起改变!important
####document.getElementsByTagName('div').style.width = '100px'; //不可行

###循环添加事件，事件里面的i不能用
for(var i=0; i<3; i++) {
	aDiv[i].onclick = function() {
		aDiv[i].style.background = 'blue';	//无用，i已经自增到3
	}
}
####以上 aDiv[i].style.background = 'blue'; -> 应改为 this.style.background = 'blue';
####this：当前事件发生的元素（对象）

###浏览器加载的过程：
####加载整个页面的标签和属性
####(发生在高级浏览器)过滤不符合W3C标准的标签和属性
####执行js - window.onload

##11.9

###获取一个元素getElementById只能从document下获取!important 获取一组元素getElementsByTagName可以从document下获取，也可以从父级下获取
####<div id="div1"><div id="div2"></div></div>
####var oDiv = document.getElementById('div1');
####var oDiv2 = oDiv.getElementById('div2');	//从父级直接获取子级不可行
####var oDiv22 = oDiv.getElementsByTagName('div')[0];	//getElementsByTagName从父级下获取

###获取物体内容
####obj.innerHTML

###字符串连接
####两个' 两个+

###六大数据类型
####(基本数据类型)
####number 数字
####string 字符串
####boolean 布尔
####undefined 未定义
####function 函数
####object 对象(复杂数据类型，可拆分为多种数据类型)

####null 空对象 -> 数据类型(object)
####NaN 非数字 -> 数据类型(number) NaN和任何数据类型都不相等，包括自己                           判断方法isNaN() 非数字true 数字false

###常见类型前缀
####o  object 一个对象，一个元素 eg:oDiv
####a  array  一组元素 eg:aLi
####s  string 字符串 eg:sUserName
####i  integer 整数 eg:iCount
####f  float 浮点数 eg:fPrice
####b  boolean 布尔 eg:bOk
####fn function 函数 eg:fnSucc(成功的回调函数)
####re RegExp 正则 eg:reMailCheck

###把字符串变成数字
*parseInt() '12.5' -> 12 '12abc' -> 12 'abc' -> NaN 从左往右开始找，找到非数字(包含小数点)就停止，如果第一个就不是一个数字，返回NaN
*parseFloat() '12' -> 12 '12abc' -> 12 'abc' -> NaN 从左往右开始找，找到非数字(不包含小数点)就停止，如果第一个就不是一个数字，返回NaN
*Number() '12' -> 12 '12.5' -> 12.5 '12abc' -> NaN 'abc' -> NaN 既能处理小数，也能处理整数，但只能处理数字

###数字转成字符串
####number+'' / ''+number  eg:12+'' -> '12'

##11.10

###变量
####1.全局变量
####2.局部变量
####3.闭包 子函数可以使用父函数的全局变量

###变量的遮蔽 全局变量和局部变量同名 
####就近原则 在函数里优先使用自己的变量

###运算符
####1.算术运算符
####2.比较运算符 == -> !=  === -> !==
####3.赋值运算符
####4.逻辑运算符

###if语句简写 if(条件) {语句;}
####1.条件 && 语句;
####2.三目运算 条件？语句1：语句2;

###判断一个数是不是整数
####if(num == parseInt(num))

###真假
####真：非0数字，非空字符串  ，true， 非空对象
####假：0      ，空字符串('')，false，空对象(null)，undefined，NaN

###获取元素当前样式
####1.getComputedStyle(物体,false).样式;	//兼容高级浏览器（Chrome,FF,IE9+包括IE9）
####eg:getComputedStyle(oDiv,false).width;

####2.物体.currentStyle.样式;	//兼容IE系
####eg:oDiv.currentStyle.width

####物体.currentStyle 	//Chrome,FF -> undefined  IE -> Object	!important
####兼容性
if(oDiv.currentStyle) {
	//IE系
	alert(oDiv.currentStyle.width);
} else {
	//Chrome FF
	alert(getComputedStyle(oDiv,false).width);
}

###随机数
####Math.random(); //0-1之间的随机数，包含0但是不包含1

####0-5 Math.random()*5;
####0-100之间随机整数 parseInt(Math.random()*100);
####10-50之间随机整数 parseInt(Math.random()*40+10);
####30-100之间随机整数 parseInt(Math.random()*70+30);

####n-m(不包含m)之间的随机整数(n<m) parseInt(Math.random()*(m-n)+n);
####n-m(包含m)之间的随机整数(n<m) parseInt(Math.random()*(m+1-n)+n);
####封装一个获取n-m之间的随机整数的函数
function rnd(n, m) {
	return parseInt(Math.random()*(m-n)+n);
}

####随机变色
####eg:var r = parseInt(Math.random()*256); 
####   var g = parseInt(Math.random()*256);
####   var b = parseInt(Math.random()*256);
####oDiv.style.background = 'rgb('+r+','+g+','+b+')';

###返回值
####特性：
####1.return后面的代码不执行
####2.函数没有写return，默认返回undefined !important
####3.函数写return; 也是返回undefined !important

####return必须写在函数内

##11.11

###eval(字符串)
####能把字符串里面的代码转换成js能理解的程序，把引号中的拿出来运行，但尽量少用 !important
####eg:var a = '[1,2,3]';	//字符串
####   alert(eval(a));	//1,2,3 字符串已转化为数组 相当于'[1,2,3]' -> [1,2,3]

###arr.push();
###document.wirte();

###数组去重 !important
funtion findInArr(item, arr) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == item) {
			return true;
		}	
	}
	return false;
}

###for循环&&while循环
####for循环：  循环次数固定
####while循环：循环次数不固定

###undefined出现的情况
####1.函数没有返回值或只有return;
####2.定义一个变量，但没有赋值	eg:var a; -> undefined   function show(a) {}  show() -> undefined
####3.访问一个不存在的属性	eg:oDiv.aaa -> undefined

###定时器
####开启定时器
####1.setInterval(函数名, 时间);	//过一段时间执行一次函数，循环执行
####函数名：不能加括号	时间：以毫秒为单位
####2.setInterval(function(){}, 时间);	//函数拉进，改为匿名函数
####关闭定时器
####定时器命名 var timer = null; timer = setInterval(function(){},时间);
####clearInterval(定时器的名字);	eg:cleatInterval(timer);

####秒表
####封装补零函数（注意if-else保证返回数据类型一致）
function toDou(num) {
	if(num < 10) {
		return '0'+num;
	} else {
		return ''+num;
	}
}
####优化 -> return num < 10 ? '0' + num : '' + num;	//return需合并到最前面 !important

####问题
####1.卡了一秒 -> 把定时器内的函数拉出，并在点击开始时调用一次
####2.再点开始会更快 -> 先关后开定时器 设置开关变量	!important
####                                 bSin=false;	//没有点击
####                                 1.setInterval
####                                   if(bSin){return;}
####                                   bSin = true;
####                                 2.clearInterval
####                                   bSin = false;

###另一种定时器
####开启定时器 setTimeout(函数名，时间);	    //过某一段时间执行一次函数，但只执行一次
####关闭定时器 clearTimeout(定时器的名字);
##11.14

###获取样式函数封装	!important
function getStyle(obj, name) {
    if(obj.currentStyle) {
        <!-- IE -->
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj,false)[name];
    }
}

优化 return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj,false)[name];
####调用
####parseInt(getStyle(oDiv, 'height'));

###文本时钟
####1.时间对象
####var oDate = new Date();
####获取小时 oDate.getHours();  <!-- 记得加s,下同 !important -->
####获取分钟 oDate.getMinutes();
####获取秒   oDate.getSeconds();图片
####获取毫秒 oDate.getMilliseconds();
####获取年   oDate.getFullYear();
####获取月   oDate.getMonth()+1;   <!-- 月份从零开始 !important -->
####获取日   oDate.getDate();
####获取星期 oDate.getDay();    <!-- 星期天 -> 0 星期一-星期六 -> 1-6 -->
####2.定时器

###图片时钟
####获取字符串中的某一个
####str[i]  兼容高级浏览器及IE8+!important  IE7返回undefined
####改进：str.charAt(i)    全兼容 !important

####获取时间转换为字符串  var str = '' + iH + iM + iS;    <!-- 一个空字符串可以让所有数字强制转化 !important -->   或直接使用toDou()

###倒计时
####1.设置时间
####var oDate = new Date();
####oDate.setFullYear(2017,0,1);    <!-- 月份需 -1 !important -->
####oDate.setHours(0,0,0,0);
####2.获得时间戳 oDate.getTime();  <!-- 当前距离1970年1月1日凌晨的毫秒数 -->
####3.设置后的时间戳与当前时间的时间戳相减得到倒计时总毫秒数

###自动播放选项卡、

##11.15

###事件函数相同可以合并
####eg:oDiv1.onmouseout = oDiv2.onmouseout = function() {};

###延迟选项卡
####定时器里的this不能直接使用，原因：this指向了window
####解决：在定时器外用一个变量存this

###封闭空间（闭包）
本质：函数每调用一次就会复制一份，包括里面的参数
(function(){
//code
})();
####用处：1.解决变量名冲突 2.解决循环添加事件，事件里i不能用的问题
####eg:
####for(var i=0; i<aBtn.length; i++) {
(function(a){
oBtn[i].onclick = funciton() {
alert(a);
}
})(i);
}

####封闭空间应用
for(var i=0; i<2; i++) {
setTimeout(function(){
alert(i);
}, 2000);
}	//结果：两秒后alert两次2，两秒后i已为2，然后执行两次循环

for(var i=0; i<2; i++) {
(function(a){
setTimeout(function(){
alert(a);
},2000);
})(i);
}	//结果：两秒后alert 0、1

###arguments -> 参数的数组，函数中可以不需要定义形参 !important
eg:
sum(12, 5, 6);
function sum() {
alert(arguments[1]);	//alert 5
}

###设置样式
####1.style.xxx  oDiv.style.width = '300px';
####2.className  oDiv.className = 'active';
####3.cssText 批量设置样式	oDiv.style.cssText = 'width:300px;height:300px';

###字符串相关方法

####1.str.charAt(i)	获取字符串中的第i+1个	返回值：相应位置的字符

####2.str.indexOf('w')	返回值：w在字符串中的位置
特性：1)从左往右找
	  2)找不到返回 -1 !important
	  3)区分大小写
	  4)找到第一个相同值就不会继续往下找
	  5)查找多个字符时，返回第一个字符的位置

####3.str.lastIndexOf('w')	从右往左找，返回w在字符串中的位置，索引值还是与indexOf()相同 !important

####4.str.substring(开始位置, 结束位置)	截取字符串，包含开始位置，但不包含结束位置
str.subString(开始位置)	截取字符串，从开始位置一直截取到最后

####5.str.split('w') 切割字符串，返回值：数组 !important
										1)字符串按w割开，去掉w后组成的数组
										2)若没找到w则原样返回一个长度为1的数组
										3)若为''(无空格)则返回将str中每个字符单独拆开的数组

####6.str.toUpperCase()	转大写，不需要参数
	  str.toLowerCase()	转小写，不需要参数

###字符串比较
####英文	按照字典序依次比较,a~z，z为最大，从两字符串第一个字符开始，若相等再往下一个字符进行比较
####数字	按照数字大小依次比较，从两字符串第一个字符开始，若相等再往下一个字符进行比较
####汉字	按unicode大小比较

###判断浏览器的类型
####window.navigator.userAgent
eg: if(window.navigator.userAgent.indexOf('Chrome') != -1) {
		console.log('Chrome');
	} else if(window.navigator.userAgent.indexOf('Firefox') != -1) {
		console.log('Firefox');
	} else if(window.navigator.userAgent.indexOf('MSIE7.0') != -1) {
		consolle.log('IE7');
	} else {
		console.log('others');
	}

###判断上传文件格式
eg:var index = str.lastIndexOf('.');
   var type = str.substring(index+1));	//返回文件类型名

###定义数组
####1.var arr = [1,2,3];
####2.var arr = new Array(1,2,3);	//只传一个参数时表示定义一个数组长度 !important	eg:new Array(10);定义一个长度为10的数组

###数组相关方法
####1.arr.push(char)	往数组最后面添加一项	返回值：返回添加的那项
####2.arr.unshift(char)	往数组最前面添加一项	返回值：返回新数组的长度 !important
####3.arr.pop()		删除数组最后一项	返回值：返回删除的那项
####4.arr.shift()	删除数组最前一项	返回值：返回删除的那项

####5.arr.splice(开始位置, 删除个数, 元素1, 元素2...)	万能操作（添加、删除、修改）!important
				eg:var arr=[1,2,3,4];
				   arr.splice(1, 0, 'a', 'b');	//添加：在1后添加'a','b'	返回值：返回空数组

				   var arr=[1,2,3,4];
				   arr.splice(1, 2);		//删除：删除2、3	返回值：返回删除的各项

				   var arr=[1,2,3,4];
				   arr.splice(1, 1, 8, 88, 888)	//修改：先删除再添加 把2改为8,88,888	返回值：返回删除的各项

###splice模拟方法
####1) arr.push(c);    -> arr.splice(arr.length, 0, c);
####2）arr.unshift(c); -> arr.splice(0, 0, c);
####3）arr.pop();      -> arr.splice(arr.length-1, 1);
####4）arr.shift();    -> arr.splice(0, 1);


##11.16

###数组相关方法
####6.arr.join('w')	数组各项用w连接起来
####首字母大写
eg: var str = 'welcome to china';
	var arr = str.split(' ');
	var arr2 = [];
	for(var i = 0; i < arr.length; i++) {
		var first = arr[i].charAt(0).toUpperCase();
		var other = arr[i].substring(1);
		arr2.push(first + other);
	}
	alert(arr2.join(' '));
####7.arr.concat(arr2, arr3...);	数组arr与arr2、arr3...拼接
####8.arr.reverse();	数组翻转
####数组翻转方法2
eg: var arr=[1,2,3,4];
	var arr2=[];
	while(arr.length) {
		var num=arr.pop();
		arr2.push(num);
	}
	alert(arr2);
####9.arr.sort();	数组排序，按字典序和数字序列
####高级排序 数值排序

<!-- 没看懂 -->
eg:arr.sort(function(n1, n2){
<!-- 从小到大 -->
	return n1-n2;
});
arr.sort(function(n1, n2){
<!-- 从大到小 -->
	return n2-n1;
});

###快速清空数组
####1.length=0;
####2.arr=[];
####3.arr.splice(0,arr.length);
####4.循环pop或shift

###json(object类型) !important
####<!-- json格式：{name:value,name2:value2, ...} -->
####json标准格式：{"name":value, "name2":value2, ...}	所有键名需双引号 键值非数字时需加引号	!important	键值对	没有json.length !important
####json的name是唯一的 !important
####获取json值:  json.name或者json['name']
####添加/修改：	json.aaa=bbb;
####删除：delete json.c;

###json和数组的区别
####1.length
####数组：有length
####json：没有length
####2.循环遍历方法
####数组：for(var i=0;i<arr.length;i++){alert(arr[i])};	for循环
####json：for(var name in json){alert(json[name])};		for in循环
####3.访问元素下标类型
####数组：arr[1]	数字
####json：json['a']	字符串
####4.顺序
####数组：有序，根据下标访问
####json：无序，根据键名访问

###循环
####普通循环：1) while 2)for
####for in循环	用来循环对象(json)，但性能低，能用普通的for，尽量使用普通的for

###获取元素方法
####1.document.getElementById('id')
####2.document/obj.getElementsByTagName('TagName')
####3.document/obj.getElementsByClassName('ClassName') 	兼容高级浏览器（Chrome、FF、IE9+）
					obj.getElementsByClassName			IE8-返回undefined !important
					高级浏览器返回function !important
		js兼容方法
<!-- 		var aEle = document.getElementsByTagName('*');
		var arr=[];
		for(var i=0;i<aEle.length;i++){
			var temp = aEle[i].className.split(' ');
			if(findInArr('red', temp)){
				arr.push(aEle[i]);
			}
		} -->
		obj为从哪个父级下面查找类为sClass的元素

		function getByClass(obj, sClass) {
			if(obj.getElementsByClassName) {
				return obj.getElementsByClassName(sClass);
			} else {
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

###日期相关用法

	var oDate = new Date();
	oDate.getFullYear(); // 年
	oDate.getMonth(); // 月 从0开始 
	获取的时候+1
	设置的时候-1
	oDate.getDate(); // 日
	oDate.getDay(); 0-6   0 -> 周日
	oDate.getHours();
	oDate.getMinutes();
	oDate.getSeconds();
	oDate.getMilliseconds();

	oDate.getTime(); // 时间戳

	设置时间
	oDate.setFullYear(年,月,日);
	oDate.setHours(时,分,秒,毫秒);

	oDate.setDate(31);
	假设本月有30天会跑到下个月的第一天
	会自动进位
	oDate.setDate(0);
	会跑到上个月的最后一天

####本月有多少天 ？
	i). 当前月份+1
	ii). setDate(0);

####本月第一天是周几 ？
	setDate(1);

####本月最后一天是周几 ？
	i). 当前月份+1
	ii). setDate(0);

##11.17

###Math方法
####1.Math.random()	 			0-1随机数（不包含1）
####2.Math.abs(num)				绝对值
####3.Math.max(num1, num2, ...)	最大数
####4.Math.min(num1, num2, ...)	最小数
####5.Math.floor(num)			向下取整	12.4 -> 12	12.6 -> 12
####6.Math.ceil(num)			向上取整	12.5 -> 13	12.1 -> 13
####7.Math.pow(n, m)			n的m次方	Math.pow(2, 3)=8;
####8.Math.sqrt(num)			num开平方	Math.sqrt(9)=3;
####9.Math.round(num)			四舍五入	12.1 -> 12	12.6 -> 13

###eval() json出问题
####解决方法：eval('(' + json + ')');

###数组排序方法
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

###select
####选中的索引值	oSel.selectedIndex
####获取所有option	oSel.options
####获取选中的option的文本内容	oSel.options[oSel.selectedIndex].innerHTML
								或者oSel.options[oSel.selectedIndex].text
####动态添加option	var option = new Option(文本内容, value值);
					oSel.options.add(option);
####删除option		oSel.options.remove(index);

###数组去重的多种方法
####1.findInArr
var arr2 = [];
for(var i = 0; i < arr.length; i++) {
	if(!findInArr(arr[i], arr2)) {
		arr2.push(arr[i]);
	}
}

####2.json(自动从小到大排序)
var json = {};
for(var i = 0; i < arr.length; i++) {
	json[arr[i]] = 'xxx';
}
var arr2 = [];
for(var name in json) {
	arr2.push(name);
}

####3.sort()
arr.sort();
for(var i = 0; i < arr.length; i++) {
	if(arr[i] == arr[i+1]) {
		arr.splice(i, 1);
		i--;
	}
}

##11.21

###预解析
####变量和函数的定义会预先解析,解析在script标签内的最上面
####作用域：(1)script (2)函数
eg:
var a = 111;
function show() {
	alert(a);		//相当于var a;
	var a = 12;		//		alert(a);
					//		a = 12;
}
show();	//返回undefined

###引用
####引用类型：数组 函数 对象

###字符串的其他方法
####str.charCodeAt(index);	//查看字母对应ASCII编码	a->0x61=97	b->0x62=98
####已知计算机编码查对应单词
####String.fromCharCode('0x4e00')	第一个中文 	 0x4e00 一		!important
####								最后一个中文 0x9fa5	龥(yu)	!important

####unicode编码：统一编码 utf-8 utf-16 utf-32	以\u开头 \u4e00(一) ~ \u9fa5(龥)
####GB2312编码

###字节长度和编码的关系
####英文、数字都占1个字节，与编码格式无关
####utf-8：中文占3个字节
####GB2312：中文占2个字节

###封装一个求字节长度的函数
function getByLen(str,type) {	//getBytesLen	传入字符串和编码格式
	var result = 0;
	for(var i = 0; i < str.length; i++) {
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

###判断json内某个属性存不存在
eg:var json = {a:1, b:2};
   alert('c' in json);	//false

###非严格模式下，变量定义没有var时为全局变量，全局的东西都属于window !important
function show(){
	a = 12;		//a没有var时a为全局变量
	alert(a);	//1. 12
}
show();		//需先调用show函数
alert(a);	//2. 12
####函数内部使用连等定义变量，第一个是局部变量，其余是全局变量
eg: function show(){
		var a=b=c=1;	//a是局部变量，b、c是全局变量
	}

###捕获异常
try {
	//code
} catch(ex) {	//exception
	//错误的提示信息
	//补救的代码
}

####查看错误信息	ex.message
####用处：1.屏蔽错误信息 	2.代替if
####缺点：性能略低

###逗号运算符 以最后一个为准	eg:var a=(1,2,3);	//a=3
for(var i=0,j=5,k=8; i<10,j<10,k<10; i++,j++,k++) {

}
alert(i+j+k);	//2+7+10=19

###严格模式
####在script标签内最上面写 'use strict';
####好处：1.定义变量不带var报错  2.不允许在if while for里面定义函数
####作用域：(1)当前script标签内 (2)函数  (3)js文件

###js的组成部分
####1.ECMA(ECMAScript)：js核心，解析器，解析语法	eg:if()	arr.pop()
####			 兼容：完全兼容，目前主要是ES4.0
####2.DOM(Document Object Model)文档对象模型               ####eg:document.getElementById('id')	  oDiv.style.background='red';
####			 兼容：大部分兼容，不兼容可以处理
####3.BOM(Browser Object Model)浏览器对象模型
####eg:window.navigator.userAgent  alert();
####			 兼容：没有兼容性问题，根本就不兼容，兼容处理不了

###节点关系
####1.父子节点
####	子节点（一级，一层）：父级.children;
####	父节点：子节点.parentNode
####2.兄弟节点
####	上一个兄弟节点：obj.previousElementSibling
####					兼容：高级浏览器
####					obj.previousSibling  兼容：都兼容
####										 高级浏览器 -> object text
####										 低级浏览器 -> 能获取相应的节点
####					处理兼容 1)if-else
####							 2)||
####		兼容写法：var oPrev = obj.previousElementSibling||obj.previousSibling;
####	下一个兄弟节点：obj.nextElementSibling
####					兼容高级浏览器
####					obj.nextSibling  兼容：都兼容
####										 高级浏览器 -> object text
####										 低级浏览器 -> 能获取相应的节点
####		兼容写法：var oNext = obj.nextElementSibling||obj.nextSibling;
####3.首尾节点

##11.22

###DOM节点关系
####3.首尾节点
####	首节点：父级.firstElementChild
####			兼容：高级浏览器
####				低级浏览器：undefined
####			父级.firstChild 兼容：都兼容
####							高级浏览器：文本节点
####							低级浏览器：可以正确地获取
####			兼容写法：(1)父级.firstElementChild||父级.firstChild
####					  (2)父级.children[0]
####	尾节点：父级.lastElementChild
####			兼容：高级浏览器
####				低级浏览器：undefined
####			父级.lastChild 兼容：都兼容
####							高级浏览器：文本节点
####							低级浏览器：可以正确地获取
####			兼容写法：(1)父级.lastElementChild||父级.lastChild
####					  (2)父级.children[父级.children.length-1]

###DOM操作
####1.创建一个节点
####	var obj = document.createElement(节点名称);
####2.添加一个节点(所有的添加功能都相当于剪切功能)
####	父级.appendChild(要添加的节点);
####	父级.insertBefore(要添加的节点,在谁前面添加);
####3.删除一个节点
####	父级.removeChild(要删除的节点);
####4.替换一个节点
####	replaceChild();

###BOM
####1.window.open(地址, 方式);	返回值：新的窗体对象
####			Chrome：拦截
####			FF：阻止
####			IE：直接打开
####			*：只要是用户自己打开的都不拦截
####	打开方式：1)_blank 新窗口打开(默认)
####			  2)_self  当前页面打开
####			about:blank 空白页
####2.window.close();
####			Chrome：直接关闭
####			FF：没有反应
####			IE：提示
####			*：只能关闭自己open出来的窗口
####3.window.location  获取地址栏信息	返回值数据类型：对象object
####	window.location.href  获取地址栏信息	返回值数据类型：字符串string
####	window.location.search  获取地址栏信息中的数据 返回值：?(包括?)后面的值
####	window.location.hash  获取地址栏信息中的锚点   返回值：#(包括#)后面的值

####	window.location.protocol  获取地址栏信息中的协议  返回值：eg:http:
####	window.location.host  获取地址栏信息中的域名  返回值：eg:localhost:63342或baidu.com
####	window.location.port  获取地址栏信息中的端口  返回值：eg:63342
####	window.location.pathname  获取地址栏信息中的路径  返回值：eg:/../../.. .html
####4.window.history  获取地址的历史信息
####	window.history.forward()	前进
####	window.history.back()		后退
####	window.history.go(数字)		前进时数字>0 1代表前进1个页面
####								后退时数字<0 -1代表后退1个页面

###右下角悬浮框(富媒体)
####position:fixed (固定定位)  IE6不兼容
####imgT = 可视区的高度-物体本身的高度+滚动的高度

####滚动高度：
####	html简写 document.documentElement
####	document.body.scrollTop
####		兼容：Chrom
####		其他：0
####	document.documentElement.scrollTop
####		兼容：IE、FF
####		其他：0
####	纵向兼容写法：var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
####	横向兼容写法：var scrollL = document.documentElement.scrollLeft||document.body.scrollLeft;

####可视区高度：document.documentElement.clientHeight
####可视区宽度：document.documentElement.clientWidth
####兼容：全兼容

####物体的高度：obj.offsetHeight
####物体的宽度：obj.offsetWidth
####                     offsetHeight                       getStyle()
####返回值：               数字   			                 字符串
####               获取的是盒模型的大小				     获取的是height
####          (width/height+padding+border)
####display:none后           0                                可以获取

####滚动高度 var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
####可视区高度 var clientH = documnet.documentElement.clientHeight;
####物体高度 var oDivH = document.offsetHeight;
####var top = clientH - oDivH + scrollT;
####oDiv.style.top = top + 'px';

####window.onscroll  当滚动滚动条的时候
####window.onresize  当缩放浏览器的时候

##11.23

###物体距离左边/上边的距离
####obj.offsetLeft  距离有定位父级的
####obj.offsetTop   距离有定位父级的

####obj.parentNode  结构上的父级
####obj.offsetParent定位上的父级
####					祖宗：body

####封装一个求物体距离上边/左边的绝对位置的函数
function getPos(obj) {
	var l = 0;	//距离左边的绝对距离
	var t = 0; // 距离上边的绝对距离
	while(obj) {
		l += obj.offsetLeft;
		t += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {left:l, top:t};
}

###应用：懒加载
####慢点加载 好处：节省资源 节省带宽
####让一个图片不加载：不给src 属性src改为_src onscorll或onresize时设置src!important

###操作属性
####(1).
####(2)[]
####(3)obj.getAttribute(属性的名字)	     获取属性
####   obj.setAttribute(属性的名字, 值)  设置属性
####   obj.removeAttribute(属性的名字)   删除属性

####tips:获取设置属性方法不能混用，要配套使用。eg:不能同时用.和getAttribute()

###应用：瀑布流
####特点：(1)宽度一致，高度参差不齐
####	  (2)滚不完，一直可以加载新图片
####条件：滚动高度+可视区高度 >= body高度(offsetHeight)
####浮动问题解决：方法1.清除浮动
####	  		  方法2.判断条件：scrollT + clientH >= document.body.scrollHeight

####物体内容的高度：obj.scrollHeight
####内容高度>盒模型高度 取内容高度
####内容高度<盒模型高度 取盒模型高度

####伪数组排序：先将伪数组挨个push进arr，再用arr.sort(function...)。

###应用：吸顶条

##11.24

###添加元素
####1.appendChild()
####  insertBefore()
####2.innerHTML
####	问题：会清空之前元素身上的事件
####	原因：innerHTML先清空所有的元素

###文本提示框
####聚焦：oT.onfocus
####失焦：oT.onblur
####强制获取一个焦点：oT.focus();
####强制失去一个焦点：oT.blur();

###预加载
####增强用户体验
####创建图片方法：方法1：document.createElement('img');
####			  方法2：var oImg = new Image();

####图片事件
####1.oImg.onload   加载成功触发
####2.oImg.onerror 	加载失败触发

####img的bug: 上下有间距  解决方法：img{vertical-align: top;}	!important

####加载图片的进度条

oImg.onload = function() {
	count++;
	oDiv.style.width = count / total * 100 + '%';
	oSpan.innerHTML = (count / total * 100).toFixed(2) + '%';
}


####保留两位小数：num.toFixed(保留小数个数);  自动四舍五入

###form表单
####想要提交数据需有
####1.action 提交的地址 <form action=''></form>
####2.name   数据名称	<input name=''>
####3.value  数据       input.value

####提交方式
####1.get(默认)	不安全，  有缓存，  容量32K左右
####		好处：(1)分享 (2)收藏
####2.post      相对安全，没有缓存，容量1G左右

####缓存(cache)
####对于浏览器而言，相同的地址只会访问一次

###点击页面弹1
####document.onclick = function(){}
####父级：parentNode	结构父级	根：document
####父级：offsetParent	定位父级	根：body

###事件对象
####事件：用户操作
####事件对象：描述事件更加详细的信息
####	event(事件对象)	      兼容：Chrome IE系	(FF报错)
####	ev(事件函数传入参数)  兼容：高级浏览器(Chrome、FF、IE9+)	(IE8-返回undefined)
####	兼容写法：var oEvent = ev || event;

####查看鼠标点击的位置
####X轴：oEvent.clientX
####Y轴：oEvent.clientY

####onmousemove	鼠标移动事件

####应用：鼠标跟随

div跟着鼠标走 ？
注意点：最好x轴加上滚动的宽度
	    y轴加上滚动的高度

var x = oEvent.clientX - oDiv.offsetWidth/2;
var y = oEvent.clientY - oDiv.offsetHeight/2;
var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
var scrollL = document.documentElement.scrollLeft || document.body.scrollLeft;

var maxW = document.documentElement.clientWidth - oDiv.offsetWidth + scrollL;
var maxH = document.documentElement.clientHeight - oDiv.offsetHeight + scrollT;
x < 0 && (x = 0);
y < 0 && (y = 0);
x > maxW && (x = maxW);
y > maxH && (y = maxH);

oDiv.style.left = x + 'px';
oDiv.style.top = y + 'px';

####应用：放大镜

###事件冒泡
####子级的事件会传递给父级，如果父级有相同的事件，会依次从内到外执行，直到相同事件的祖宗节点，否则会继续冒泡。
####阻止事件冒泡(获取事件更加详细的信息)：在子级事件内添加 oEvent.cancelBubble = true;

##11.25

###键盘事件
####document.onkeydown  按下键盘触发

####oEvent.keyCode      获得按下键的键码
####					0~9:48~57 	a~z: 65~90
####					ctrl：17 delete: 46	backspace: 8	enter: 13
####					左键：37  上键：38  右键：39  下键：40

####组合键
####在js里键码不能组合使用
####ctrl -> ctrlKey
####shift -> shiftKey
####alt -> altKey

eg:if(oEvent.ctrlKey && oEvent.shiftKey && oEvent.keyCode == 65){...}

###默认行为：
####右键有菜单 表单能提交 文本框能输入内容 点击a标签能跳转

###鼠标事件
####oncontextmenu 点击鼠标右键触发(有默认右键菜单行为)
####				阻止默认行为：return false;

####应用：自定义右键菜单
####应用：自定义输入框

####window.location.reload  刷新页面

###拖拽
####1.按下鼠标 2.移动 3.释放鼠标
####onmousedown	按下鼠标时触发
####onmouseup	抬起鼠标时触发
####问题：1.速度加快超出框时会掉
####			解决：oDiv.onmousemove -> document.onmousedown
####			      oDiv.onmouseup   -> document.onmouseup
####	  2.默认行为：移上其他框时会选中文本
####			解决：return false;
####应用：1.拖拽 2.拖拽(带框) 3.磁性吸附

###捕获(IE独有)
####设置捕获：obj.setCapture();
####释放捕获：obj.releaseCapture();

####if(A){B;} 简写 A && B;

###克隆
####浅克隆：obj.cloneNode();	  只克隆obj一个
####深克隆：obj.cloneNode(true);  克隆obj包括obj的子级

###事件绑定
####可以解决事件的冲突
####obj.addEventListener(事件名, 函数名/函数, 是否捕获);
####					事件名->不能加'on'
####					函数名->不能加括号
####					是否捕获->false
####		兼容：高级浏览器

####obj.attachEvent(事件名, 函数名/函数);
####					事件名->必须加'on'
####					函数名->不能加括号
####		兼容：IE10-

###捕获
####事件冒泡：子级->父级
####是否捕获(事件下沉)：
####				true：父级->子级
####				false：没有用

####兼容写法：
if(obj.addEventListner) {	//高级浏览器 -> function  IE10- ->undefined
	//高级浏览器
	obj.addEventListener('click', show, false);
} else {
	//IE10-
	obj.attachEvent('onclick', show);
}

####封装一个事件绑定的函数
function addEvent(obj, sEv, fn) {	//对象, 事件(不加on), 函数名/函数
	if(obj.addEventListner) {	//高级浏览器 -> function  低级 ->undefined
		//高级浏览器
		obj.addEventListener(sEv, fn, false);
	} else {
		//低级
		obj.attachEvent('on' + sEv, fn);
	}
}


##11.28

###事件解绑

####obj.removeEventListener(事件名, 函数名/函数, 是否捕获);
####			注意：函数不能是匿名函数，每个匿名函数都相当于新创建了一个函数
####            创建函数 var show = new Function('a','b', 'alert(a + b)');
####		兼容：高级浏览器

####obj.detachEvent(事件名, 函数名/函数);
####		兼容：IE10-

####封装一个事件解绑的函数
function removeEvent(obj, sEv, fn) {	//对象, 事件(不加on), 函数名/函数
	if(obj.removeEventListner) {	//高级浏览器 -> function  低级 ->undefined
		//高级浏览器
		obj.removeEventListener(sEv, fn, false);
	} else {
		//低级
		obj.detachEvent('on' + sEv, fn);
	}
}

###this问题
####1.定时器中的this不指向元素，指向window
####	解决：在定时器外保存this
oBtn.onclick = function() {
	var _this = this;
	setTimeout(function(){
		_this.style.background = '#f00';
	},1000);
}
####2.调用封装函数使用this，this不指向元素，指向window
####3.(低级浏览器attachEvent)事件绑定里面的this 报错


###未整理 !important

###应用：拖拽让div变大，九宫格拖拽，碰撞检测，自定义滚动条

####九宫格拖拽
// 多个方向拖拽
function dragMore(obj1, obj2) {
	obj1.onmousedown = function(ev) {
		...
		document.onmousemove = function(ev) {
			var oEvent = ev || event;
			var moveX = oEvent.clientX;
			var moveY = oEvent.clientY;
			if(obj1.className.indexOf('r') != -1) {
				var targetX = moveX - downX;
				obj2.style.width = oldW + targetX + 'px';
			}
			if(obj1.className.indexOf('b') != -1) {
				var targetY = moveY - downY;
				obj2.style.height = oldH + targetY + 'px';
			}
			if(obj1.className.indexOf('t') != -1) {
				var targetY = downY - moveY;
				obj2.style.top = offT - targetY + 'px';
				obj2.style.height = oldH + targetY + 'px';
			}
			if(obj1.className.indexOf('l') != -1) {
				var targetX = downX - moveX;
				obj2.style.left = offL - targetX + 'px';
				obj2.style.width = oldW + targetX + 'px';
			}
		}
		document.onmouseup = function() {
			...
		}
		oEvent.cancelBubble = true;
		return false;
	}
}
####碰撞检测：
function collTest(obj1, obj2) {
	var l1 = obj1.offsetLeft;
	var r1 = obj1.offsetLeft + obj1.offsetWidth;
	var t1 = obj1.offsetTop;
	var b1 = obj1.offsetTop + obj1.offsetHeight;
	var l2 = obj2.offsetLeft;
	var r2 = obj2.offsetLeft + obj2.offsetWidth;
	var t2 = obj2.offsetTop;
	var b2 = obj2.offsetTop + obj2.offsetHeight;

	if(l1 > r2 || r1 < l2 || t1 > b2 || b1 < t2) {
		// no collision
		return false;
	} else {
		// collision
		return true;
	}
}

####封装drag(obj), dragMore(obj1, obj2), collTest(obj)

####position:relative 会相对于浏览器8px margin定位
####position:absolute 不会相对于浏览器8px margin定位

###透明度兼容
####opacity: .2;
####filter: alpha(opacity( .2));

###鼠标滚轮事件
####obj.onmousewheel  滚动鼠标滚轮触发
####	兼容：Chrome IE系
####DOMMouseScroll	  DOM事件（只能通过事件绑定添加）
####	兼容：FF
document.addEventListener('DOMMouseScroll', function() {
	//scroll code here
}, false)
#### 兼容写法：

if(window.navigator.userAgent.indexOf('FireFox') != -1) {
	//FF
	document.addEventListener('DOMMouseScroll', function() {
		//scroll code here
	}, false)
} else {
	//Chrome IE系
	document.onmousewheel = function() {
		//scroll code here
	}
}

####判断滚动方向
####	Chrome、IE系
####	oEvent.wheelDelta
####		向上：120
####		向下：-120
####	FF
####	DOMMouseScroll
####	oEvent.detail
####		向上：-3
####		向下：3
####兼容写法

####封装一个

function addWheel(obj, fn) {	//向上fn(true)，向下fn(false)

	function wheel(ev) {
		var oEvent = ev || event;
		var bDown = false;				//默认向下
		if(oEvent.wheelDelta) {			//FF -> undefined
			//Chrome IE系
			//
			if(oEvent.wheelDelta > 0) {
				//向上
				bDown = true;
			} else {
				//向下
				bDown = false;
			}
		} else {
			//FF
			//
			if(oEvent.detail < 0) {
				//向上
				bDown = true;
			} else {
				//向下
				bDown = false;
			}
		}

		//判断是否传入函数，执行回调函数
		fn && fn(bDown);
	}

	if(window.navigator.userAgent.indexOf('FireFox') != -1) {
		//FF
		document.addEventListener('DOMMouseScroll', wheel, false)
	} else {
		//Chrome IE系
		document.onmousewheel = wheel;
	}
}


##11.29

####封装一个鼠标滚动方向的函数
function addWheel(obj, fn) {	//向上fn(false)，向下fn(true)
	function wheel(ev) {
		var oEvent = ev || event;
		<!-- var bDown = true;				//默认向下 -->
		<!-- if(oEvent.wheelDelta) {			//FF -> undefined
			//Chrome IE系
			bDown = oEvent.wheelDelta < 0;
		} else {
			//FF
			bDown = oEvent.detail > 0;
		} -->

		var bDown = oEvent.wheelDelta ? oEvent.wheelDelta < 0 : oEvent.detail > 0;

		//判断是否传入函数，执行回调函数
		fn && fn(bDown);

		//FF阻止默认
		oEvent.preventDefault && oEvent.preventDefault();

		//阻止默认
		return false;
	}

	if(window.navigator.userAgent.indexOf('FireFox') != -1) {
		//FF
		document.addEventListener('DOMMouseScroll', wheel, false);	//事件中阻止默认没有用
	} else {
		//Chrome IE系
		<!-- document.onmousewheel = wheel; -->
		addEvent(obj, 'mousewheel', wheel);
	}
}


####oEvent.preventDefault();
####	兼容：高级浏览器
####	IE8- -> undefined

###应用：实时统计字数
####onkeydown	问题：本次事件触发时获取的value是上次onkeydown事件获取的value
####onkeyup		问题：键盘不抬起就不获取value
####oninput	 			键盘输入时实时触发
####		 			兼容：高级浏览器 IE9删除时有问题
####onpropertychange	键盘输入时实时触发
####		 			兼容：IE10-	  IE9删除时有问题

####事件的兼容不需要处理，直接连等

####obj.oninput = obj.onpropertychange = function() {}

####处理IE9：定时器

####封装一个实时统计字数的函数
function calLen(obj1, obj2) {
	if(window.navigator.userAgent.indexOf('MSIE 9.0') != -1) {	//IE9
		var timer = null;
		obj1.onfocus = function() {
			timer = setInterval(function() {
				obj2.innerHTML = obj1.value.length;
			},50);
		};
		obj1.onblur = function() {
			clearInterval(timer);
		}
	} else {		//能不添加定时器时就不添加
		obj1.oninput = obj1.onpropertychange = function() {		//高级浏览器、IE10-
			obj2.innerHTML = obj1.value.length;
		}
	}
}

###window.onload 当页面加载完成时触发(在DOM后)  html css js 图片 flash ...

###domReady:
####DOMContentLoaded 当DOM加载完成时触发(在页面前) DOM事件，必须通过事件绑定添加
####				 兼容：高级浏览器

####模拟domReady
####监控资源加载的情况:
document.onreadystatechange = function() {	//事件名都是全小写
	if(document.readyState == 'complete') {	//全兼容
		//code here
	}
}

####兼容写法：
####封装domReady全兼容方法
function domReady(fn) {
	if(document.addEventListener) {
		//高级浏览器
		document.addEventListener('DOMContentLoaded', function() {
			fn && fn();
		}, false);
	} else {
		//低级浏览器  模拟domReady
		document.onreadystatechange = function() {
			if(document.readyState == 'complete') {
				fn && fn();
			}
		}
	}
}

###事件委托
####子级身上的事件可以委托给父级
####好处：(1)提高性能 (2)可以给未来的子元素添加事件

####事件源
####oEvent.target
####	兼容：高级浏览器
####	低级浏览器 -> undefined
####oEvent.srcElement
####	兼容：Chrome、IE系
####FF -> undefined

####兼容写法：var oSrc = oEvent.srcElement || oEvent.target;
####获取标签名：oSrc.tagName;	(都是大写)

####给子级循环添加事件的替代写法
oUl.onclick  = function(ev) {
	var oEvent = ev || event;
	var oSrc = oEvent.scrElement || oEvent.target;
	if(oSrc.tagName == 'LI') {
		this.style.background = '#f00';
	}
}

####offsetWidth/height只有append进body后才有，创建时获取不到盒模型的大小

###onmouseover、onmouseout
####问题：移入子级也算重新移入
####解决：onmouseover -> onmouseenter
####问题：移出子级也算移出
####解决：onmouseout -> onmouseleave

###定时器的问题
####1.时间不能设置太小的值 eg:设置0其实会超出0
var a = 6;
setTimeout(function(){
	a = 66;
},0);
alert(a);	//6
####2.时间值越小越不稳定
####3.打开其他窗口时，该窗口定时器时间会变长
####定时器的最佳时间：30ms (时间过小，程序性能开销大) !important

####offsetWidth问题：是盒模型大小，包括边框，内边距和宽度。

###运动
####封装
function getStyle(obj, name) {
	return (obj.currentStyle || getComputedStyle(obj, false))[name];
}

function move(obj, iTarget, name, duration) {
	clearInterval(obj.timer);
	var start = parseFloat(getStyle(obj, name));
	var dis = iTarget - start;
	var count = Math.floor(duration / 30);		//30ms 最佳定时器时间
	var n = 0;
	obj.timer = setInterval(function() {		//自定义属性加定时器
		n++;
		obj.style[name] = start + n *  dis / count + 'px';
		n == count && clearInterval(obj.timer);
	}, 30);
}

###链式运动
function move(obj, iTarget, name, duration, complete) {
	clearInterval(obj.timer);
	var start = parseFloat(getStyle(obj, name));
	var dis = iTarget - start;
	var count = Math.floor(duration / 30);		//30ms 最佳定时器时间
	var n = 0;
	obj.timer = setInterval(function() {		//自定义属性加定时器
		n++;
		obj.style[name] = start + n *  dis / count + 'px';
		if( n == count) {
			clearInterval(obj.timer);
			complete && complete();
		}
	}, 30);
}

###多个属性同时运动
function move(obj, json, duration, complete) {
	clearInterval(obj.timer);
	var start = {};		//起点
	var dis = {};		//总距离
	//
	for(var name in json) {
		start[name] = parseFloat(getStyle(obj, name));
		dis[name] = json[name] - start[name];
	}
	//
	var count = Math.floor(duration / 30);		//30ms 最佳定时器时间
	var n = 0;
	obj.timer = setInterval(function() {		//自定义属性加定时器
		n++;
		for(var name in json) {
			obj.style[name] = start[name] + n * dis[name] / count + 'px';
		}
		if( n == count) {
			clearInterval(obj.timer);
			complete && complete();
		}
	}, 30);
}


##11.30

###运动
####总距离	var dis = iTarget - start;
####总次数	Math.floor(duration / 30);

###多个属性同时运动
function move(obj, json, duration, complete) {	//运动物体，改变的属性及终态，总时间，链式运动的回调
	clearInterval(obj.timer);
	var start = {};		//起点
	var dis = {};		//总距离
	//
	for(var name in json) {
		start[name] = parseFloat(getStyle(obj, name));	//字符串转数字，并保留小数
		dis[name] = json[name] - start[name];
	}
	//
	var count = Math.floor(duration / 30);		//总次数，30ms 最佳定时器时间
	var n = 0;
	obj.timer = setInterval(function() {		//自定义属性加定时器
		n++;
		for(var name in json) {
			var cur = start[name] + n * dis[name]/count;
			if(name == 'opacity') {
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
			} else {
				obj.style[name] = cur + 'px';
			}
		}
		if( n == count) {
			clearInterval(obj.timer);
			complete && complete();
		}
	}, 30);
}

####运动形式：加速、匀速、减速
####匀速：linear
####	  var a = n / count;
####	  var cur = start[name] + dis[name] * a;
####加速：ease-in
####	  var a = n / count;
####	  var cur = start[name] + dis[name] * Math.pow(a, 3);
####减速：ease-out
####	  var a = 1 - n / count;
####	  var cur = start[name] + dis[name] * (1 - Math.pow(a, 3));

function move(obj, json, duration, easing, complete) {	//运动物体，改变的属性及终态，总时间，运动形式，链式运动的回调
	clearInterval(obj.timer);
	var start = {};		//起点
	var dis = {};		//总距离
	//
	for(var name in json) {
		start[name] = parseFloat(getStyle(obj, name));	//字符串转数字，并保留小数
		dis[name] = json[name] - start[name];
	}
	//
	var count = Math.floor(duration / 30);		//总次数，30ms 最佳定时器时间
	var n = 0;
	obj.timer = setInterval(function() {		//自定义属性加定时器
		n++;
		for(var name in json) {
			switch(easing) {
				case 'linear':
					var a = n / count;
					var cur = start[name] + dis[name] * a;
					break;
				case 'ease-in':
					var a = n / count;
					var cur = start[name] + dis[name] * Math.pow(a, 3);
					break;
				case 'ease-out':
					var a = 1 - n / count;
					var cur = start[name] + dis[name] * (1 - Math.pow(a, 3));
					break;
			}
			if(name == 'opacity') {
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
			} else {
				obj.style[name] = cur + 'px';
			}
		}
		if( n == count) {
			clearInterval(obj.timer);
			complete && complete();
		}
	}, 30);
}

###封装：1.	2.
function move(obj, json, options) {
	//运动物体，改变的属性及终态，(总时间，运动形式，链式运动的回调)
	options = options || {};
	options.duration = options.duration || 700;		//默认总时间可自定义
	options.easing = options.easing || 'ease-out';	//默认运动形式可自定义
	clearInterval(obj.timer);
	var start = {};		//起点
	var dis = {};		//总距离
	//
	for(var name in json) {
		start[name] = parseFloat(getStyle(obj, name));	//字符串转数字，并保留小数
		dis[name] = json[name] - start[name];
	}
	//
	var count = Math.floor(options.duration / 30);	//总次数，30ms 最佳定时器时间
	var n = 0;
	obj.timer = setInterval(function() {		//自定义属性添加定时器
		n++;
		for(var name in json) {
			switch(options.easing) {
				case 'linear':
					var a = n / count;
					var cur = start[name] + dis[name] * a;
					break;
				case 'ease-in':
					var a = n / count;
					var cur = start[name] + dis[name] * Math.pow(a, 3);	//a的3次方，加速曲线可自定义
					break;
				case 'ease-out':
					var a = 1 - n / count;
					var cur = start[name] + dis[name] * (1 - Math.pow(a, 3));	//加速曲线可自定义
					break;
			}
			if(name == 'opacity') {
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
			} else {
				obj.style[name] = cur + 'px';
			}
		}
		if( n == count) {
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
	}, 30);
}

###应用：jiaThis分享到

###应用：幻灯片、手风琴

###应用：多图片展开(图片中心放大)
####浮动布局 -> 定位布局
####取每个li的offsetLeft和offsetTop赋给绝对定位时的left和top

###应用：运动时钟、输入框数字运动

###应用：返回顶部

###应用：无缝滚动
####ul里的内容复制一份，再计算ul宽度
####方法1.宽度运动到一半时拉回
####方法2.模%求得余数
####		往左走(left负数)
####		W = oUl.offsetWidth / 2;
####		left -= 5;
####		left = left % W;
####		往右走(left正数)
####		W = oUl.offsetWidht / 2;
####		left += 5;
####		left = (left % W - W) % W;

##12.1

###应用：无缝幻灯片
####		往左走(left负数)
####		W = oUl.offsetWidth / 2;
####		left -= 5;
####		left = left % W;
####		往右走(left正数)
####		W = oUl.offsetWidht / 2;
####		left += 5;
####		left = (left % W - W) % W;

for(var i = 0; i < aBtn.length; i++) {
	aBtn[i].index = i;
	aBtn[i].onmouseover = function() {
		iNow = Math.floor(iNow/aBtn.length)*aBtn.length+this.index;
		tab();
	}
}

function tab() {
	for(var i = 0; i < aBtn.length; i++) {
		aBtn[i].className = '';
	}
    aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className = 'active';
	toR(oUl, - aLi[0].offsetWidth * iNow);
}

var timer2 = null;
carousel();
function carousel() {
	clearInterval(timer2);
	timer2 = setInterval(function() {
		iNow++;
		tab();
	}, 3000);
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
###应用：递归调用
function cont() {
	iNow++;
	if(iNow == aPos.length) {
		iNow = 0;
	}
	move(oDiv, aPos[iNow], {
		complete:cont	//递归调用
	});
}
###应用：带进度条的无缝幻灯片
function next() {
	move(aSpan[iNow % aSpan.length], {width: 40}, {easing: 'ease-out',complete: function(){
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

###分布运动
####应用：打字依次弹出效果

###应用：下一页依次收起再放出效果

##12.2

###分块运动

####1.自定义行数R、列数C
####2.创建span
####  计算oSpan的width、height、left、top、background-position
####  注意：先appendChild才能获取oSpan的offsetWidth和offsetHeight

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


####3.分布运动，依次显示span


####优化：setInterval可用for循环+setTimeout替代，可设置行列相关时同一时间出现
####应用：分块出现，卷帘出现，斜角出现

###应用：感应变大
####感应距离：一般为500
####比例：scale = 1 - c/500;
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

###应用：拖拽变大

