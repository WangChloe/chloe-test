<!-- MarkdownTOC -->

- 声明变量
  - let
    - let声明的变量只在当前代码块内有效
    - for循环变量为副作用域，循环内部为子作用域，let范围不冲突不交叉
    - 不存在变量提升
    - 暂时性死区
    - 不允许重复声明
  - const
    - 应用场景
  - ES5 & ES6 声明变量
    - 顶层对象 & 全局变量
  - global对象
    - 顶层对象
    - this变量
    - 引入global作为顶层对象
- 变量的解构赋值
  - 默认值
  - 对象的解构赋值
  - class类

<!-- /MarkdownTOC -->


let, const, class, extends, super, arrow functions, template string, destructuring, default, rest arguments


# 声明变量

## let

let & var

### let声明的变量只在当前代码块内有效

```
{
    let a = 10;
    var b = 1;
}

a  // a is not defined
b  // 1

```

- eg: 可用于for循环计数

```
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

```
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

### for循环变量为副作用域，循环内部为子作用域，let范围不冲突不交叉

```
for(let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}

//abc
//abc
//abc
```

### 不存在变量提升

```
console.log(foo); // undefined
var foo = 2;

console.log(bar); // 报错
let bar = 2;
```

### 暂时性死区

```
var tmp = 123;

if(true) {
    tmp = 'abc'; // 报错
    let tmp;
}
```

let绑定了if语句的块级作用域

```
var x = x; // 不报错

let x = x; // 报错
```

### 不允许重复声明

```
// 报错
function func() {
    let a = 10;
    var a = 1;
}

// 报错
function func() {
    let a = 10;
    let a = 1;
}
```

```
function func(arg) {
    let arg; // 报错
}

function func(arg) {
    {
        let arg;
    }
}
```

> 函数声明

- 允许在块级作用域内声明函数。

- 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。

- 同时，函数声明还会提升到所在的块级作用域的头部。

```
// *浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
  // var f = undefined;

  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();  // f is not a function
}());
```

**优化 => 推荐函数表达式**

```
// 函数声明语句
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

## const

- 声明常量

- 只在声明所在的块级作用域内有效

> const并不是变量的值不得改动，而且是变量指向的**内存地址**不得改动。


简单类型的数据(数值、字符串、布尔值) => 常量

复合类型的数据(对象、数组等) => 指针地址

```
const foo = {};

// foo可以添加自身属性
foo.prop = 123;
foo.prop;  // 123

foo = {};  // 报错，foo不能指向另一个对象

const a = [];
a.push('Hello'); // 可添加数据
a.length = 0;  // 可定义属性

a = ['Chloe'];  // 报错，不能指向另一个数组
```

### 应用场景

引用第三方库的时声明的变量，用const来声明可以避免未来不小心重命名而导致出现bug。

```
const monent = require('moment')
```

## ES5 & ES6 声明变量

- ES5: `var` `function`

- ES6: `var` `function` `let` `const` `import` `class`


### 顶层对象 & 全局变量

- var命令和function命令声明的全局变量，依旧是顶层对象的属性

- let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性

```
var a = 1;
window.a // 1

let b = 1;
window.b // undefined
```

## global对象

### 顶层对象

- 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。

- 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。

- Node 里面，顶层对象是global，但其他环境都不支持。

### this变量

- 全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。

- 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。

- 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全政策），那么eval、new Function这些方法都可能无法使用。


### 引入global作为顶层对象

- 方法一

```
(typeof window !== 'undefined'
    ? widnow
    : (typeof process === 'object' &&
       typeof require === 'function' &&
       typeof global === 'object')
    ? global
    : this);
```

- 方法二

```
var getGlobal = function () {
    if(typeof self !== 'undefined') { return self; }
    if(typeof window !== 'undefined') { return window; }
    if(typeof global !== 'undefined') {return global; }
    throw new Error('unable to locate global object');
};
```

# 变量的解构赋值

从数组和对象中提取值，对变量进行赋值。

```
let [a, b, c] = [1, 2, 3];

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]


let [x, ,y, ...z] = ['a'];
x // "a"
y // undefined
z // []

let [a, [b], [d]] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

## 默认值

> ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。


```
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

let [x = 1] = [undefined]; // x=1

let [x = 1] = [null]; // x=null
```



## 对象的解构赋值

> 对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // foo is not defined 
```

> 解构赋值的内部机制：先找到同名属性，然后再赋给对应的变量。真正被赋值的是baz而不是foo。

## class类

```
class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        console.log(this.type + ' says ' + say)
    }
}

let animal = new Animal()
animal.says('hello') //animal says hello

class Cat extends Animal {
    constructor(){
        super()
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.says('hello') //cat says hello
```

























