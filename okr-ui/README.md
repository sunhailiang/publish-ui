# 使用方法

1. 安装 nrm 源控制工具
   `npm i nrm -g`
2. 添加源指向我们自己服务器
   `nrm add [名称] http://192.168.1.112/`
3. 查看可用的源
   `nrm ls`
4. 切换我们源
   `nrm use [名称]`
5. 安装组件库
   `npm install okr-ui`
6. 引入组件

```js
import okrUi from 'okr-ui'
import 'okr-ui/dist/okr-ui.css'
Vue.use(okrUi)
```
