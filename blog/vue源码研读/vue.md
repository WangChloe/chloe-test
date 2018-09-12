<!-- MarkdownTOC -->

- 指令
    - 渲染层次
    - 所有指令
    - 重要缩写
    - 自定义指令
- 过滤器
    - 自定义过滤器
- 事件
    - 事件修饰符
- 监听
- 组件
    - 注册组件
    - 参数
    - 组件API
    - 组件通信
    - 组件嵌套规则
- SPA  \(vue-router库\)
- 交互\(vue-resource库\)
- vue构造器
- 实例的生命周期
- 响应
- 过渡效果
    - 简易动画
    - 过渡
    - 动画

<!-- /MarkdownTOC -->


[Vue手册](http://v1-cn.vuejs.org/guide/)

兼容：IE9+、Chrome、FF

## 指令
### 渲染层次
#### 声明式渲染

- v-model 表单value值

```
<!-- 双向绑定 -->
<div id="div1">{{data1}}</div>
<div class="div1">{{data2}}  {{data3}}</div>
<div class="div1">{{data2}}</div>
<div id="div2">
    <input type="text" v-model="msg"/>
    <p>{{msg}}</p>
</div>

- vm.msg

#### 列表渲染(循环)

- v-for

<!-- for循环 -->
<div id="div3">
    <a href="javascript:;" v-for="val in arr">{{val}}  {{$index}}</a>
    <ul>
        <li v-for="{key,value} in jsonD">{{value}}</li>
    </ul>
</div>
<script>
    new Vue({
        el: '#div1',
        data: {
            data1: 'wsfssagadsww'
        }
    });

    new Vue({
        el: '.div1',    // 选择多个元素时只对第一个有效
        data: {
            data2: 'rywrsgvcbxff',
            data3: 'agbfagdahvceyuj'
        }
    });

    new Vue({
        el: '#div2',
        data: {
            msg: '双向绑定'
        }
    });

    new Vue({
        el: '#div3',
        data: {
            arr: [132, 142124 , 'zfaf', 523],
            jsonD: {a: 'das', b:'fafa', c:'agds'}
        }
    });
</script>
```

#### 条件渲染
```
<!-- v-bind v-show v-if v-else 过滤器 -->
<div id="div1">
    <div v-bind:class="{red:a,blue:b,'green':g}"></div>
    <div class="red" v-bind:style="{width:w}"></div>
    <p v-show="false">1212</p>    <!-- display:none/block; 保留DOM -->
    <input type="checkbox" v-model="c" />
    <p v-if="c">1212</p>    <!-- c为假，走else，if整个DOM删除 不保留DOM -->
    <p v-else="c">333333</p>
    {{m | currency '￥' 2}}
</div>
<script>
    new Vue({
        el: '#div1',
        data: {
            msg: 'hi Vue',
            a: true,
            b: false,
            c: '',
            m: 1000
        },

    });
</script>
```

### 所有指令

#### v-model
表单value值

<input type="radio" v-model="pick" v-bind:value="a">

> 全局model对象vm
vm.pick === vm.a

##### v-model修饰符

- .lazy

在 "change" 而不是 "input" 事件中更新
<input v-model.lazy="msg" >

- .number

自动将用户的输入值转为 Number 类型
<input v-model.number="age" type="number">

- .trim

自动过滤用户输入的首尾空格
<input v-model.trim="msg">

#### v-bind
1. 对象

2. 数组

#### v-if (应用场景：条件不常改变)
v-if / v-else / v-else-if

支持<template>语法

若v-if为false，删除整个DOM

> v-for&v-if同时使用，v-for优先级更高

#### v-show (应用场景：频繁切换)
display:none/block;

不支持<template>语法

若v-show为false，保留DOM，仅隐藏元素

#### v-for
支持<template>语法

四种形式

(1) arr为数组，val为数组元素，$index为索引
<a href="javascript:;" v-for="val in arr">{{val}}  {{$index}}</a>

(2) arr为数，item为数组元素，index为索引
<li v-for="(item, index) in arr">{{index}} {{item.msg}}</li>

(3) jsonD为json对象，key为键名，value为键值
<li v-for="{value, key} in jsonD">{{value}}</li>

(4) 指定迭代10次
 <span v-for="n in 10">{{ n }} </span>


> 组件使用v-for，key必须填写

```
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id">
</my-component>
```

#### v-on 事件绑定

### 重要缩写
- `v-bind:href="url"` -> `:href="url"`

- `v-on:click="fn"` -> `@click="fn"`

### 自定义指令

```
<div v-red id="div1">
    背景颜色变了
</div>
<script>
    Vue.directive('red', function() {
        this.el.style.backgroundColor = 'red';
    });
    new Vue({
        el: '#div1'
    });
</script>
```

#### 自定义指定传参

```
<div v-red="'<h1>字也变了</h1>'" id="div1"> <!-- 注意指令赋值是字符串 -->
    背景颜色变了
</div>
<script>
    Vue.directive('red', function(value) {
        this.el.style.backgroundColor = 'red';
        this.el.innerHTML = value;
    });
    new Vue({
        el: '#div1'
    });
</script>
```

#### 自定义指令应用于标签

**不建议使用**
```
<div id="div1">
    背景颜色没变
    <v-red>背景颜色变了</v-red> <!-- 现在不是块元素了 -->
</div>
<script>
    Vue.elementDirective('v-red',{
        bind:function(){
            this.el.style.backgroundColor='red';
        }
    });
    new Vue({
        el:'#div1',
    });
</script>
```
## 过滤器

### 自定义过滤器
```
<div id="div1">
    {{msg|reverse}}
    {{msg|reverse2 'a1' 'b1'}}
</div>
<script>
    Vue.filter('reverse', function(input) {
        return input.split(' ').reverse().join(' ');
    });

    Vue.filter('reverse2', function(input, a, b) {
        return input.split(' ').reverse().join(' ') + a + b;
    });

    new Vue({
        el: '#div1',
        data: {
            msg: 'hello vue world'
        },
    });
</script>
```

```
<script>
    new Vue({
      filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        },
        f2: function(value){

        }
      }
    })
</script>
```

## 事件

v-on两种方式添加事件

1. v-on:click = "add()"

2. @click = "add()"

> **不传参可以不加括号**

```
<div id="div1">
    <input type="text" placeholder="请输入东西" v-model="msg" @keyup.13="add" />
    <input type="button" value="添加" @click="add" />
    <ul>
        <li v-for="val in mdata">
            {{val}}
            <a href="javascript:;" @click="del($index)">删除</a>
        </li>
    </ul>
</div>
<script>
    new Vue({
        el: '#div1',
        data: {
            msg: '',
            mdata: []
        },
        methods: {
            add: function() {
                if(this.msg == '') {
                    alert('不能为空');
                    return;
                }
                this.mdata.unshift(this.msg);
                this.msg = '';
            },
            del: function(index) {
                this.mdata.splice(index, 1);
            }
        }
    });
</script>
```

### 事件修饰符
.stop

.prevent

.capture

.self

.once

1. 阻止冒泡：
- ev.propageation()
- @click.stop = "show()"

2. 阻止默认：
- ev.preventDefault()
- @contextmenu.prevent = "show()"

3. 阻止冒泡、，默认
- @contextmenu.stop.prevent = "show()"

4. 键码事件
- @keyup.键码 = "show($event)"

或者

- @keyup.ctrl.enter = "show($event)"
- @keyup.left = "show($event)"

5. 事件捕获
- @click.capture = "show()"

6. 事件在元素本身(不包含子元素)时触发
- @click.self = "show()"

7. 阻止所有点击
- @click.prevent.self = "show()"

8. 阻止元素上的点击
- @click.self.prevent = "show()"

9. 事件只触发一次
- @click.once = "show()"

#### v-on修饰符

- .native

监听原生事件
<my-component v-on:click.native="doTheThing"></my-component>



## 监听
var v = new Vue(...);

- v.$watch(监听对象, function() {});

- v.$watch(监听对象, function() {}, {deep:true});   // 深度监听

## 组件
### 注册组件

- 全局组件 `Vue.component(tagName, options)`

Vue.component('xxx', {
    
})

> **全局组件需在初始化根实例之前注册**

```
<script>
// 注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

// 创建根实例
new Vue({
  el: '#example'
})
</script>
```

- 局部组件

```
<script>
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
</script>
```
### 参数

#### props

```
<div id="app">
    <ol>
        <todo-item v-for="item in items" v-bind:todo="item" v-bind:key="item.id"></todo-item>
    </ol>
</div>
```
```
<script>
// 将数据从父作用域传到子组件
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
})

var app = new Vue({
    el: '#app',
    data: {
        items: [
            {id:0, text: 'aaa'},
            {id:1, text: 'bbb'},
            {id:2, text: 'ccc'}
        ]
    }
})
</script>
```

**注意：组件props命名时需改为驼峰**

```
<div id="box">
    <aa msg="this is msg" img-src="xx.jpg"></aa>
</div>
<script>
    Vue.component('aa', {
        props: ['msg', 'imgSrc'],   // 接收参数，**行间命名改为驼峰**
        template: '<div>{{msg}} <img :src="imgSrc"></div>'
    });

    new Vue({
        el:'#box',
    });
</script>
```

传递实际的值类型时需使用v-bind

<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>

<!-- 传递实际的 number -->
<comp :some-prop="1"></comp>


#### data

> **组件中的data必须是个函数，并且有返回值**

```
<script>
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  data: function () {  //每次调用该组件返回一个全新的data对象
    return {
        counter: 0
    }
  }
})

new Vue({
  el: '#example-2'
})
</script>
```

### 组件API
Vue 组件的 API 来自三部分 - props, events 和 slots ：

- Props 允许外部环境传递数据给组件

- Events 允许从外部环境在组件内触发副作用

- Slots 允许外部环境将额外的内容组合在组件中

### 组件通信
![组件通信](https://cn.vuejs.org/images/props-events.png)

父组件 -> pass/props -> 子组件

子组件 -> emit/events -> 父组件

#### props

```
<div id="app">
    <ol>
        <todo-item v-for="item in items" :todo="item" :key="item.id"></todo-item>
    </ol>
</div>
```
```
<script>
// 将数据从父作用域传到子组件
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
})

var app = new Vue({
    el: '#app',
    data: {
        items: [
            {id:0, text: 'aaa'},
            {id:1, text: 'bbb'},
            {id:2, text: 'ccc'}
        ]
    }
})
</script>
```

##### props是单向绑定 

父组件 -> 子组件
子组件 X  父组件

> 想要修改props的值时可做以下处理，但这种方法仍改变不了父组件的值
如果 props 是一个对象或数组，则为引用类型，在子组件内部改变它会影响父组件的状态。

- 定义为局部变量

```
<script>
    props: ['initialCounter'],
    data: function () {
      return { counter: this.initialCounter }
    }
</script>
```

- 定义为计算属性

```
<script>
    props: ['size'],
    computed: {
      normalizedSize: function () {
        return this.size.trim().toLowerCase()
      }
    }
</script>
```

##### 子组件 -> 父组件
- 使用 $on(eventName) 监听事件

- 使用 $emit(eventName) 触发事件

`v-on:子组件事件="父组件事件"`

```
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
```

```
<script>
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',  // 点击时触发子组件事件
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('increment')  // emit向父组件传递该increment，组件上监听到increment，触发父组件的incrementTotal
    }
  },
})

new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
</script>
```

#### 子组件索引

- ref 为子组件指定一个索引ID

```
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```

```
<script>
var parent = new Vue({ el: '#parent' })

// 访问子组件
var child = parent.$refs.profile
</script>
```

> 当 ref 和 v-for 一起使用时，ref 是一个数组，包含相应的子组件。


##### 双向绑定 prop添加修饰符

- .sync (vue 2.3+)

<comp :foo.sync="bar"></comp>

### 组件嵌套规则

`<ul>，<ol>，<table>，<select>` 限制了能被它包裹的元素


自定义组件 <my-row> 被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的 is 属性。

```
<table>
  <tr is="my-row"></tr>
</table>
```

## SPA  (vue-router库)

```
<div id="box">
    <a v-link="{path: '/reg'}">register</a>
    <a v-link="{path: '/log'}">login</a>
    <router-view></router-view>
</div>
<script>
    var Reg = Vue.extend({
        template: '<div>regsiter</div>'
    });

    var Log = Vue.extend({
        template: '<div>login</div>'
    });

    // 把组件加进路由
    var app = Vue.extend({});
    var Router = new VueRouter();

    Router.map({
        '/reg': {
            component: Reg
        },
        '/log': {
            component: Log
        }
    });

    Router.start(app, '#box');      // 开启路由
</script>
```

## 交互(vue-resource库)

1. get
2. post **注意：post需要设置请求头emulateJSON**
3. jsonp

```
<script>
methods: {
    get: function() {
        this.$http.get('xxx.txt', {a: 1, b: 2}).then(function(res) {    // 成功回调函数
            console.log(res);
            console.log(res.data);
        }, function(res) {      // 失败回调函数
            console.log(res.data);
        })
    }
}

methods: {
    post: function() {
        // post方式需设置请求头emulateJSON
        this.$http.post('xxx.txt', {a: 1, b: 2}, {emulateJSON: true}).then(function(res) {  // 成功回调函数
            console.log(res);
            console.log(res.data);
        }, function(res) {      // 失败回调函数
            console.log(res.data);
        })
    }
}

methods: {
    get: function() {
        this.$http.jsonp('https://xxx?', {wd: 2}, {jsonp: 'cb'}).then(function(res) {   // 成功回调函数
            console.log(res);
            console.log(res.data);
        }, function(res) {      // 失败回调函数
            console.log(res.data);
        })
    }
}

</script>
```

## vue构造器

- el

- data

- methods

- computed 计算属性

- watch

## 实例的生命周期

![vue实例的生命周期](http://cn.vuejs.org/images/lifecycle.png)

- created 实例创建之后被调用


## 响应

Vue.nextTick(callback)  DOM更新完成后调用

## 过渡效果


### 简易动画

- 定义动画

```
<style>
    .动画名称-transition {

    }
    .动画名称-enter {

    }
    .动画名称-leave {

    }
</style>
```

- 使用动画

```
<div transition="动画名称"></div>
```

### 过渡

> v为transition的name

- v-enter: 在元素被插入时生效，在下一个帧移除。

- v-enter-active: 在元素整个过渡过程中作用，在元素被插入时生效，在 transition/animation 完成之后移除。

- v-enter-to: 定义进入过渡的结束状态，在元素被插入一帧后生效（于此同时 v-enter 被删除）。

- v-leave: 在离开过渡被触发时生效，在下一个帧移除。

- v-leave-active: 在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 transition/animation 完成之后移除。 

- v-leave-to: 定义离开过渡的结束状态。在离开过渡被触发一帧后生效（于此同时 v-leave 被删除），在 transition/animation 完成之后移除。


```
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
```

```
<script>
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
</script>
```

![过滤效果](https://cn.vuejs.org/images/transition.png)

### 动画

```
<div id="example-2">
  <button @click="show = !show">Toggle show</button>
  <transition name="bounce">
    <p v-if="show">Look at me!</p>
  </transition>
</div>
```

```
<style>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```

```
<script>
new Vue({
  el: '#example-2',
  data: {
    show: true
  }
})
</script>
```