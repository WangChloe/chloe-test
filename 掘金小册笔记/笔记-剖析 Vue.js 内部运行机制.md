
<!-- MarkdownTOC -->

- 内部流程图
	- 初始化及挂载
	- 编译
	- 响应式
		- Virtual DOM
		- getter过程
		- setter过程
		- Object.defineProperty

<!-- /MarkdownTOC -->


- vue-src源码结构图

![](https://ws4.sinaimg.cn/large/006tNc79gy1fz64k0y13vj305e0nwwfi.jpg)

## 内部流程图

![](https://ws3.sinaimg.cn/large/006tNc79gy1fz6457wrj7j30rs0k3dhb.jpg)


### 初始化及挂载

源码path: `vue-dev/src/core/instance`

![](https://ws1.sinaimg.cn/large/006tNc79gy1fz64dl0lykj30ix074q3r.jpg)

**new Vue() 源码path**: `vue-dev/src/core/instance/index.js`

`new Vue()` -> `_init()`(生命周期、事件、props、methods、data、computed、watch...) -> `$mount挂载组建` 

``` javascript
initMixin(Vue)
stateMixin(Vue) // 状态相关的api：$data、$props、$set、$delete、$watch等
eventsMixin(Vue) // 事件相关的api：$on、$off、$once、$emit
lifecycleMixin(Vue) // 生命周期相关的函数：updated、forceUpdate、destory
renderMixin(Vue) // 暴露$nextTick 声明render
```

**_init 源码path**: `vue-dev/src/core/instance/init.js`

``` javascript
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++
    //...
    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      //...
    } else {
     //...
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)  // config.keyCodes检测
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
    //...
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```


### 编译
源码path: `vue-dev/src/compiler`

![](https://ws3.sinaimg.cn/large/006tNc79gy1fz655q50arj30h90bowfz.jpg)

`parse` 解析：template -> AST
`optimize` 优化：diff算法跳过静态节点，优化patch性能
`generate` 生成：AST -> render function


=> 构建渲染`vNode`所需的`render function`

### 响应式
源码path: `vue-dev/src/core/vdom`
源码path: `vue-dev/src/core/observer/index.js`

![](https://ws2.sinaimg.cn/large/006tNc79gy1fz65imp3zfj30ib0a7mzf.jpg)

#### Virtual DOM
`render function` -> `virtual DOM` -> `真实DOM`

``` json
{
    tag: 'div',                 /*说明这是一个div标签*/
    children: [                 /*存放该标签的子节点*/
        {
            tag: 'a',           /*说明这是一个a标签*/
            text: 'click me'    /*标签的内容*/
        }
    ]
}
```

- 渲染后

``` html
<div>
    <a>click me</a>
</div>
```

#### getter过程
- `render function`被渲染时读取所需对象的值
- 触发`getter`函数进行`【依赖收集】`
  - 依赖收集：将观察者`Watcher`对象存放到当前订阅者`Dep`的`subs`中

![](https://ws2.sinaimg.cn/large/006tNc79gy1fze8zvd4hyj30eo07raap.jpg)

#### setter过程
- 修改对象的值
- 触发`setter`
- `setter`通知`【依赖收集】`的`Dep`的每一个`Watcher`更新渲染视图
- `Watcher`调用`update`更新视图
  - `patch`、使用队列异步更新
  - `render function` 执行后生成新的`vNode`，新旧`vNode`节点传入`patch`比较，经过`diff`算法得出差异，将差异修改进对应DOM

#### Object.defineProperty

`Object.defineProperty(obj, prop, descriptor)`

descriptor的部分属性：
- enumerable，属性是否可枚举，默认 false。
- configurable，属性是否可以被修改或者删除，默认 false。
- get，获取属性的方法。
- set，设置属性的方法。

