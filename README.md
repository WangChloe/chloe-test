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

