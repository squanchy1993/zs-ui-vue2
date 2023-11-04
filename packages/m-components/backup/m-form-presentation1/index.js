import MFormPresentation from './src/main';
import FormPresentationOption from './src/model';

MFormPresentation.install = function (Vue) {
  Vue.component(MFormPresentation.name, MFormPresentation);
};

export { MFormPresentation, FormPresentationOption };