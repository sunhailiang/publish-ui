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