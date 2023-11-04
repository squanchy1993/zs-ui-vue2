import MLayout from './src/main';

/* istanbul ignore next */
MLayout.install = function (Vue) {
  Vue.component(MLayout.name, MLayout);
};

export { MLayout };
