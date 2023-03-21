import MDynamicItem from './src/main';
import { DynamicItemModel } from './src/model';

/* istanbul ignore next */
MDynamicItem.install = function(Vue) {
  Vue.component(MDynamicItem.name, MDynamicItem);
};

export { MDynamicItem, DynamicItemModel };
