## Array.filter()

- array.filter(function(currentValue,index,arr), thisValue)

```
secChannel = this.channelList.filter(function(item){
    return item.id == channelId;
});
```

filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。

> 注意： filter() 不会对空数组进行检测。

> 注意： filter() 不会改变原始数组。

### filter妙用

#### 数组去重

```
var r,arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
 
r = arr.filter(function (element, index, self) {
 return self.indexOf(element) === index;
});
 
console.log(r.toString());
```

## $.inArray()

- $.inArray(item, array)

```
handleFav: function() {
    var item = this.item;
    var favids = this.favids;
    var that = this;

    if($.inArray(item.pid, favids) > -1){
        Vue.set(that.item, 'isFav', true);
    }
}
```