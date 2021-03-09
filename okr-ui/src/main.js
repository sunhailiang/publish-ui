import Vue from "vue";
import App from "./App.vue";
import okrUi from "./packages/index";
Vue.use(okrUi);
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount("#app");
