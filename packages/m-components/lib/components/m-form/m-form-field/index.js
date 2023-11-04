import MFormField from './src/main';
import MFormFieldModel from './src/formFieldOption';

MFormField.install = function (Vue) {
  Vue.component(MFormField.name, MFormField);
};

export { MFormFieldModel, MFormField };