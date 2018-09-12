<!-- MarkdownTOC -->

- 1. 库 & 框架
- 2. 移动端
    - \(1\) viewport设置
    - \(2\) 移动端布局（PC同样适用）
    - \(3\) 移动端事件
- 3. 移动端常用库
    - \(1\) fastclick.js - 解决移动端click事件延迟

<!-- /MarkdownTOC -->


## 1. 库 & 框架
> Your code calls a library but a framework calls your code.

[Framework vs. Toolkit vs. Library](https://stackoverflow.com/questions/3057526/framework-vs-toolkit-vs-library)

- 库(lib)
  方法库/组件库
  核心库是给二次开发者使用
  严谨、符合标准、独立健壮、无污染
  eg: jQuery

- 框架(framework)
  给用户使用，也可以给二次开发者使用
  易使用、易扩展、可持续发展、可控
  eg: Angular.js

![lib&framework.PNG](http://upload-images.jianshu.io/upload_images/2125655-40942861a8ae52c0.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[框架和类库的区别](http://blog.sina.com.cn/s/blog_732ae613010155gj.html)

## 2. 移动端

### (1) viewport设置
```
<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
```

- window.innnerWidth(度量viewport)

- document.body.clientWidth(布局viewport)

- width 设置布局viewport的特定值

> `width=device-width` 布局viewport=设备宽度

- initial-scale 设置页面的初始缩放

> `initial-scale=window.innerWidth/document.body.clientWidth=1.0` 度量viewport=布局viewport

- maximum-scale 最大缩放

- minimum-scale 最小缩放

- user-scalable 用户能否缩放

### (2) 移动端布局（PC同样适用）

#### 1. 定宽布局
- 定宽水平居中

``` css
<style>
    .container{
        width: 600px;
        height: 4000px;
        background-color: green;
        margin: 0 auto;
    }
</style>
```

``` css
<style>
    .container {
        width: 600px;
        height: 4000px;
        background-color: green;
        position: absolute;
        left: 50%;
        top: 0;
        margin-left: -300px;
    }
</style>
```

``` css
<style>
    .container {
        width: 600px;
        height: 4000px;
        background-color: green;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }
</style>
```

#### 2. 流体/浮动布局
- 一侧定宽，一侧自适应

**calc() -> 计算布局**

``` css
<style>
    #box1 {
        width: 200px;
        height: 200px;
        display: inline-block;
        background-color: green;
    }
    #box2 {
        width: calc(100% - 200px);
        display: inline-block;
        height: 200px;
        background-color: blue;
    }
</style>
```

``` css
<style>
    #box1 {
        width: 200px;
        height: 200px;
        display: inline-block;
        background-color: green;
        position: absolute;
        left: 0;
        top: 0;
    }
    #box2 {
        width: calc(100% - 200px);
        display: inline-block;
        height: 200px;
        background-color: blue;
        margin-left: 200px;
    }
</style>
```

- 自适应5列等宽导航栏

``` css
<style>
    li{
        width: calc(20% - 10px);
        float: left;
        background-color: green;
        text-align: center;
        border: 5px solid black;
    }
</style>
```

``` css
<style>
    li{
        width: 20%;
        float: left;
        background-color: green;
        text-align: center;
        border: 5px solid black;
        box-sizing: border-box;
    }
</style>
```

#### 3. 等比布局

[css中的px、em、rem 详解](http://www.mamicode.com/info-detail-655497.html)

- `px` 像素  虚拟长度单位  px=1/dpi (英寸)

- `em` 相对长度单位 相对**父节点**的font-size

> 默认  1em = 16px(浏览器默认字体高) 12px=0.75em，10px=0.625em

**若body选择器中声明font-size=62.5%，em值变为 16px*62.5%=10px -> 12px=1.2em，10px=1em**

> 1. em的值并不是固定的；
  2. **em会继承父级元素的字体大小再计算。

- `pt` 磅  物理长度单位  pt=1/72 (英寸)

- `rem` 根em(root em) 相对**html**的font-size  **IE9+**  **推荐**

**重点**：根据根字号和设计图设备尺寸写js
document.documentElement.style.fontSize = (clientWidth/320(设备宽度))*10(根字号) + 'px';

- 1vh -> 视窗高度的1%

- 1vw -> 视窗宽度的1%

- 1vmax -> 视窗高度/视窗宽度 取大值的1%

- 1vmin -> 视窗高度/视窗宽度 取小值的1%

``` css
<style>
    html{
        font-size: 100px;
    }
</style>
```

**resize.js**

``` javascript
<script>
    // ;(function() {

    //  var doc = document.documentElement;

    //  function reset() {
    //      var {clientWidth} = doc;  // var clientWidth = doc.clientWidth

    //      doc.style.fontSize = (clientWidth / 320) * 100 + 'px';
    //  }

    //  window.onresize = reset;
    //  reset();
    // })();

    ;(function() {
        var doc = document.documentElement;

        function resize() {
            doc.style.fontSize = doc.clientWidth / 320 * 100 + 'px';
        }

        window.addEventListener('resize', resize, false);

        resize();
    })();
</script>
```

**考虑Retina**

```
<script>
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');

    scale = 1 / dpr;
    dpr = window.devicePixelRatio || 1;
    rem = docEl.clientWidth * dpr / 10;

    // 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',
                         initial-scale=' + scale + ',maximum-scale=' + scale + ',
                         minimum-scale=' + scale + ',user-scalable=no');

    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);

    // 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

    // 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function(v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem: function(v) {
        v = parseFloat(v);
        return v / rem;
    };
    window.dpr = dpr;
    window.rem = rem;
</script>
```

#### 4. 弹性盒模型

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

`display:flex`

> **设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。**

**属性**

父级

- flex-direction flex方向
  - row/row-reverse -> 行(水平方向)/转置
  - column/column-reverse -> 列(竖直方向)/转置

- justify-content  对齐方式(水平方向)
  - flex-start -> 开始端
  - flex-end -> 结束端
  - center -> 中间
  - space-between -> 两端对齐 将两侧子元素顶到头，剩余空间均分
  - space-around -> 空间均分给每个子元素,子元素均分给两侧

- align-items  对齐方式(垂直方向)
  - flex-start -> 开始端
  - flex-end -> 结束端
  - center -> 中间
  - stretch -> 拉伸以充满
  - baseline -> 基线

- align-content

- flex-wrap 换行
  - nowrap -> 超出不换行
  - wrap -> 超出换行


子级

- flex: 1/2/3  均分剩余空间的多少份

-align-self
    flex-start -> 开始端
    flex-end -> 结束端
    center -> 中间
    stretch -> 拉伸以充满

**兼容：IE11+**
[ CSS之flex兼容](http://blog.csdn.net/u010130282/article/details/52627661)

``` css
<style>
    .box{
        display: -webkit-flex;  /* 新版本语法: Chrome 21+ */
        display: flex;          /* 新版本语法: Opera 12.1, Firefox 22+ */
        display: -webkit-box;   /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box;      /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;   /* 混合版本语法: IE 10 */

     }

    .flex1 {
        -webkit-flex: 1;        /* Chrome */
        -ms-flex: 1             /* IE 10 */
        flex: 1;                /* NEW, Spec - Opera 12.1, Firefox 20+ */
        -webkit-box-flex: 1;     /* OLD - iOS 6-, Safari 3.1-6 */
        -moz-box-flex: 1;       /* OLD - Firefox 19- */
    }
</style>
```

##### 应用

1. 一侧定宽，一侧自适应

``` css
<style>
    .container{
        display: flex;
    }

    .left{
        width: 200px;
        height: 200px;
        background-color: green;
    }

    .right{
        flex: 1;
        height: 200px;
        background-color: blue;
    }
</style>
```

2. 三列 中间定宽 两侧3:1

``` css
<style>
    .container{
        display: flex;
    }

    .center{
        width: 200px;
        height: 200px;
        background-color: green;
    }

    .right{
        flex: 1;
        height: 200px;
        background-color: blue;
    }

    .left{
        flex: 3;
        height: 200px;
        background-color: blue;
    }
</style>
```

3. 自适应5列等宽导航栏

``` css
<style>
    ul{
        width: 100%;
        display: flex;
    }

    ul > li{
        flex: 1;
        background-color: green;
        text-align: center;
        border: 5px solid black;
    }
</style>
```

### (3) 移动端事件

**在手机WEB端，click会有 200~300 ms，所以用tap代替click作为点击事件。**

- 事件
  - touchstart 当手指触摸到屏幕触发
  - touchmove  当手指在屏幕上移动时触发
  - touchend   当手指离开屏幕时触发
  - touchcancel  系统取消touch事件时触发

- 属性 每个触摸事件被触发后，会生成一个event对象，event对象里额外包括触摸列表
  - targetTouches 当前dom元素上手指的列表
  - 触摸列表的属性
  - clientX/clientY  触摸点相对浏览器窗口的位置
  - pageX/pageY  触摸点相对于页面的位置
  - screenX/screenY  触摸点相对于屏幕的位置
  - identifier  touch对象的ID
  - target  当前的DOM元素

#### 应用：移动端拖拽

``` javascript
<script>
    var oBox = document.querySelector('#box');

    oBox.addEventListener('touchstart', function(ev) {
        var clientX = ev.targetTouches[0].clientX;
        var clientY = ev.targetTouches[0].clientY;

        var disX = clientX - oBox.offsetLeft;
        var disY = clientY - oBox.offsetTop;

        document.addEventListener('touchmove', fnMove, false)

        document.addEventListener('touchend', fnEnd, false)

        function fnMove(ev) {
            var deltaX = ev.targetTouches[0].clientX - disX;
            var deltaY = ev.targetTouches[0].clientY - disY;

            oBox.style.left = deltaX + 'px';
            oBox.style.top = deltaY + 'px';

            ev.preventDefault();
        }

        function fnEnd() {
            document.removeEventListener('touchmove', fnMove, false)
            document.removeEventListener('touchend', fnEnd, false)

        }
    }, false)
</script>
```


#### 应用：移动端双击
``` javascript
<script>
    var oBox = document.querySelector('#box');
    var firstClicked = false;

    oBox.addEventListener('touchstart', function() {
        if (!firstClicked) {
            firstClicked = true;

            setTimeout(function() {
                firstClicked = false;
            }, 300)

        } else {
            alert(1);
        }
    }, false)
</script>
```

#### 应用：旋转缩放
``` javascript
<script>
    var oBox = document.querySelector('#box');

    var boxOriginX = oBox.offsetLeft + oBox.offsetWidth / 2;
    var boxOriginY = oBox.offsetTop + oBox.offsetHeight / 2;

    var scale = 1;    // 初始缩放比例
    var rotate = 0;   // 初始旋转度数

    document.addEventListener('touchstart', function(ev) {

        var startDis = getDistance(ev);
        var startDegree = getDegree(ev) - rotate;

        var oldScale = scale;

        document.addEventListener('touchmove', fnMove, false)

        function fnMove(ev) {

            // 缩放
            var endDis = getDistance(ev);

            scale = endDis / startDis + oldScale - 1;

            // 旋转
            var endDegree = getDegree(ev);
            var deltaDegree = startDegree - endDegree;

            rotate = -deltaDegree;

            oBox.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
        }
    }, false);


    function getDistance(ev) {

        var clientX = ev.targetTouches[0].clientX;
        var clientY = ev.targetTouches[0].clientY;

        var deltaX = clientX - boxOriginX;
        var deltaY = clientY - boxOriginY;

        return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    }

    function getDegree(ev) {
        var clientX = ev.targetTouches[0].clientX;
        var clientY = ev.targetTouches[0].clientY;

        var deltaY = clientY - boxOriginY;
        var deltaX = clientX - boxOriginX;

        return a2d(Math.atan2(deltaY, deltaX));
    }

    function a2d(a) {
        return a / Math.PI * 180;
    }
</script>
```

#### 应用：双指旋转
``` javascript
<script>
    var oBox = document.querySelector('#box');
    var rotate = 0;

    oBox.addEventListener('touchstart', function(ev) {
        if (ev.targetTouches.length == 2) {
            document.addEventListener('touchmove', fnMove, false);
            document.addEventListener('touchend', fnEnd, false);

            var oldDegree = rotate;

            var startDegree = getDegree(ev);

            function fnMove(ev) {
                var endDegree = getDegree(ev);
                var delta = startDegree - endDegree;

                oBox.style.transform = `rotate(${oldDegree+delta}deg)`;

                rotate = oldDegree + delta;
            }

            function fnEnd() {
                document.removeEventListener('touchmove', fnMove, false);
                document.removeEventListener('touchend', fnEnd, false);
            }

            ev.preventDefault();
        }
    }, false)

    function getDegree(ev) {
        var targetTouches = ev.targetTouches;
        var firstTouch = targetTouches[0];
        var secondTouch = targetTouches[1];

        var deltaX = firstTouch.clientX - secondTouch.clientX;

        var deltaY = firstTouch.clientY - secondTouch.clientY;

        return a2d(Math.atan2(deltaX, deltaY));
    }

    function a2d(a) {
        return a / Math.PI * 180;
    }
</script>
```

#### 应用：双指缩放
``` javascript
<script>
    var oBox = document.querySelector('#box');
    var scale = 1;

    oBox.addEventListener('touchstart', function(ev) {
        if (ev.targetTouches.length == 2) {
            document.addEventListener('touchmove', fnMove, false);
            document.addEventListener('touchend', fnEnd, false);

            var oldScale = scale;

            var startDis = getDistance(ev);

            function fnMove(ev) {
                var endDis = getDistance(ev);
                scale = endDis / startDis + oldScale - 1;

                oBox.style.transform = `scale(${scale})`;
            }

            function fnEnd() {
                document.removeEventListener('touchmove', fnMove, false);
                document.removeEventListener('touchend', fnEnd, false);
            }

            ev.preventDefault();
        }
    }, false)

    function getDistance(ev) {
        var targetTouches = ev.targetTouches;

        var firstTouch = targetTouches[0];
        var secondTouch = targetTouches[1];

        var deltaX = secondTouch.clientX - firstTouch.clientX;

        var deltaY = secondTouch.clientY - firstTouch.clientY;

        return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    }

    function a2d(a) {
        return a / Math.PI * 180;
    }
</script>
```

#### 应用：双指一起拖拽
``` javascript
<script>
    var oBox = document.querySelector('#box');

    oBox.addEventListener('touchstart', function(ev) {

        if (ev.targetTouches.length == 2) {
            document.addEventListener('touchmove', fnMove, false);
            document.addEventListener('touchend', fnEnd, false);
        }

        var disX = ev.targetTouches[0].clientX - (oBox.dataset.left || 0);
        var disY = ev.targetTouches[0].clientY - (oBox.dataset.top || 0);

        function fnMove(ev) {
            var deltaX = ev.targetTouches[0].clientX - disX;
            var deltaY = ev.targetTouches[0].clientY - disY;

            oBox.dataset.left = deltaX;
            oBox.dataset.top = deltaY;

            oBox.style.transform = `translate(${deltaX}px,${deltaY}px)`
        }

        ev.preventDefault();

        function fnEnd() {
            document.removeEventListener('touchmove', fnMove, false);
            document.removeEventListener('touchend', fnEnd, false);

        }
    }, false)
</script>
```

#### 应用：双指分开拖拽
``` javascript
<script>
    var oLeft = document.querySelector('.left');
    var oRight = document.querySelector('.right');

    function setDrag(obj) {
        obj.addEventListener('touchstart', function(ev) {
            var disX = ev.targetTouches[0].clientX - obj.offsetLeft;
            var disY = ev.targetTouches[0].clientY - obj.offsetTop;

            var myId = ev.targetTouches[0].identifier;

            document.addEventListener('touchmove', fnMove, false);
            document.addEventListener('touchend', fnEnd, false);

            function fnMove(ev) {
                if (ev.targetTouches[0].identifier == myId) {

                    var deltaX = ev.targetTouches[0].clientX - disX;
                    var deltaY = ev.targetTouches[0].clientY - disY;

                    obj.style.left = deltaX + 'px';
                    obj.style.top = deltaY + 'px';
                }
            }

            function fnEnd() {
                document.removeEventListener('touchmove', fnMove, false);
                document.removeEventListener('touchend', fnEnd, false);
            }

            ev.preventDefault();
        }, false)
    }

    setDrag(oLeft);
    setDrag(oRight);
</script>
```

#### 应用：移动端轮播图

``` css
<style>
    html {
        font-size: 100px;
    }
    body {
        font-size: 0.16rem;
        margin: 0;
    }
    .container {
        width: 3.2rem;
        overflow: hidden;
    }
    ul, li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    ul {
        width: 22.4rem;
        display: flex;
        transform: translateX(-3.2rem);
    }
    ul > li {
        width: 3.2rem;
        height: 2rem;
        background-color: green;
        font-size: 0.3rem;
        text-align: center;
        line-height: 2rem;
        font-weight: bold;
        color: white;
    }
</style>
```

``` html
    <div class="container">
        <ul>
            <li>5</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>1</li>
            <!-- <li>
                <img src="img/slide_4.jpg" alt="">
            </li>
            <li>
                <img src="img/slide_1.jpg" alt="">
            </li>
            <li>
                <img src="img/slide_2.jpg" alt="">
            </li>
            <li>
                <img src="img/slide_3.jpg" alt="">
            </li>
            <li>
                <img src="img/slide_4.jpg" alt="">
            </li>
            <li>
                <img src="img/slide_1.jpg" alt="">
            </li> -->
        </ul>
    </div>
```


``` javascript
<script>
    var aLi = document.querySelectorAll('li');
    var oUl = document.querySelector('ul');
    var vw = aLi[0].offsetWidth;

    var currentIndex = 0;
    var bReady = true;

    oUl.addEventListener('touchstart', function(ev) {

        // 控制频率
        if (!bReady) return;
        bReady = false;

        oUl.style.transition = '0s';

        var startX = ev.targetTouches[0].clientX;
        var disX = startX - (oUl.dataset.left || -vw);

        oUl.addEventListener('touchmove', fnMove, false);
        oUl.addEventListener('touchend', fnEnd, false);

        function fnMove(ev) {
            var deltaX = ev.targetTouches[0].clientX - disX;

            oUl.dataset.left = deltaX;

            oUl.style.transform = `translateX(${deltaX}px)`;

            ev.preventDefault();
        }

        function fnEnd(ev) {
            var endX = ev.changedTouches[0].clientX;
            var deltaX = endX - startX;

            // 拖拽距离是否可以切换
            if (Math.abs(deltaX) > vw / 4) {

                oUl.style.transition = '0.3s';

                //判断正负确定切换方向
                if (deltaX > 0) {
                    currentIndex--

                    if (currentIndex < 0) {
                        currentIndex = 0;
                    }
                } else {
                    currentIndex++

                    if (currentIndex > aLi.length - 1) {
                        currentIndex = aLi.length - 1;
                    }
                }

                setPosition();
            } else {

                // 不切换
                oUl.style.transition = '0.3s';
                setPosition();
            }

            oUl.removeEventListener('touchmove', fnMove, false);
            oUl.removeEventListener('touchend', fnEnd, false);
        }
    }, false)

    // 播放完毕之后判断currentIndex，是否拉回
    oUl.addEventListener('transitionend', function() {
        if (currentIndex == 0) {
            currentIndex = aLi.length - 2
        } else if (currentIndex == aLi.length - 1) {
            currentIndex = 1
        }

        oUl.style.transition = '0s';
        setPosition();

        bReady = true;
    }, false)

    aLi.forEach(function(oLi) {
        oLi.style.backgroundColor = `rgb(${
            rnd(0,255)
        },${
            rnd(0,255)
        },${
            rnd(0,255)
        })`
    })

    function setPosition() {
        var translate = -currentIndex * vw;
        oUl.style.transform = `translateX(${translate}px)`
        oUl.dataset.left = translate;
    }

    function rnd(n, m) {
        return parseInt(Math.random() * (m - n) + n);
    }
</script>
```

## 3. 移动端常用库

### (1) fastclick.js - 解决移动端click事件延迟 
``` javascript
    <script src="libs/zepto/zepto.js"></script>
    <script src="libs/zepto/touch.js"></script>
    <script src="libs/fastclick.js"></script>
    <script>
        FastClick.attach(document.body);

        $('.block').click(function(){
            console.timeEnd();
        })

        $('.block').on('touchstart',function(){
            console.time()
        })
    </script>
```