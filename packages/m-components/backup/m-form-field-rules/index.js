import MFormFieldRules from './src/main';

/* istanbul ignore next */
MFormFieldRules.install = function (Vue) {
  Vue.component(MFormFieldRules.name, MFormFieldRules);
};

export { MFormFieldRules };
