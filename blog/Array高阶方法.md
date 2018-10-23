[ES6---数组array新增方法](https://blog.csdn.net/wbiokr/article/details/65939582)

[5个数组Array方法: indexOf、filter、forEach、map、reduce使用实例](https://www.jb51.net/article/60502.htm)


- forEach没有返回值，重点是function里面处理逻辑
- map有返回值，重点是function返回值，组成新数组
- filter有返回值，重点是function返回值，过滤之后组成新数组
- reduce有返回值，重点是计算数组，返回一个值

## filter

> 创建一个新的匹配过滤条件的数组。

`var new_arr = arr.filter(callback(element, index, array){}, this)`

返回Array 类型//符合条件的值组成的数组

- 不用filter()时

```
var arr = [
  {"name":"apple", "count": 2},
  {"name":"orange", "count": 5},
  {"name":"pear", "count": 3},
  {"name":"orange", "count": 16},
];
   
var newArr = [];
 
for(var i= 0, l = arr.length; i< l; i++){
  if(arr[i].name === "orange" ){
newArr.push(arr[i]);
}
}
 
console.log("Filter results:",newArr);
```

- 用filter()时

```
var arr = [
  {"name":"apple", "count": 2},
  {"name":"orange", "count": 5},
  {"name":"pear", "count": 3},
  {"name":"orange", "count": 16},
];
   
var newArr = arr.filter(function(item){
  return item.name === "orange";
});
 
 
console.log("Filter results:",newArr);
```

## forEach
> 为每个元素执行对应的方法

undefined// 这个东西没有返回值

- 不用forEach()时

```
var arr = [1,2,3,4,5,6,7,8];
 
// Uses the usual "for" loop to iterate
for(var i= 0, l = arr.length; i< l; i++){
console.log(arr[i]);
}
```

- 用forEach()时

```
arr.forEach(function(item,index){
    console.log(item);
});
```

## map
> map()对数组的每个元素进行一定操作（映射）后，会返回一个新的数组。

返回 array 数组// 每个回调的返回值组成的新数组

- 不用map()时

```
var oldArr = [{first_name:"Colin",last_name:"Toh"},{first_name:"Addy",last_name:"Osmani"},{first_name:"Yehuda",last_name:"Katz"}];
 
function getNewArr(){
   
  var newArr = [];
   
  for(var i= 0, l = oldArr.length; i< l; i++){
    var item = oldArr[i];
    item.full_name = [item.first_name,item.last_name].join(" ");
    newArr[i] = item;
  }
   
  return newArr;
}
 
console.log(getNewArr());
```

- 用map()时

```
var oldArr = [{first_name:"Colin",last_name:"Toh"},{first_name:"Addy",last_name:"Osmani"},{first_name:"Yehuda",last_name:"Katz"}];
 
function getNewArr(){
     
  return oldArr.map(function(item,index){
    item.full_name = [item.first_name,item.last_name].join(" ");
    return item;
  });
   
}
 
console.log(getNewArr());
```

## reduce
> 实现一个累加器的功能，将数组的每个值（从左到右）将其降低到一个值。

返回最后一次回调的值

#### 计算重复单词
- 不用reduce()时

```
var arr = ["apple","orange","apple","orange","pear","orange"];
 
function getWordCnt(){
  var obj = {};
   
  for(var i= 0, l = arr.length; i< l; i++){
    var item = arr[i];
    obj[item] = (obj[item] +1 ) || 1;
  }
   
  return obj;
}
 
console.log(getWordCnt()); // {apple: 2, orange: 3, pear: 1}
```

- 用reduce()时

> 注意reduce内function后的{}

```
var arr = ["apple","orange","apple","orange","pear","orange"];
 
function getWordCnt(){
  return arr.reduce(function(prev,next){
    prev[next] = (prev[next] + 1) || 1;
    return prev;
  },{});
}
 
console.log(getWordCnt());
```

![](https://ws3.sinaimg.cn/large/006tNbRwgy1fujspdmnbej30dc08qjsf.jpg)


#### `array.reduce(function(total, currentValue, currentIndex, arr), initialValue)`
- total	必需。初始值, 或者计算结束后的返回值。
- currentValue	必需。当前元素
- currentIndex	可选。当前元素的索引
- arr	可选。当前元素所属的数组对象。
- **initialValue 可选。传递给函数的初始值**

##### 累加

```
var numbers = [65, 44, 12, 4];
 
function getSum(total, num) {
    return total + num;
}
function myFunction(item) {
    document.getElementById("demo").innerHTML = numbers.reduce(getSum); // 125
}
```

##### 初始值的重要性
> 一般来讲prev是从数组中第一个元素开始的，next是第二个元素。但是当你**传入初始值(initialValue)后，第一个prev将是initivalValue，next将是数组中的第一个元素**。

```
var arr = ["apple","orange"];
 
function noPassValue(){
  return arr.reduce(function(prev,next){
    console.log("prev:",prev);
    console.log("next:",next);
     
    return prev + " " +next;
  });
}
function passValue(){
  return arr.reduce(function(prev,next){
    console.log("prev:",prev);
    console.log("next:",next);
     
    prev[next] = 1;
    return prev;
  },{});
}
 
console.log("No Additional parameter:",noPassValue());
console.log("----------------");
console.log("With {} as an additional parameter:",passValue());
```
![](https://ws2.sinaimg.cn/large/006tNbRwgy1fujt1qypj8j30cb05iaae.jpg)


## 应用

- 有一组用户信息按手机号降序排序，输出用户名称，用逗号分隔

```
[{name: 'l1', phone: '1507539'},{name: 'l2', phone: '1507540'},{name: 'l3', phone: '1507541'},{name: 'l4', phone: '1507538'}]
 .sort((n,m)=>n.phone<m.phone)
 .map(m=>m.name)
 .join(',');
 
 // "l3,l2,l1,l4"
```

- 给元素绑事件

```
[].slice.call(document.querySelectorAll('div'))
.forEach(v=>v.addEventListener('click',e=>console.log(e.target.className))
```

- 获取所有元素的class,过滤空串

```
[].slice.call(document.querySelectorAll('*'))
 .map(v=>v.className)
 .filter(v=>v)
```