/*
 * @Author: your name
 * @Date: 2022-04-11 13:53:33
 * @LastEditTime: 2022-04-11 18:25:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zs-ui-vue/packages/m-form-dialog/index.js
 */
import MPageList from './src/main';

/* istanbul ignore next */
MPageList.install = function(Vue) {
  Vue.component(MPageList.name, MPageList);
};

export default MPageList;
