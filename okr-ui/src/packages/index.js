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
