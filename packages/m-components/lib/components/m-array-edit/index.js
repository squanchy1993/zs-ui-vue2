import MArrayEdit from './src/main';

/* istanbul ignore next */
MArrayEdit.install = function (Vue) {
  Vue.component(MArrayEdit.name, MArrayEdit);
};

export { MArrayEdit };
