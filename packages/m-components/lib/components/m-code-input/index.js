import MCodeInput from './src/main';

/* istanbul ignore next */
MCodeInput.install = function (Vue) {
  Vue.component(MCodeInput.name, MCodeInput);
};

export { MCodeInput };
