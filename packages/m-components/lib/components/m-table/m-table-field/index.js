import MTableField from './src/main';
import MTableFieldModel from './src/mtableFieldOption'

MTableField.install = function (Vue) {
  Vue.component(MTableField.name, MTableField);
};

export { MTableField, MTableFieldModel };