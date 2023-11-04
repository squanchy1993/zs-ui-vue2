import MFormGenerator from './src/mian';
import MFormController from './src/MFormController'

MFormGenerator.install = function (Vue) {
  Vue.component(MFormGenerator.name, MFormGenerator);
};

export { MFormGenerator, MFormController };