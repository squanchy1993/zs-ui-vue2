import MListDesigner from './src/mian';

MListDesigner.install = function (Vue) {
  Vue.component(MListDesigner.name, MListDesigner);
};

export { MListDesigner };
