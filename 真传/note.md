### 大数相加


1.1 | 0   // 1 单杠取整
1.1 || 0 // 1.1 默认值0


> 大数相加超出`Number.MAX.VALUE`会不准确

![](https://user-images.githubusercontent.com/962712/29358182-b0ed7164-82ac-11e7-9629-10c0a36ce55f.png)

> 数字类型通过8字节的 double 浮点型表示，在JS中，使用 Number.MAX_SAFE_INTEGER 可以获得JS最大安全可进行算数运算的最大值范围 => 9007199254740991 十六位整型，因为使用的是浮点数运算会丢失精度，所以大于这个值运算都不对。 由于在第-14位上面有进位的问题，所以按13位进行切分计算，用-15会丢位的。


- 老师方案

![](http://ww3.sinaimg.cn/large/006tNc79gy1g5ot4ol3q0j30u00vqnat.jpg)


- while方案

``` javascript
const add2 = (x, y) => {
  x = '' + x;
  y = '' + y;

  if (/\D/.test((x + y))) {
    return NaN;
  }

  let output = '';
  let carry = '';
  let zero = '0000000000000000000000';

  const split = (str) => (zero + str).split(/(?=\d{14}$)/);
  const remove_left_zero = (str) => ('' + str).replace(/^0+/, '');

  while (x.length > 0 || y.length > 0 || carry.length > 0) {
    let tx = split(x);
    let ty = split(y);
    let ta = split(parseInt(tx[1] || 0, 10) + parseInt(ty[1] || 0, 10) + parseInt(carry || 0, 10));
    output = ta[1] + output;
    carry = ta[0];
    x = remove_left_zero(tx[0]);
    y = remove_left_zero(ty[0]);
    carry = remove_left_zero(carry);
  }

  return remove_left_zero(output);
}
```

``` javascript
var safeLength = 15; // 14 ?
const add1 = (x, y) => {
    var sum = ''; // 相加结果
    var flag = 0; // 进位
    while (x.length > 0 || y.length > 0) {
        // 计算最后面safeLength个数字的相加值
        var tailX = x.substr(-safeLength) || '0';
        var tailY = y.substr(-safeLength) || '0';
        var tailSum = (parseInt(tailX) + parseInt(tailY) + flag).toString();
        // 前头补齐0（刚好切害到0开头的情况）
        var orginLength = Math.max(tailX.length, tailY.length);
        if (tailSum.length < orginLength) {
            tailSum = '0'.repeat(orginLength - tailSum.length) + tailSum;
        }
        // 重新计算进位
        flag = parseInt(tailSum.substr(0, tailSum.length - safeLength) || 0);
        // 除进位之外，添加到结果前面
        sum = tailSum.substr(-safeLength) + sum;
        // 去掉已计算的最后面safeLength个数字
        x = x.substr(0, x.length - safeLength);
        y = y.substr(0, y.length - safeLength);
    }
    // 最后的进位
    sum = flag ? flag + sum : sum;
    return sum;
}

function add2(a, b) {
    var aList = a.split('').reverse();
    var bList = b.split('').reverse();
    var max = Math.max(aList.length, bList.length);
    var cList = [];
    var flag = 0;
    
    for (var i = 0; i < max; i++) {
        var temp = (+aList[i] || 0) + (+bList[i] || 0) + flag;
        flag = 0;
        if (temp > 9) {
            temp -= 10;
            flag = 1;
        }
        cList.push(temp);
    }
    if (flag > 0) {
        cList.push(flag);
    }
    return cList.reverse().join('');
}

(function test() {
    let times = 100;
    let numbers = '';
    while(--times) {
        numbers += Math.random();
    }
    numbers = numbers.replace(/\D/g, '');
      
    let counts = 1e5;
    while(--counts) {
        let x = numbers.substring(Math.random() * 10 >> 0, Math.random() * 30 >> 0);
        let y = numbers.substring(Math.random() * 30 >> 0, Math.random() * 80 >> 0);
        //x = '1736';
        //y = '611111750505538122824820966007687248173708494041043351';
        var sum1 = add1(x, y);
        var sum2 = add2(x, y);
        if (sum1 != sum2) {
            console.log('x:' + x);
            console.log('y:' + y);
            console.log('sum1', sum1);
            console.log('sum2', sum2);
        }
    }
})()
```

- 最简洁的方案

``` javascript
function sumStrings(a,b){
    var res='', c=0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || c){
        c += ~~a.pop() + ~~b.pop();
        res = c % 10 + res;
        c = c>9;
    }
    return res.replace(/^0+/,'');
}
```


### this

指向调用环境的对象，与声明位置无关

严格模式下指向的全局this是undefined


Node环境下var xxx;是模块变量，不是global变量 



