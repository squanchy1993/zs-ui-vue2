import MDynamicInput from './src/mian';

MDynamicInput.install = function (Vue) {
  Vue.component(MDynamicInput.name, MDynamicInput);
};

export { MDynamicInput };
