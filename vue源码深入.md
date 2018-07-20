<!-- MarkdownTOC -->

- 源码研读 Vue.js v2.3.3\(7.19\)
  - vue 判定数据类型系列
  - JSON.stringify参数说明
    - JSON.stringify\(value\[, replacer[, space\]]\)
  - 创建纯函数的缓存版本
    - 应用
  - Fn.bind
    - 原生bind实现原理
      - call & apply & bind
    - Vue改进版
  - once 只执行一次
  - 组件、指令、过滤器
  - 生命周期
  - 双向绑定原理
  - vue的组件的props属性支持驼峰命名,不支持连接线命名,使用是用连接线进行赋值或者数据绑定

<!-- /MarkdownTOC -->

---

# 源码研读 Vue.js v2.3.3(7.19)

## vue 判定数据类型系列

``` javascript

// 未定义
function isUndef (v) {
  return v === undefined || v === null
}

// 已定义
function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

// ECMAScript 有 5 种原始类型（primitive type），即 Undefined、Null、Boolean、Number 和 String。
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

// 除null之外的对象
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;
// 纯对象
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

// 正则
function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

// 弱比较等值
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
```

## JSON.stringify参数说明

eg:

``` javascript
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}
// {a:1} ->
// {
//   a:1
// }
```

###  JSON.stringify(value[, replacer[, space]])

- value: 必需， 要转换的 JavaScript 值（通常为对象或数组）。

- replacer: 可选。用于转换结果的函数或数组。
  - 如果 replacer 为函数，则 JSON.stringify 将调用该函数，并传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""。
  - 如果 replacer 是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样。当 value 参数也为数组时，将忽略 replacer 数组。

- space:可选，文本添加**缩进、空格和换行符**
  - 如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格
  - 如果 space 大于 10，则文本缩进 10 个空格。
  - space 有可以使用非数字，如：\t。

## 创建纯函数的缓存版本

``` javascript
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str)) // 若当前方法已缓存过参数为str的值则直接返回值不再执行方法
  })
}
```

### 应用

- 连字符转驼峰

``` javascript
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

// camelize('aC-bb'); // aCBb
```

- 首字母大写

``` javascript
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});
```

- 驼峰转连字符
``` javascript
var hyphenateRE = /([^-])([A-Z])/g;  // 匹配除了'-'之后的大写字母以及这个大写字母之前的值，大写字母之前的值为$1，大写字母为$2
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2') // 将上述匹配的大写字母之前的值和大写字母转化为"大写字母之前的值-大写字母"，中间添加连字符
    .replace(hyphenateRE, '$1-$2') // 进一步将之前连在一起的大写字母间用连字符连接
    .toLowerCase()
});

// hyphenate('Z-BsaGgAcdadR'); // z-bsa-gg-acdad-r

// 'Z-BADPOsAGgAcdadR'.replace(hyphenateRE, '$1-$2');
// "Z-B-AD-POs-AGg-Acdad-R" $2分别为A P A A R

// 'Z-BADPOsAGgAcdadR'.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2');
// "Z-B-A-D-P-Os-A-Gg-Acdad-R" $2分别为D O G

```

## Fn.bind

### 原生bind实现原理

``` javascript
if (Function.prototype.bind === undefined) {
    Function.prototype.bind = function(obj /*，参数列表*/ ) {
        var that = this; //留住this

        //将类数组对象，转化为普通数组
        var args = Array.prototype.slice.call(arguments, 1);
        //args保存的就是提前绑定的参数列表
        /*function slice(1){
           var sub=[];
           for(var i=0;i<arguments.length;i++){
            sub.push(arguments[i]);
           }
           return sub;
        }*/

        return function() {

            //将后传入的参数值，转为普通数组
            var innerArgs = Array.prototype.slice.call(arguments);

             //将之前绑定的参数值和新传入的参数值，拼接为完整参数之列表
            var allArgs = args.concat(innerArgs)

            //调用原始函数fun，替换this为obj，传入所有参数
            that.apply(obj, allArgs);
        }
    }
}
```

#### call & apply & bind

``` javascript
function fn(a,b,c,d){
　　console.log(a,b,c,d);
}

//call
fn.call(null,1,2,3); // 1 2 3 undefined

//apply
fn.apply(null,[1,2,3]); // 1 2 3 undefined

//bind
var f = fn.bind(null,1,2,3); // 1 2 3 4
f(4);
```

> 使用call和apply会直接执行这个函数，而bind并不会而是将绑定好的this重新返回一个新函数，什么时候调用由你自己决定。

### Vue改进版

**多个参数时apply较快，0～1个参数时call较快**

``` javascript
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}
```


## once 只执行一次

``` javascript
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}
```

## 组件、指令、过滤器

``` javascript
var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];
```

## 生命周期

``` javascript

// 生命周期钩子
var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];
```


## 双向绑定原理
> 通过 Object.defineProperty 实现

- 源码

``` javascript
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

``` html
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
