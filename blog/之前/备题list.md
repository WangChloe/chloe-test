<!-- MarkdownTOC -->

- 1. vue和react的虚拟DOM有什么区别
	- 虚拟DOM
	- Vue虚拟DOM
	- React虚拟DOM
	- Vue & React

<!-- /MarkdownTOC -->


[2017我遇到的前端面试题](https://blog.dunizb.com/2017/09/08/interview-questions-2017/)

## 1. vue和react的虚拟DOM有什么区别

### 虚拟DOM

Virtual Dom 即根据最终状态在内存中绘制出一棵 Virtual Dom Tree，使用 Diff 算法与现存的 Dom Tree 对比并更新。

使用js来实现一个DOM结构，DOM变化通过使用Diff算法比较js对象（内存中），找出不一样的地方，然后更新，只更新发生变化的，提高了重绘性能。

因为DOM的操作时耗性能的，而JS运行效率更好，所以两者都选择了使用vdom。

>Virtual Dom 并不能提升性能, 直接操作 Dom 理论上是最快的。

借鉴虚拟DOM库[snabbdom](https://github.com/snabbdom/snabbdom)，创建虚拟DOM。

[关于 Virtual Dom 的简单了解（snabbdom，Vue， React）](https://blog.csdn.net/u012062760/article/details/79965219)

- vnode

```
/**
sel [string]: 选择器, 比如 'div#id.class1.class2'
data [any]: 该节点属性(包括style、class等)
children (Array[]Vnode): 子节点(也由此函数创建)
text [string]: 节点内部的 text
ele [HTMLElement]: Dom 元素
**/
function vnode(sel, data, children, text, elm) (
  // 是否包含key，在list中元素变动时有些许性能影响
  let key = data === undefined ? undefined : data.key;
  return {sel: sel, data: data, children: children,
          text: text, elm: elm, key: key};
}
```

- h函数

`var vnode= h('div#div1',{},[h('span',{},'Hello'),h('span',{},'world')])`
h函数接收三个参数：标签，属性，标签包含的children复制代码

```
/**
sel: 元素选择器
b: 如果是数组或包含sel属性的object, 则为子节点; 如果是string, 则是文本节点; 否则就是data
c: 如果存在, 就肯定是子节点，同时b是data（类型判断早于b）
**/
function h(sel, b, c) {
  var data = {}, children, text, i;
  if (c !== undefined) {
    // ...
  } else if (b !== undefined) {
    // ...
  }

  if (is.array(children)) {
    for (i = 0; i < children.length; ++i) {
        // 如果该元素是字符串或数字, 那么就是个纯文本节点
        if (is.primitive(children[i]))
            children[i] = vnode(undefined, undefined, undefined, children[i], undefined);
    }
  }

  return vnode(sel, data, children, text, undefined);
}
```

- 创建dom树

```
var data = [
  {id: 65, content: 'A'},
  {id: 66, content: 'B'},
  {id: 67, content: 'C'},
];

var tree = h('ul', data.map(node => {
  return h('li', {key: node.id}, node.content)
}))

// 得到的虚拟dom结构如下：
// <ul>
//   <li>A</li>
//   <li>B</li>
//   <li>C</li>
// </ul>
```

- virtual dom -> real dom

```
// oldVNode： 可以是 HTMLElement(第一次调用) 也可以是上一次生成的虚拟Dom tree
// Vnode： 根据最新状态形成的虚拟Dom Tree
function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
	let i: number, elm: Node, parent: Node;

	// 用于生命周期 inserted 阶段，记录下所有新插入的节点以备调用
	const insertedVnodeQueue: VNodeQueue = [];

	// 整个 Diff 过程模块可注册的钩子（跳过） 
	for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

	if (!isVnode(oldVnode)) {
	  // 将 HTMLElement 转换成 VNode
	  oldVnode = emptyNodeAt(oldVnode);
	}

	// 如果两个节点相似（节点的 sel 与 key 完全相等）则更新
	if (sameVnode(oldVnode, vnode)) {
	  patchVnode(oldVnode, vnode, insertedVnodeQueue);
	} else { // 否则直接替换
	  elm = oldVnode.elm as Node;
	  parent = api.parentNode(elm);

	  createElm(vnode, insertedVnodeQueue);

	  if (parent !== null) {
	    // 取代 oldNode 的位置
	    api.insertBefore(parent, vnode.elm as Node, api.nextSibling(elm));
	    removeVnodes(parent, [oldVnode], 0, 0);
	  }
	}

	// 整个 Diff 过程所有节点可注册的节点插入后调用的钩子（跳过）
	for (i = 0; i < insertedVnodeQueue.length; ++i) {
	  (((insertedVnodeQueue[i].data as VNodeData).hook as Hooks).insert as any)(insertedVnodeQueue[i]);
	}
	// 整个 Diff 过程模块可注册的钩子（跳过）
	for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
	return vnode;
};

```


Diff实现过程

`patch(container,vnode)   patch(vnode,newVnode)`

- 首次渲染的时候使用前一个path进行render（createElement）
- data属性发生变化时使用后一个path进行rerender（updateChildren）

### Vue虚拟DOM

Vue里面初始化时定义在data里面的属性会被重新定义（代理）到vm对象上，使用Object.defineProperty，所以我们才可以使用this(指向vm）访问定义在data里面的属性。首次渲染以后显示页面，并且这里会绑定依赖，为啥是这里才绑定呢？因为只针对在页面上显示的属性（get时）进行set监听，如果没有使用过，那么也就没必要监听set了，数据发生变化时，set里面会调用updateComponent方法,里面调用vm._update方法，重新执行vm._render方法，里面执行`patch(prevVnode,newVnode)`提高性能。


### React虚拟DOM

首次渲染ReactDOM.render时，会触发`patch（container，vnode`。
其次就是在调用setState时会触发`patch（vnode，newVnode）`。注意下setState是**异步**的
每个React组件都有一个renderComponent方法，setState会执行该方法重新渲染render，render函数会返回新的newVnode，然后跟prevVNode比较（Diff）执行对应的`patch（prevVNode，newVnode）`.

### Vue & React

||Vue|React|
|:--:|:--:|:--:|
|概念|mvvm框架|前端组件化框架|
|使用形式|模板|JSX|
|组件化|通过单文件组件，扩展方法的方式实现组件化|本身就是组件化的|