import Vue from 'vue'
import App from './App.vue'

// ------------------ longPress------------------
import directive from '@lib/index';
Vue.directive('longPress', new directive.LongPress({}))
// or
// import { LongPress } from '@lib/index';
// Vue.directive('longPress', new LongPress({}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
