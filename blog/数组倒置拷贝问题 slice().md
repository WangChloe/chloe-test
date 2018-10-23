- 引用类型

```
var arrA = [1,2,3,4];
var arrB = arrA.reverse();

console.log(arrA);  // [4,3,2,1]
console.log(arrB);  // [4,3,2,1]


```

> 数组倒置需拷贝至新数组才能不影响原数组

```
var arrA = [1,2,3,4];
var arrB = arrA.slice(); // 浅拷贝  **数组倒置需拷贝才能不影响原数组

arrB.reverse();

console.log(arrA); // [1,2,3,4]
console.log(arrB); // [4,3,2,1]

arrB[1] = 0

console.log(arrA) // [1, 2, 3, 4]
console.log(arrB) // [4, 0, 2, 1]
```

```
var obj = [
    {
        name:'melin1',
        job:'111'
    },
    {
        name:'melin2',
        job:'222'
    },
    {
        name:'melin3',
        job:'333'
    }
];
var copy = obj.slice(0);
copy[1].name = 'tom';
console.log(obj[1].name); //tom
console.log(copy[1].name); //tom
```
> slice可看作浅拷贝，因为如果obj有引用类型的元素，slice仅仅是复制了元素的地址。
1. 如果obj所有值都是非引用类型，那么obj.slice(0)与深浅拷贝没有差别；
2. 如果obj有引用类型的元素的话，obj.slice(0)仅仅是复制了元素的地址，obj.slice(0)可看作浅拷贝。

- ES6 数组浅拷贝

```
const arrA = [1,2,3,4];
const arrB = [...arrA];

arrB.reverse();

console.log(arrA); // [1,2,3,4]
console.log(arrB); // [4,3,2,1]
```

---

[js实现深拷贝](https://blog.csdn.net/sysuzhyupeng/article/details/70340598)

- 1.元素的类型判断

```
   function getType(obj){
       //tostring会返回对应不同的标签的构造函数
       var toString = Object.prototype.toString;
       var map = {
          '[object Boolean]'  : 'boolean', 
          '[object Number]'   : 'number', 
          '[object String]'   : 'string', 
          '[object Function]' : 'function', 
          '[object Array]'    : 'array', 
          '[object Date]'     : 'date', 
          '[object RegExp]'   : 'regExp', 
          '[object Undefined]': 'undefined',
          '[object Null]'     : 'null', 
          '[object Object]'   : 'object'
      };
      if(obj instanceof Element) {
           return 'element';
      }
      return map[toString.call(obj)];
   }
```

- 2.1递归拷贝

```
   function deepClone(data){
       var type = getType(data);
       var obj;
       if(type === 'array'){
           obj = [];
       } else if(type === 'object'){
           obj = {};
       } else {
           //不再具有下一层次
           return data;
       }
       if(type === 'array'){
           for(var i = 0, len = data.length; i < len; i++){
               obj.push(deepClone(data[i]));
           }
       } else if(type === 'object'){
           for(var key in data){
               obj[key] = deepClone(data[key]);
           }
       }
       return obj;
   }

```

- 2.2树的广度优先遍历
```
   //这里为了阅读方便，只深拷贝对象，关于数组的判断参照上面的例子
   function deepClone(data){
       var obj = {};
       var originQueue = [data];
       var copyQueue = [obj];
       //以下两个队列用来保存复制过程中访问过的对象，以此来避免对象环的问题（对象的某个属性值是对象本身）
       var visitQueue = [];
       var copyVisitQueue = [];
       while(originQueue.length > 0){
           var _data = originQueue.shift();
           var _obj = copyQueue.shift();
           visitQueue.push(_data);
           copyVisitQueue.push(_obj);
           for(var key in _data){
               var _value = _data[key]
               if(typeof _value !== 'object'){
                   _obj[key] = _value;
               } else {
                   //使用indexOf可以发现数组中是否存在相同的对象(实现indexOf的难点就在于对象比较)
                   var index = visitQueue.indexOf(_value);
                   if(index >= 0){
                       // 出现环的情况不需要再取出遍历
                       _obj[key] = copyVisitQueue[index];
                   } else {
                       originQueue.push(_value);
                       _obj[key] = {};
                       copyQueue.push(_obj[key]);
                   }
               }
           }
       }
       return obj;
   }
```

- 2.3 JSON解析反解析
```
深拷贝对象还有另一个解决方法，在对象中不含有函数的时候，使用JSON解析反解析就可以得到一个深拷贝对象
```