# 公共组件库搭建和组件库文档生成环境搭建
Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@sunhailiang 
sunhailiang
/
publish-ui
1
00
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
init publish ui

 master
hailiang.sun committed 23 hours ago 
0 parents commit 22ee76ec26e9880d0cedd60137eff6a7f50ba07b
Showing  with 37,593 additions and 0 deletions.
 1  README.MD 
@@ -0,0 +1 @@
# 公共组件库搭建和组件库文档生成环境搭建
 245  doc/docs/.vuepress/components/DemoBlock.vue 
@@ -0,0 +1,245 @@
<template>
	<div
		class="demo-block"
		:class="[blockClass, { hover: hovering }]"
		@mouseenter="hovering = true"
		@mouseleave="hovering = false"
		ref="demoBlockContainer"
	>
		<div style="padding:24px">
			<slot name="source"></slot>
		</div>
		<div class="meta" ref="meta">
			<div class="description" v-if="$slots.default">
				<slot></slot>
			</div>
			<div class="highlight">
				<slot name="highlight"></slot>
			</div>
		</div>
		<div class="demo-block-control" ref="control" @click="isExpanded = !isExpanded">
			<transition name="arrow-slide">
				<i :class="[iconClass, { hovering: hovering }]"></i>
			</transition>
			<transition name="text-slide">
				<span v-show="hovering">{{ controlText }}</span>
			</transition>
		</div>
	</div>
</template>
<style lang="scss">
.demo-block {
	border: solid 1px dashed;
	border-radius: 3px;
	transition: 0.2s;
	&.hover {
		box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
	}
	code {
		font-family: Menlo, Monaco, Consolas, Courier, monospace;
	}
	.demo-button {
		float: right;
	}
	.source {
		padding: 24px;
	}
	.meta {
		background-color: #fafafa;
		border-top: solid 1px #eaeefb;
		overflow: hidden;
		height: 0;
		transition: height 0.2s;
	}
	.description {
		padding: 20px;
		box-sizing: border-box;
		border: solid 1px #ebebeb;
		border-radius: 3px;
		font-size: 14px;
		line-height: 22px;
		color: #666;
		word-break: break-word;
		margin: 10px;
		background-color: #fff;
	}
	p {
		margin: 0;
		line-height: 26px;
	}
	code {
		color: #5e6d82;
		background-color: #e6effb;
		margin: 0 4px;
		display: inline-block;
		padding: 1px 5px;
		font-size: 12px;
		border-radius: 3px;
		height: 18px;
		line-height: 18px;
	}
}
.highlight {
	pre {
		margin: 0;
		code {
			color: black !important;
		}
	}
	code.hljs {
		margin: 0;
		border: none;
		max-height: none;
		border-radius: 0;
		line-height: 1.8;
		color: black;
		&::before {
			content: none;
		}
	}
}
.demo-block-control {
	border-top: solid 1px #eaeefb;
	height: 44px;
	box-sizing: border-box;
	background-color: #fff;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	text-align: center;
	margin-top: -1px;
	color: #d3dce6;
	cursor: pointer;
	&.is-fixed {
		position: fixed;
		bottom: 0;
		width: 868px;
	}
	i {
		font-size: 16px;
		line-height: 44px;
		transition: 0.3s;
		&.hovering {
			transform: translate(-40px);
		}
	}
	> span {
		position: absolute;
		transform: translate(-30px);
		font-size: 14px;
		line-height: 44px;
		transition: 0.3s;
		display: inline-block;
	}
	&:hover {
		color: #409eff;
		background-color: #f9fafc;
	}
	& .text-slide-enter,
	& .text-slide-leave-active {
		opacity: 0;
		transform: translate(10px);
	}
	.control-button {
		line-height: 26px;
		position: absolute;
		top: 0;
		right: 0;
		font-size: 14px;
		padding-left: 5px;
		padding-right: 25px;
	}
}
</style>
<script type="text/babel">
export default {
	name: 'DemoBlock',
	data() {
		return {
			hovering: false,
			isExpanded: false,
			fixedControl: false,
			scrollParent: null,
			langConfig: {
				'hide-text': '隐藏代码',
				'show-text': '显示代码',
				'button-text': '在线运行',
				'tooltip-text': '前往jsfiddle.net 运行此示例'
			}
		}
	},
	props: {
		jsfiddle: Object,
		default() {
			return {}
		}
	},
	methods: {
		scrollHandler() {
			const { top, bottom, left } = this.$refs.meta.getBoundingClientRect()
			this.fixedControl =
				bottom > document.documentElement.clientHeight && top + 44 <= document.documentElement.clientHeight
		},
		removeScrollHandler() {
			this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler)
		}
	},
	computed: {
		lang() {
			return this.$route.path.split('/')[1]
		},
		blockClass() {
			return `demo-${this.lang} demo-${this.$router.currentRoute.path.split('/').pop()}`
		},
		iconClass() {
			return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
		},
		controlText() {
			return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text']
		},
		codeArea() {
			return this.$refs['demoBlockContainer'].getElementsByClassName('meta')[0]
		},
		codeAreaHeight() {
			if (this.$refs['demoBlockContainer'].getElementsByClassName('description').length > 0) {
				return (
					this.$refs['demoBlockContainer'].getElementsByClassName('description')[0].clientHeight +
					this.$refs['demoBlockContainer'].getElementsByClassName('highlight')[0].clientHeight +
					20
				)
			}
			return this.$refs['demoBlockContainer'].getElementsByClassName('highlight')[0].clientHeight
		}
	},
	watch: {
		isExpanded(val) {
			this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0'
			if (!val) {
				this.fixedControl = false
				this.$refs.control.style.left = '0'
				this.removeScrollHandler()
				return
			}
			setTimeout(() => {
				this.scrollParent = document.querySelector('.page-component__scroll > .el-scrollbar__warp')
				this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler)
				this.scrollHandler()
			}, 200)
		}
	},
	mounted() {
		console.log(this.$refs.demoBlockContainer)
		this.$nextTick(() => {
			console.log(this.$refs['demoBlockContainer'])
			let highlight = this.$refs['demoBlockContainer'].getElementsByClassName('highlight')[0]
			if (this.$refs['demoBlockContainer'].getElementsByClassName('description').lenght === 0) {
				highlight.style.width = '100%'
				highlight.borderRight = 'none'
			}
		})
	},
	beforeDestroy() {
		this.removeScrollHandler()
	}
}
</script>
 3  doc/docs/.vuepress/components/button/test.vue 
@@ -0,0 +1,3 @@
<template>
	<div><okt-btn></okt-btn></div>
</template>
 24  doc/docs/.vuepress/config.js 
@@ -0,0 +1,24 @@
module.exports={
    title:'okr-ui', // 网站标题
    description:'okr公共组件库',  // 网站描述
    dest:'./build', // 设置输出目录
    port:'8088',  // 端口
    themeConfig:{ // 主题配置
        nav:[
            {
                text:'主页',
                link:'/'
            } // 导航条
        ],
        sidebar:{ // 侧边栏配置
            '/components/':[
                {
                    collapsable:true, // 默认折叠
                    children:[
                        'button'
                    ]
                }
            ]
        }
    }
} 
 23  doc/docs/.vuepress/enhanceApp.js 
@@ -0,0 +1,23 @@
import Vue from 'vue'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
import okrUi from 'okr-ui'
// import "okr-ui/dist/okr-ui.css"
Vue.directive("highlight",function(el){
  let blocks=el.querySelectorAll('pre code');
  blocks.forEach(block=>{
      hljs.highlightBlock(block)
  })
})

export default ({
    Vue,
    options,
    router,
    siteData
})=>{
    Vue.use(Element)
    Vue.use(okrUi)
} 
 14  doc/docs/.vuepress/styles/palette.styl 
@@ -0,0 +1,14 @@
$codeBgColor = #fafafa
$accentColor=#3eaf7c
$textColor=#2c3e50
$borderColor=#eaecef
$arrowBgColor=#ccc
$badgeTipColor=#42b983
$badgeWarningColor=darken(#ffe564,35%)
$badgeErrorColor=#da5961
.content pre { 
    margin: 0 !important;
}
.theme-default-content:not(.custom){
    max-width: 1000px !important
}
 8  doc/docs/README.md 
@@ -0,0 +1,8 @@
---
home: true
actionText: 欢迎 →
actionLink: /components/button
features:
- title: 组件库收录原则：
  details: 通用，代码优雅，扩展性强，力争做最好！
---
 144  doc/docs/components/button.md 
@@ -0,0 +1,144 @@
### 基础组件

<demo-block>
:::slot source
<button-test></button-test>
:::
基本用法
:::slot highlight

```html
<el-row>
	<el-button>默认按钮</el-button>
	<el-button type="primary">主要按钮</el-button>
	<el-button type="success">成功按钮</el-button>
	<el-button type="info">信息按钮</el-button>
	<el-button type="warning">警告按钮</el-button>
	<el-button type="danger">危险按钮</el-button>
</el-row>
```

:::
</demo-block>

### 按钮组件

<demo-block>
:::slot source
<button-test></button-test>
:::
基本用法
:::slot highlight

```html
<el-row>
	<el-button>默认按钮</el-button>
	<el-button type="primary">主要按钮</el-button>
	<el-button type="success">成功按钮</el-button>
	<el-button type="info">信息按钮</el-button>
	<el-button type="warning">警告按钮</el-button>
	<el-button type="danger">危险按钮</el-button>
</el-row>
```

:::
</demo-block>

### 按钮组件

<demo-block>
:::slot source
<button-test></button-test>
:::
基本用法
:::slot highlight

```html
<el-row>
	<el-button>默认按钮</el-button>
	<el-button type="primary">主要按钮</el-button>
	<el-button type="success">成功按钮</el-button>
	<el-button type="info">信息按钮</el-button>
	<el-button type="warning">警告按钮</el-button>
	<el-button type="danger">危险按钮</el-button>
</el-row>
```

:::
</demo-block>

### 按钮组件

<demo-block>
:::slot source
<button-test></button-test>
:::
基本用法
:::slot highlight

```html
<el-row>
	<el-button>默认按钮</el-button>
	<el-button type="primary">主要按钮</el-button>
	<el-button type="success">成功按钮</el-button>
	<el-button type="info">信息按钮</el-button>
	<el-button type="warning">警告按钮</el-button>
	<el-button type="danger">危险按钮</el-button>
</el-row>
```

:::
</demo-block>

### 按钮组件

<demo-block>
:::slot source
<button-test></button-test>
:::
基本用法
:::slot highlight

```html
<el-row>
	<el-button>默认按钮</el-button>
	<el-button type="primary">主要按钮</el-button>
	<el-button type="success">成功按钮</el-button>
	<el-button type="info">信息按钮</el-button>
	<el-button type="warning">警告按钮</el-button>
	<el-button type="danger">危险按钮</el-button>
</el-row>
```

:::
</demo-block>

### 按钮组件

<demo-block>
:::slot source
<button-test></button-test>
:::
基本用法
:::slot highlight

```html
<el-row>
	<el-button>默认按钮</el-button>
	<el-button type="primary">主要按钮</el-button>
	<el-button type="success">成功按钮</el-button>
	<el-button type="info">信息按钮</el-button>
	<el-button type="warning">警告按钮</el-button>
	<el-button type="danger">危险按钮</el-button>
</el-row>
```

:::
</demo-block>

## 参数说明

| 参数 |   类型 | 默认值 |
| :--- | -----: | :----: |
| size | Number |   0    |
| type | Number |   0    |
 22,232  doc/package-lock.json 
Large diffs are not rendered by default.

 22  doc/package.json 
@@ -0,0 +1,22 @@
{
  "name": "doc",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "vuepress": "^1.8.2"
  },
  "dependencies": {
    "core-js": "^2.6.12",
    "element-ui": "^2.15.1",
    "highlight.js": "^10.6.0",
    "node-sass": "^5.0.0",
    "sass-loader": "^10.1.1"
  }
}
 3  okr-ui/.browserslistrc 
@@ -0,0 +1,3 @@
> 1%
last 2 versions
not dead
 25  okr-ui/.eslintrc.js 
@@ -0,0 +1,25 @@
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        mocha: true
      }
    }
  ]
};
 23  okr-ui/.gitignore 
@@ -0,0 +1,23 @@
.DS_Store
node_modules
/dist


# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
 528  okr-ui/README.md 
@@ -0,0 +1,528 @@
# okr-ui

# okr 项目组件库，公共资源或者新老项目切换仓库

# 实践记录

## 调整 src 目录结构

```js
|--src
|-- App.vue
|-- main.js
|-- packages // 新建此文件夹用来存放组件
       |-- index.js  // 组件入口
       |-- button.vue  // 新增一个button组件，记得带上name
       |-- icon    // 新增一个icon组件，记得带上name
```

> packages/index.js
```js
// 所有组件的入口
import Button from './button.vue'
import Icon from './icon.vue'
// 全局注册
const install = Vue => {
	Vue.component(Button.name, Button)
	Vue.component(Icon.name, Icon)
}
// 防止使用者直接以<script></script>方式引入
if (typeof window.Vue !== 'undefined') {
	install(Vue) // 直接通过script方式引入组件
}
export default {
	install
}
```

> 测试组件
```js
import okrUi from './packages/index'
Vue.use(okrUi)
```

> app.vue 直接使用
```html
<okr-icon></okr-icon>
<okt-btn></okt-btn>
```

**接下来就简单了,只要在 packages 中新增组件就可以，在 index.js 中注册即可**

## 关于发布

> okr-ui 目录下新建.npmignore
```js
src // 源码不发
public // 公用资源不发
test // 测试代码不发
```

> package.json
```js
  "private": false, // 私有的改成false
  "version": "0.1.0", // 版本必须每次不一样
```

## 测试组件

> https://vue-test-utils.vuejs.org/zh/installation/testing-single-file-components-with-karma.html
> Karma 是一个启动浏览器运行测试并生成报告的测试运行器。 Mocha 框架撰写测试，同时用 chai 作为断言库。
- 安装依赖
  `npm install --save-dev @vue/test-utils karma karma-chrome-launcher karma-mocha karma-sourcemap-loader karma-spec-reporter karma-webpack mocha`
- 安装 chai
  `npm install --save-dev karma-chai`
  > 官方的配置案例
```js
var webpackConfig = require('./webpack.config.js')
module.exports = function(config) {
	config.set({
		frameworks: ['mocha'],
		files: ['test/**/*.spec.js'], // 匹配所有的spec文件
		preprocessors: {
			'**/*.spec.js': ['webpack', 'sourcemap']
		},
		webpack: webpackConfig,
		reporters: ['spec'],
		browsers: ['ChromeHeadless'] // 打开一个无头的浏览器， 单纯用Chrome会闪动
	})
}
```

## 组件打包

> package.json 新增命令
> `"lib":"vue-cli-service build --target lib -name okr-ui ./src/packages/index.js"`
> 添加引用入口 package.json **根**
- 打包后所有的组件都在 umd.min.js 中
  `"main":"./dist/okr-ui.umd.min.js"`

## 生成组件文档

> 使用 vuepress
- 根目录下新建 doc 文件夹
  > 初始化
  > `npm init -y`
  > 安装 vuepress
  > `npm i vuepress -D`
  > 配置 packages.json 新增 script
```js
    "docs:dev":"vuepress dev docs",
    "docs:build":"vuepress build docs"
```

> 安装依赖工具
> `cnpm install element-ui highlight.js node-sass sass-loader --save`
## 配置 vue-press

1. doc 根目录下新建 docs(固定)
2. docs 下新建 README.md(固定)
3. docs 下新建 components 用于存放组件描述文件(固定)
4. components 下新建 button.md(此处以 button 组件为例)
   > README.md(内容格式固定)
```js
---
home: true
actionText: 欢迎 →
actionLink: /components/button  // 以button为例
features:
- title: okr组件库  // 名称
  details: okr组件库，用公共组件存放，新老项目过度组件存放 // 组件库描述
---
```

> button.md
> `## 按钮组件`
> 运行命令
> `npm run docs:dev`
**跑起来的内容是不是很熟悉？？？但是比较丑是不是？**

## 美化组件库文档界面

1. 在 docs 下新建文件夹.vuepress
2. 在.vuepress 中新增配置文件 config.js

```js
module.exports = {
	title: 'okr-ui', // 网站标题
	description: 'okr公共组件库', // 网站描述
	dest: './build', // 设置输出目录
	port: '8088', // 端口
	themeConfig: {
		// 主题配置
		nav: [
			{
				text: '主页',
				link: '/'
			} // 导航条
		],
		sidebar: {
			// 侧边栏配置
			'/components/': [
				{
					collapsable: true, // 默认折叠
					children: ['button']
				}
			]
		}
	}
}
```

3. 在.vuepress 文件里新建 styles 文件夹,并在 styles 中新建文件 palette.styl(固定)

```css
$codeBgColor
	=
	#fafafa
	$accentColor=#3eaf7c
	$textColor=#2c3e50
	$borderColor=#eaecef
	$arrowBgColor=#ccc
	$badgeTipColor=#42b983
	$badgeWarningColor=darken(#ffe564,35%)
	$badgeErrorColor=#da5961
	.content
	pre {
	margin: 0 !important;
}
.theme-default-content:not(.custom) {
	max-width: 1000px !important;
}
```

4. .vuepress 目录下新建 enhanceApp.js(固定)入口定义文件
   > enhanceApp.js
```js
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
import okrUi from 'okr-ui' // 注意，我没有安装这个包怎么来呢？
import 'okr-ui/dist/okr-ui.css' // 如果报错，找不到这个css你就确认你打包生成了没有
Vue.directive('highlight', function(el) {
	let blocks = el.querySelectorAll('pre code')
	blocks.forEach(block => {
		hljs.highlightBlock(block)
	})
})
export default ({ Vue, options, router, siteData }) => {
	Vue.use(Element)
	Vue.use(okrUi)
}
```

- okr-ui 没有安装怎么引用？
  - 去 okr-ui 根目录执行`npm link` 此命令是将该项目链接到全局
  - 然后在 docs 的文件中`npm link okr-ui` 此命令是将全局注册的 okr-ui 拉进来进行使用
  - 经过以上两步就能免发布使用了

### 测试

1. .vuepress 下新建 components，此文件加下皆为全局组件
2. 新建 button 文件夹/button 文件夹/test.vue
3. 在 docs 根目录下的 conponents 的 button.md 进行测试
   > button.md
   > `<button-test></button-test>` **这样就会去.vuepress 组件中找到 button/test.vue 组件（固定写法）**
> 运行命令 npm run docs:dev
- corejs 丢失 npm i core-js@2
- okr-ui 找不到？？？注意你的组件库中 package.json 中 main 属性有没有指定文件？

### 测试真实组件库中的组件

- 还记得刚才在 doc 文档库中已经引入了 okr-ui 了对吧，已经引用了吧？直接测试组件吧
- 比如我们在 okr-ui 中写了 okr-btn 这个按钮组件吧？
  > docs/.vuepress/components/button/test.vue
  > `<okt-btn></okt-btn>` 看页面是不是有了？
```js
<template>
	<div>
		<okt-btn></okt-btn>
	</div>
</template>
```

### 实现类似于 element-ui 组件库的文档体验

> 在 .vuepress 下 components 中新建组件文档展示模板 demo-block.vue
```js
<template>
	<div
		class="demo-block"
		:class="[blockClass, { hover: hovering }]"
		@mouseenter="hovering = true"
		@mouseleave="hovering = false"
		ref="demoBlockContainer"
	>
		<div style="padding:24px">
			<slot name="source"></slot>
		</div>
		<div class="meta" ref="meta">
			<div class="description" v-if="$slots.default">
				<slot></slot>
			</div>
			<div class="highlight">
				<slot name="highlight"></slot>
			</div>
		</div>
		<div class="demo-block-control" ref="control" @click="isExpanded = !isExpanded">
			<transition name="arrow-slide">
				<i :class="[iconClass, { hovering: hovering }]"></i>
			</transition>
			<transition name="text-slide">
				<span v-show="hovering">{{ controlText }}</span>
			</transition>
		</div>
	</div>
</template>
<style lang="scss">
.demo-block {
	border: solid 1px dashed;
	border-radius: 3px;
	transition: 0.2s;
	&.hover {
		box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
	}
	code {
		font-family: Menlo, Monaco, Consolas, Courier, monospace;
	}
	.demo-button {
		float: right;
	}
	.source {
		padding: 24px;
	}
	.meta {
		background-color: #fafafa;
		border-top: solid 1px #eaeefb;
		overflow: hidden;
		height: 0;
		transition: height 0.2s;
	}
	.description {
		padding: 20px;
		box-sizing: border-box;
		border: solid 1px #ebebeb;
		border-radius: 3px;
		font-size: 14px;
		line-height: 22px;
		color: #666;
		word-break: break-word;
		margin: 10px;
		background-color: #fff;
	}
	p {
		margin: 0;
		line-height: 26px;
	}
	::v-deep code {
		color: #5e6d82;
		background-color: #e6effb;
		margin: 0 4px;
		display: inline-block;
		padding: 1px 5px;
		font-size: 12px;
		border-radius: 3px;
		height: 18px;
		line-height: 18px;
	}
}
.highlight {
	pre {
		margin: 0;
		code {
			color: black !important;
		}
	}
	code.hljs {
		margin: 0;
		border: none;
		max-height: none;
		border-radius: 0;
		line-height: 1.8;
		color: black;
		&::before {
			content: none;
		}
	}
}
.demo-block-control {
	border-top: solid 1px #eaeefb;
	height: 44px;
	box-sizing: border-box;
	background-color: #fff;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	text-align: center;
	margin-top: -1px;
	color: #d3dce6;
	cursor: pointer;
	&.is-fixed {
		position: fixed;
		bottom: 0;
		width: 868px;
	}
	i {
		font-size: 16px;
		line-height: 44px;
		transition: 0.3s;
		&.hovering {
			transform: translate(-40px);
		}
	}
	> span {
		position: absolute;
		transform: translate(-30px);
		font-size: 14px;
		line-height: 44px;
		transition: 0.3s;
		display: inline-block;
	}
	&:hover {
		color: #409eff;
		background-color: #f9fafc;
	}
	& .text-slide-enter,
	& .text-slide-leave-active {
		opacity: 0;
		transform: translate(10px);
	}
	.control-button {
		line-height: 26px;
		position: absolute;
		top: 0;
		right: 0;
		font-size: 14px;
		padding-left: 5px;
		padding-right: 25px;
	}
}
</style>
<script type="text/babel">
export default {
	name: 'DemoBlock',
	data() {
		return {
			hovering: false,
			isExpanded: false,
			fixedControl: false,
			scrollParent: null,
			langConfig: {
				'hide-text': '隐藏代码',
				'show-text': '显示代码',
				'button-text': '在线运行',
				'tooltip-text': '前往jsfiddle.net 运行此示例'
			}
		}
	},
	props: {
		jsfiddle: Object,
		default() {
			return {}
		}
	},
	methods: {
		scrollHandler() {
			const { top, bottom, left } = this.$refs.meta.getBoundingClientRect()
			this.fixedControl =
				bottom > document.documentElement.clientHeight && top + 44 <= document.documentElement.clientHeight
		},
		removeScrollHandler() {
			this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler)
		}
	},
	computed: {
		lang() {
			return this.$route.path.split('/')[1]
		},
		blockClass() {
			return `demo-${this.lang} demo-${this.$router.currentRoute.path.split('/').pop()}`
		},
		iconClass() {
			return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
		},
		controlText() {
			return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text']
		},
		codeArea() {
			return this.$refs['demoBlockContainer'].getElementsByClassName('meta')[0]
		},
		codeAreaHeight() {
			if (this.$refs['demoBlockContainer'].getElementsByClassName('description').length > 0) {
				return (
					this.$refs['demoBlockContainer'].getElementsByClassName('description')[0].clientHeight +
					this.$refs['demoBlockContainer'].getElementsByClassName('highlight')[0].clientHeight +
					20
				)
			}
			return this.$refs['demoBlockContainer'].getElementsByClassName('highlight')[0].clientHeight
		}
	},
	watch: {
		isExpanded(val) {
			this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0'
			if (!val) {
				this.fixedControl = false
				this.$refs.control.style.left = '0'
				this.removeScrollHandler()
				return
			}
			setTimeout(() => {
				this.scrollParent = document.querySelector('.page-component__scroll > .el-scrollbar__warp')
				this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler)
				this.scrollHandler()
			}, 200)
		}
	},
	mounted() {
		console.log(this.$refs.demoBlockContainer)
		this.$nextTick(() => {
			console.log(this.$refs['demoBlockContainer'])
			let highlight = this.$refs['demoBlockContainer'].getElementsByClassName('highlight')[0]
			if (this.$refs['demoBlockContainer'].getElementsByClassName('description').lenght === 0) {
				highlight.style.width = '100%'
				highlight.borderRight = 'none'
			}
		})
	},
	beforeDestroy() {
		this.removeScrollHandler()
	}
}
</script>
```

> 在 docs/components 下
> `使用模板/插槽`
> 重新运行代码,是不是体验很棒？？
 3  okr-ui/babel.config.js 
@@ -0,0 +1,3 @@
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"]
};
 17  okr-ui/karma.conf.js 
@@ -0,0 +1,17 @@
var webpackConfig = require("@vue/cli-servise/webpack.config");

module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],

    files: ["test/**/*.spec.js"],

    preprocessors: {
      "**/*.spec.js": ["webpack", "sourcemap"]
    },
    autoWatch: true,
    webpack: webpackConfig,
    reporters: ["spec"],
    browsers: ["ChromeHeadless"] // 打开一个无头的浏览器， 单纯用Chrome会闪动
  });
};
 14,141  okr-ui/package-lock.json 
Large diffs are not rendered by default.

 43  okr-ui/package.json 
@@ -0,0 +1,43 @@
{
  "name": "okr-ui",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test:unit": "vue-cli-service test:unit",
    "lint": "vue-cli-service lint",
    "test": "karma start --single-run",
    "lib": "vue-cli-service build --target lib -name okr-ui ./src/packages/index.js"
  },
  "main": "./dist/okr-ui.umd.min.js",
  "dependencies": {
    "core-js": "^3.6.5",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-unit-mocha": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "@vue/test-utils": "^1.1.3",
    "babel-eslint": "^10.1.0",
    "chai": "^4.1.2",
    "eslint": "^6.7.2",
    "eslint-plugin-prettier": "^3.1.3",
    "eslint-plugin-vue": "^6.2.2",
    "karma": "^6.1.1",
    "karma-chai": "^0.1.0",
    "karma-chrome-launcher": "^3.1.0",
    "karma-mocha": "^2.0.1",
    "karma-sourcemap-loader": "^0.3.8",
    "karma-spec-reporter": "0.0.32",
    "karma-webpack": "^5.0.0",
    "less": "^3.0.4",
    "less-loader": "^5.0.0",
    "mocha": "^8.3.0",
    "prettier": "^1.19.1",
    "vue-template-compiler": "^2.6.11"
  }
}
 BIN +4.19 KB okr-ui/public/favicon.ico 
Binary file not shown.
 17  okr-ui/public/index.html 
@@ -0,0 +1,17 @@
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
 13  okr-ui/src/App.vue 
@@ -0,0 +1,13 @@
<template>
  <div id="app">
    <okr-icon></okr-icon>
    <okt-btn></okt-btn>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>
 8  okr-ui/src/main.js 
@@ -0,0 +1,8 @@
import Vue from "vue";
import App from "./App.vue";
import okrUi from "./packages/index";
Vue.use(okrUi);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount("#app");
 12  okr-ui/src/packages/button.vue 
@@ -0,0 +1,12 @@
<template>
	<div class="button">
		<button>按钮</button>
	</div>
</template>

<script>
export default {
	name: 'okt-btn',
	components: {}
}
</script>
 9  okr-ui/src/packages/icon.vue 
@@ -0,0 +1,9 @@
<template>
  <div class="icon">ICON</div>
</template>
<script>
export default {
  name: "okr-icon",
  components: {}
};
</script>
 20  okr-ui/src/packages/index.js 
@@ -0,0 +1,20 @@
// 所有组件的入口

import Button from "./button.vue";
import Icon from "./icon.vue";

// 全局注册
const install = Vue => {
  Vue.component(Button.name, Button);
  Vue.component(Icon.name, Icon);
};

console.log("???", Button, Icon);
// 防止使用者直接以<script></script>方式引入

if (typeof window.Vue !== "undefined") {
  install(window.Vue); // 直接通过script方式引入组件
}
export default {
  install
};
 0  okr-ui/src/styles/common.less 
Empty file.
 2  okr-ui/tests/unit/button.spec.js 
@@ -0,0 +1,2 @@
import { shallowMount } from "@vue/test-utils"; // vue 提供的用于快速测试的方法
import { expect } from "chai";
 13  okr-ui/tests/unit/example.spec.js 
@@ -0,0 +1,13 @@
import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});
0 comments on commit 22ee76e
@sunhailiang
 
 
Leave a comment
未选择任何文件
Attach files by dragging & dropping, selecting or pasting them.
 You’re receiving notifications because you’re watching this repository.
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
