/*
 * @Author: your name
 * @Date: 2022-04-11 18:22:06
 * @LastEditTime: 2022-04-17 12:26:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zs-ui-vue2/packages/m-components/m-input-number/index.js
 */
import MForm from './src/main';

/* istanbul ignore next */
MForm.install = function(Vue) {
  Vue.component(MForm.name, MForm);
};

export { MForm };