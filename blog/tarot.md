# 精彩代码

- shuffle 洗牌代码

```
//随机排序
String.prototype.shuffle = function(arr) {
    return arr.sort(function() {
        return .5 - Math.random()
    })
}

var a = [1,3,4,0,2];
var b = a.suffle(); // [3, 1, 0, 4, 2]

```