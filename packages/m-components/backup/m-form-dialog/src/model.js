/*
 * @Author: your name
 * @Date: 2022-04-16 18:01:44
 * @LastEditTime: 2022-04-17 17:19:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/m-form-dialog/src/model.js
 */
/* eslint-disable */

// const _ = require("lodash")

export class DialogOptionModel {
  constructor({
    dialogAtter = {},
    generateFormItems = () => ({ originFormItems: [], originFormData: {}}),
    createInterceptor = (formOriginData, formData, extraData) => {},
    editInterceptor = (formOriginData, formData, extraData) => {},
    authInterceptor = (formOriginData, formData, extraData) => {},
    submitSuccess = () => {}
  }) {
    // 弹框ref
    this.ref = _.uniqueId('form_')

    // 生成表单
    this.generateFormItems = generateFormItems

    // 生成api
    this.createInterceptor = createInterceptor
    this.editInterceptor = editInterceptor
    this.authInterceptor = authInterceptor

    // 提交结束
    this.submitSuccess = submitSuccess

    // 弹框设置
    let defaultDialogAtter = {
      title: '',
      'destroy-on-close': true,
      'modal-append-to-body': false,
      'close-on-click-modal': false
    }
    this.dialogAtter = _.defaults({}, dialogAtter, defaultDialogAtter)
    console.log(this.dialogAtter)
  }
}