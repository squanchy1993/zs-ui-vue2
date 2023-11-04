import MButtonOperator from './src/main';

MButtonOperator.install = function (Vue) {
  Vue.component(MButtonOperator.name, MButtonOperator);
};

export { MButtonOperator };