import MFormPopover from './src/mian.vue';

/* istanbul ignore next */
MFormPopover.install = function (Vue) {
  Vue.component(MFormPopover.name, MFormPopover);
};

export { MFormPopover };
