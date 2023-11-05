import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index'

Vue.config.productionTip = false;

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// lodash
import _ from 'lodash';
Vue.prototype._ = _;

// db
import IndexedDB from './db/indexedDB';
IndexedDB.initialize('local_test', '1', [
  { name: 'configs', keyPath: 'id', indexs: ['id'] },
  { name: 'users', keyPath: 'id', indexs: ['id'] }
]);

const instance = new Vue({
  render: (h) => h(App),
  router
}).$mount('#app');

Vue.prototype.$indexedDB = IndexedDB;
window['Vue'] = instance;

Vue.prototype.$importSrc = async (url) => import('@/' + url);
Vue.prototype.$mComponent = (url) => import('@m-components/' + url);
