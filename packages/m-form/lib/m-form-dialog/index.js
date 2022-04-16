/*
 * @Author: your name
 * @Date: 2022-04-16 18:00:39
 * @LastEditTime: 2022-04-16 18:04:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zs-ui-vue/packages/m-form/lib/m-form-dialog/index.js
 */
import FormDialog from './src/main';
import { DialogOptionModel } from './src/model'

/* istanbul ignore next */
FormDialog.install = function(Vue) {
  Vue.component(FormDialog.name, FormDialog);
};

export { FormDialog, DialogOptionModel };
