/*
 * @Author: your name
 * @Date: 2022-04-11 14:01:43
 * @LastEditTime: 2022-04-11 18:18:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zs-ui-vue2/packages/m-components/m-form-item/index.js
 */
import MInput from './src/main';

/* istanbul ignore next */
MInput.install = function(Vue) {
  Vue.component(MInput.name, MInput);
};

export { MInput };
