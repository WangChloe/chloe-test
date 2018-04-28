<!-- MarkdownTOC -->

- let

<!-- /MarkdownTOC -->


let, const, class, extends, super, arrow functions, template string, destructuring, default, rest arguments


## let

let & var

- let声明的变量只在当前代码块内有效

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

- for循环变量为副作用域，循环内部为子作用域，let范围不冲突不交叉

```
for(let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}

//abc
//abc
//abc
```

- 不存在变量提升

```
console.log(foo); // undefined
var foo = 2;

console.log(bar); // 报错
let bar = 2;
```

