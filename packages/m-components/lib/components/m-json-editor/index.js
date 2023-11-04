import MJsonEditor from './src/mian';

MJsonEditor.install = function (Vue) {
  Vue.component(MJsonEditor.name, MJsonEditor);
};

export { MJsonEditor };
