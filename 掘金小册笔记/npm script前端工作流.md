<!-- MarkdownTOC -->

- npm script
	- npm init & package.json
	- npm run
		- 示例分析
		- eslint配置过程
	- 多个npm script串行&并行
	- npm script传参
	- npm script注册
	- npm script钩子

<!-- /MarkdownTOC -->


## npm script

### npm init & package.json

- `npm init -f` --force 快速生成package.json

### npm run

- 声明脚本内容

`npm run`实际上是`npm run-script`的缩写

> 当我们运行 npm run xxx 时，**基本步骤**如下：
1. 从 package.json 文件中读取 scripts 对象里面的全部配置；
2. 以传给 npm run 的第一个参数作为键，本例中为 xxx，在 scripts对象里面获取对应的值作为接下来要执行的命令，如果没找到直接报错；
3. 在系统默认的 shell 中执行上述命令，系统默认 shell 通常是 bash，windows 环境下可能略有不同。

#### 示例分析

```
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"eslint": ""eslint **.js""
}
```

- `npm run test` -> `Error: no test specified`

- `npm run eslint`
> npm 在执行指定 script 之前会把 `node_modules/.bin` 加到环境变量 $PATH 的前面，这意味着任何内含可执行文件的 npm 依赖都可以在 npm script 中直接调用，换句话说，你不需要在 npm script 中加上可执行文件的完整路径。比如 ./node_modules/.bin/eslint **.js。


- 内置命令

`npm run test` -> `npm test` or `npm t`

#### eslint配置过程

- `npm i eslint -D` 添加eslint依赖

- `./node_modules/.bin/eslint --init` 初始化eslint配置

- 配置后会在根目录下生成`.eslintrc.js`配置文件

- 在package.json的scripts字段中新增命令

- 运行命令

### 多个npm script串行&并行

```
{
	"scripts": {
		"lint:js": "eslint *.js",
		"lint:css": "stylelint *.less",
		"lint:json": "jsonlint --quiet *.json",
		"lint:markdown": "markdownlint --config .markdownlint.json *.md",
		"testbefore": "mocha tests/"
		"test": "npm run lint:js && npm run lint:css && npm run lint:json && npm run lint:markdown && mocha tests/" // 串行
		"test": "npm run lint:js & npm run lint:css & npm run lint:json & npm run lint:markdown & mocha tests/" // 并行
		"test": "npm run lint:js & npm run lint:css & npm run lint:json & npm run lint:markdown & mocha tests/ & wait" // 解决并行时效问题
	}
}
```


或

install `npm-run-all`

```
{
	"scripts": {
		"lint:js": "eslint *.js",
		"lint:css": "stylelint *.less",
		"lint:json": "jsonlint --quiet *.json",
		"lint:markdown": "markdownlint --config .markdownlint.json *.md",
		"testbefore": "mocha tests/"
		"test": "npm run lint:js && npm run lint:css && npm run lint:json && npm run lint:markdown && mocha tests/" // 串行
		"test": "npm run lint:js & npm run lint:css & npm run lint:json & npm run lint:markdown & mocha tests/" // 并行
		"test": "npm run lint:js & npm run lint:css & npm run lint:json & npm run lint:markdown & mocha tests/ & wait" // 解决并行时效问题
		"test": "npm-run-all lint:* mocha" // npm-run-all
		"test": "npm-run-all --parallel lint:* mocha" // npm-run-all 并行
	}
}
```

### npm script传参

`--fix` 传参

```
{
	"scripts": {
		"lint:js:fix": "eslint *.js --fix",
	}
}
```

### npm script注册

- 方法一

`//` package.json中增加`//`为键的值，注释写在对应的值里，npm会忽略这种键。

```
{
	"scripts": {
		"//": "给下面的test命令进行注释：运行所有代码检查和单元测试",
		"test": "npm-run-all --parallel lint:* mocha"
	}
}
```

- 方法二

利用shell命令的性质在命令前增加注释

`\n`换行符用于将注释和命令分隔开

```
{
	"scripts": {
		"test": "# 运行所有代码检查和单元测试 \n    npm-run-all --parallel lint:* mocha"
	}
}
```

### npm script钩子

钩子： `pre` 、`post`

`npm run test`的三个周期：
1. 检查 scripts 对象中是否存在 `pretest` 命令，如果有，先执行该命令；
2. 检查是否有 `test` 命令，有的话运行 test 命令，没有的话报错；
3. 检查是否存在 `posttest` 命令，如果有，执行 posttest 命令；

```
     "//": "增加简单的 lint 命令，并行运行所有的 lint 子命令",
+    "lint": "npm-run-all --parallel lint:*",
     "lint:js": "eslint *.js",
     "lint:js:fix": "npm run lint:js -- --fix",
     "lint:css": "stylelint *.less",
     "lint:json": "jsonlint --quiet *.json",
     "lint:markdown": "markdownlint --config .markdownlint.json *.md",
-    "mocha": "mocha tests/",
-    "test": "# 运行所有代码检查和单元测试 \n    npm-run-all --parallel lint:* mocha"
+    "pretest": "npm run lint",
+    "test": "mocha tests/",
```





