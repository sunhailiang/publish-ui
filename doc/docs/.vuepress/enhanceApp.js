import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
// 自定义指令
Vue.directive('highlight', function(el) {
	let blocks = el.querySelectorAll('pre code')
	blocks.forEach(block => {
		hljs.highlightBlock(block)
	})
})

export default ({ Vue, options, router, siteData }) => {
	Vue.use(Element)
	Vue.mixin({
		mounted() {
			import('okr-ui')
				.then(function(m) {
					Vue.use(m.default)
				})
				.then(() => {
					import('okr-ui/dist/okr-ui.css') // 组件库样式
				})
		}
	})
}
