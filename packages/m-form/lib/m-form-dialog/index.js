/*
 * @Author: your name
 * @Date: 2022-04-16 18:00:3
 * @LastEditTime: 2022-04-27 11:29:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zs-ui-vue/packages/m-form/lib/m-form-dialog/index.js
 */
import MFormDialog from './src/mian';
import { DialogOptionModel } from './src/model'

MFormDialog.install = function(Vue) {
  Vue.component(MFormDialog.name, MFormDialog);
};

export { MFormDialog, DialogOptionModel };
