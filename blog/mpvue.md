<!-- MarkdownTOC -->

- 生命周期
    - vue 生命周期
    - 小程序生命周期
- 模版语法
- 常见问题

<!-- /MarkdownTOC -->


![](https://raw.githubusercontent.com/aYangLi/image-folder/master/youdao/small-programs.jpeg)

## 生命周期

小程序onReady后再触发vue mouted

![](http://mpvue.com/assets/lifecycle.jpg)

### vue 生命周期

- beforeCreate

- created

- beforeMount

- mounted

- beforeUpdate

- updated

- activated

- deactivated

- beforeDestroy

- destroyed

### 小程序生命周期

> 除特殊情况外，不建议使用小程序的生命周期钩子。

app 部分：

- onLaunch 初始化

- onShow 当小程序启动或从后台进入前台显示

- onHide 当小程序从前台进入后台

page 部分：

- onLoad 监听页面加载

- onShow 监听页面显示

- onReady 监听页面初次渲染完成

- onHide 监听页面隐藏

- onUnload 监听页面卸载

- onPullDownRefresh 监听用户下拉动作

- onReachBottom 页面上拉触底事件的处理函数

- onShareAppMessage 用户点击右上角分享

- onPageScroll 页面滚动

- onTabItemTap 当前是 tab 页时 点击 tab 时触发 （mpvue 0.0.16 支持）


```
new Vue({
  data: {
    a: 1
  },
  created () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  },
  onShow () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a, '小程序触发的 onshow')
  }
})
// => "a is: 1"
```


> **不要在选项属性或回调上使用箭头函数**，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数是和父级上下文绑定在一起的，this 不会是如你做预期的 Vue 实例，且 this.a 或 this.myMethod 也会是未定义的。

## 模版语法

- 不支持`v-html`

- 不支持过滤器

- 暂不支持在组件上使用 Class 与 Style 绑定

- 列表渲染注意事项

> 嵌套列表渲染，必须指定不同的索引

```
<!-- 在这种嵌套循环的时候， index 和 itemIndex 这种索引是必须指定，且别名不能想同，正确的写法如下 -->
<template>
    <ul v-for="(card, index) in list">
        <li v-for="(item, itemIndex) in card">
            {{item.value}}
        </li>
    </ul>
</template>
```

- 表单控件绑定
  - select 组件用 picker 组件进行代替
  - 表单元素 radio 用 radio-group 组件进行代替


- 组件不支持列表
  - 暂不支持在组件引用时，在组件上定义 click 等原生事件、v-show（可用 v-if 代替）和 class style 等样式属性(例：<card class="class-name"> </card> 样式是不会生效的)，因为编译到 wxml，小程序不会生成节点，建议写在内部顶级元素上。
  - Slot（scoped 暂时还没做支持）
  - 动态组件
  - 异步组件
  - inline-template
  - X-Templates
  - keep-alive
  - transition
  - class
  - style


## 常见问题

1. 获取小程序在 page onLoad 时候传递的 options

`this.$root.$mp.query`

2. 获取小程序在 app onLaunch/onShow 时候传递的 options

`this.$root.$mp.appOptions`

3. 捕获 app 的 onError

```
export default {
   // 只有 app 才会有 onLaunch 的生命周期
   onLaunch () {
       // ...
   },

   // 捕获 app error
   onError (err) {
       console.log(err)
   }
}
```

4. 引入文件的路径问题

`import {post} from '@/utils/requestMethod'`

示例：

![](https://ws3.sinaimg.cn/large/006tNc79ly1fqr0b58c14j31200va7ct.jpg)

5. 引入css文件

```
<!-- 引入外部文件 -->
<!-- 其他文件夹 -->
<style scoped src="@/common/css/common.css"></style>
<!-- 当前文件夹 *必须写./ -->
<style scoped src="./index.css"></style>

// 单独配置每个页面的css
<style scoped>
.search-container{
  height: 558rpx;
  background-image: linear-gradient(0deg, #E73131 0%, #FF7B4F 100%);color:#fff;
}
</style>
```

6. 本地资源无法通过 WXSS 获取

**本地资源非base64图不会显示**
background-image：可以使用网络图片，或者 base64，或者使用<image/>标签


7. ajax封装

- requestMethod.js

```
let serverPath = 'http://super.fanli.com/h5/'

export function post(url,body) {
    return new Promise((resolve,reject) => {
        wx.request({
              url: serverPath + url,    // 拼接完整的url
              data: body,
              method:'GET',
              header: {
                  'content-type': 'application/json'
              },
              success(res) {
                resolve(res)  // 把返回的数据传出去
              },
              fail(ret) {
                reject(ret)   // 把错误信息传出去
              }
            })
    })
}
```

- main.js

```
import {post} from '@/utils/requestMethod'
Vue.prototype.$post = post
```

- index.vue

```
<script>
export default {
  data () {
    return {

    }
  },

  components: {},

  methods: {

    fetchData () {
      let res = this.$post('coupon/ajaxGetItem?',
          {
            p: 1,
          }
      ).then(function(res){
        console.log(res.data.data);
      }, function(json){
        console.log('error');
      })

      // console.log(res)
    }
  },

  created () {
    this.fetchData();
  }
}
</script>
```

































