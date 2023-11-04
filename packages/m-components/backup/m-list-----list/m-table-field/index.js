import MTableField from './src/main';

MTableField.install = function (Vue) {
  Vue.component(MTableField.name, MTableField);
};

export { MTableField };