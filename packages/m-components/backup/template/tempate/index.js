import MFormDesigner from './src/mian';

MFormDesigner.install = function (Vue) {
  Vue.component(MFormDesigner.name, MFormDesigner);
};

export { MFormDesigner };
