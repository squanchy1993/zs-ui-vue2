import MDynamicElem from './src/main';
import MDynamicElemFields from './src/mDynamicElemField'

MDynamicElem.install = function (Vue) {
  Vue.component(MDynamicElem.name, MDynamicElem);
};

export { MDynamicElem, MDynamicElemFields };
