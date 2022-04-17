import Vue from 'vue';
import App from './App.vue';

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// lodash
import _ from 'lodash';
Vue.prototype._ = _;

// 自定义css
import '@zs-ui-vue/shared/lib/src/styles/index.scss';

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App)
}).$mount('#app');
