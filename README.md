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
