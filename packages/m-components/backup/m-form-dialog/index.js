import MFormDialog from './src/mian';

MFormDialog.install = function (Vue) {
  Vue.component(MFormDialog.name, MFormDialog);
};

export { MFormDialog };
