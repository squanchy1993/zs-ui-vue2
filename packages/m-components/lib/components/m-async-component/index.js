import MAsyncComponent from './src/main.vue';
MAsyncComponent.install = function (Vue) {
  Vue.component(MAsyncComponent.name, MAsyncComponent);
};

export { MAsyncComponent };
