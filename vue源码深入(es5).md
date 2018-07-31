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
  - Object属性相关
    - Object.freeze\(obj\)
    - Object.defineProperty\(obj, prop, descriptor\)
  - 组件、指令、过滤器
  - 生命周期
  - 双向绑定原理
  - vue的组件的props属性支持驼峰命名,不支持连接线命名,使用是用连接线进行赋值或者数据绑定
  - 杂七杂八
    - 空函数
    - 编写Set
  - hasSymbol
  - nextTick
  - watch - 观察者模式
    - dep\(\)
    - leaking arguments
    - observer
    - watcher

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

## Object属性相关

### Object.freeze(obj)

``` javascript
// Object.freeze()阻止修改现有属性的特性和值，并阻止添加新属性。
var emptyObject = Object.freeze({});
```

> 可以利用这个方法将对象彻底冻结，使其符合const变量的含义

### Object.defineProperty(obj, prop, descriptor)

- obj: 需要被操作的目标对象
- prop: 目标对象需要定义或修改的属性的名称
- descriptor: 将被定义或修改的属性的描述符
  - configurable: 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
  - enumerable: 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。
  - 数据描述符同时具有以下可选键值：
    - value 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
    - writable - 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。
  - 存取描述符同时具有以下可选键值：
    - get: 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。默认为 undefined。
    - set: 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。默认为 undefined。


``` javascript
// 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
var obj = new Object();
Object.defineProperty(obj, 'name', {
    configurable: false,
    writable: true,
    enumerable: true,
    value: '张三'
})
console.log(obj.name)  //张三
```

> 双向绑定原理

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

## 杂七杂八

### 空函数
``` javascript
/**
 * Perform no operation.
 * 无操作的空函数
 */
function noop () {}
```

### 编写Set

``` javascript
var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}
```

## hasSymbol

``` javascript

var hasProto = '__proto__' in {}; // true

function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
// console.log(typeof Symbol); // "function"
// console.log(Symbol.toString()); // "function Symbol() { [native code] }"

// console.log(typeof Reflect); // "object"
// console.log(Reflect.ownKeys.toString()); // "function ownKeys() { [native code] }"
```

## nextTick

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

``` javascript
/**
 * Defer a task to execute it asynchronously.
 * 延迟任务异步执行
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false; // 进行中
  var timerFunc;

  function nextTickHandler () {
    pending = false;

    var copies = callbacks.slice(0); // 浅拷贝
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:

  // nextTick行为促使了可以通过原生Promis.then或者MutationObserver的微任务队列改变。
  // MutationObserver得到了更广泛的支持，但在ios版本大于9.3.3的触摸事件上有严重的问题。
  // 它在触发一段时间后完全停止，所以，如果原生Promis是可用的情况下，我们才使用它。
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    // console.log(typeof Promise); //"function"
    // console.log(Promise.toString()); //"function Promise() { [native code] }"
    var p = Promise.resolve();  // 成功cb
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  // ...
}

```


## watch - 观察者模式

[](https://blog.csdn.net/qq3401247010/article/details/77131998)

### dep()

``` javascript

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 * DEP是可观察的，可以有多个指令订阅它。
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

// 通知
Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  // 首先稳定订阅者名单
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

```

### leaking arguments

[](http://jsperf.com/closure-with-arguments)

> 传递arguments给任何参数，将导致Chrome和Node中使用的V8引擎跳过对其的优化，这也将使性能相当慢。

``` javascript
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 * 不能对该文件进行类型检查，因为流对数组原型的动态访问方法没有很好的效果
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    // 避免泄露参数
    // *传递arguments给任何参数，将导致Chrome和Node中使用的V8引擎跳过对其的优化，这也将使性能相当慢。
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
```

- Object.getOwnPropertyNames(obj) 返回自身的可枚举和不可枚举属性的名称

``` javascript
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

// 类数组对象
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]

// 使用Array.forEach输出属性名和属性值
Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
  console.log(val + " -> " + obj[val]);
});
// 输出
// 0 -> a
// 1 -> b
// 2 -> c

//不可枚举属性
var my_obj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
```

### observer

``` javascript
/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 * 默认情况下，当设置了一个可观测的属性时，新值也被转换为可观测的。
 * 然而，当通过props时，我们不想强制转换，因为该值可能是冻结数据结构下的嵌套值。转换它将击败优化。
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 * 观察者类被每个观察的对象触发，一旦触发，观察者转化目标对象的属性秘钥去获取或者设置关联以来
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};
```

### watcher

- 这个类主要是用来观察方法/表达式中引用到的数据（数据需要是 reative 的，即 data 或者 props）变更，当变更后做出相应处理。

``` javascript
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 * 向该指令添加依赖项
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};


```
