import MDynamicElem from './src/main';

MDynamicElem.install = function (Vue) {
  Vue.component(MDynamicElem.name, MDynamicElem);
};

export { MDynamicElem };
