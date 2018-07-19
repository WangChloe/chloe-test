## 双向绑定原理
> 通过 Object.defineProperty 实现

- 源码

```
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
```

- 自写实现

```
<body>
    <div id="app">
        <input type="text" id="txt">
        <p id="show-txt"></p>
    </div>
    <script>
        var obj = {}
        Object.defineProperty(obj, 'txt', {
            get: function () {
                return obj
            },
            set: function (newValue) {
                document.getElementById('txt').value = newValue
                document.getElementById('show-txt').innerHTML = newValue
            }
        })
        document.addEventListener('keyup', function (e) {
            obj.txt = e.target.value
        })
    </script>
</body>
```

## vue的组件的props属性支持驼峰命名,不支持连接线命名,使用是用连接线进行赋值或者数据绑定

![](https://images2015.cnblogs.com/blog/797623/201702/797623-20170203174733792-236682446.png)