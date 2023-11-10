/* istanbul ignore next */
import MDesign from './src/main.vue'
MDesign.install = function (Vue) {
  Vue.component(MDesign.name, MDesign);
};

export { MDesign };