import MSelect from './src/main';

/* istanbul ignore next */
MSelect.install = function (Vue) {
  Vue.component(MSelect.name, MSelect);
};

export { MSelect };
