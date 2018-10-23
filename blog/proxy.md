this对象代理优化

[$.proxy使用](https://www.cnblogs.com/hongchenok/p/3919497.html)

- this对象更改

```
var that = this;

this.$mask.on("touchmove", function (ev) {
    ev.preventDefault();
}).on("click", function () {
    that.deactivate();
});
```
- 优化：$.proxy函数该改变上下文(context)语境

```
this.$mask.on("touchmove", function (ev) {
    ev.preventDefault();
}).on("click", this.proxy(function () {
    this.deactivate();
}));
```

- 设置变量指向this

```
 $('#myElement').click(function() {
 2     var that = this;   //设置一个变量，指向这个需要的this
 3 
 4     setTimeout(function() {
 5 
 6           // 这个this指向的是settimeout函数内部，而非之前的html元素
 7 
 8         $(that).addClass('aNewClass');
 9 
10     }, 1000);
11 
12 });
```

- 优化：bind(this)

```
$('#myElement').click(function() {

    setTimeout(function() {

        $(this).addClass('aNewClass');  

    }.bind(this), 1000);

});
```

- 优化：$.proxy

```
$('#myElement').click(function() {

    setTimeout($.proxy(function() {

        $(this).addClass('aNewClass');  

    }, this), 1000);

});
```