import MList from './src/main';
import ListController from './src/listController'

MList.install = function (Vue) {
  Vue.component(MList.name, MList);
};

export { MList, ListController };