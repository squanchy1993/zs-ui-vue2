import MPopupGenerator from './src/mian';
import MPopupController from './src/MPopupController';

MPopupGenerator.install = function (Vue) {
  Vue.component(MPopupGenerator.name, MPopupGenerator);
};

export { MPopupGenerator, MPopupController };
