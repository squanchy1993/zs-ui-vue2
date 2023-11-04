import MTableGenerator from './src/main';

MTableGenerator.install = function (Vue) {
  Vue.component(MTableGenerator.name, MTableGenerator);
};

export { MTableGenerator };