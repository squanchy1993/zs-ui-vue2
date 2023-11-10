import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index';

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// indexeDb
import setupIndexedDb from './db/index';
Vue.config.productionTip = false;

// element-ui
Vue.use(ElementUI);

// lodash
import _ from 'lodash';
Vue.prototype._ = _;

// db
setupIndexedDb(Vue);

// set path;
Vue.prototype.$importSrc = async (url) => import('@/' + url);
Vue.prototype.$mComponent = (url) => import('@m-components/' + url);

const instance = new Vue({
  render: (h) => h(App),
  router
}).$mount('#app');

window['Vue'] = instance;
