/*
 * @Author: your name
 * @Date: 2022-04-11 18:22:06
 * @LastEditTime: 2022-04-11 18:22:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zs-ui-vue2/packages/m-form/m-input-number/index.js
 */
import MInputNumber from './src/main';

/* istanbul ignore next */
MInputNumber.install = function(Vue) {
  Vue.component(MInputNumber.name, MInputNumber);
};

export default MInputNumber;
