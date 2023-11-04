import MPopup from './src/mian';
import MPopupController from './src/MPopupController';

MPopup.install = function (Vue) {
  Vue.component(MPopup.name, MPopup);
};

export { MPopup, MPopupController };
