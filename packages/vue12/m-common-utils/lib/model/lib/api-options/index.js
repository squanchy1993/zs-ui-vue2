/*
 * @Author: your name
 * @Date: 2021-03-15 15:18:54
 * @LastEditTime: 2021-05-26 13:17:06
 * @LastEditors: Please set LastEditors
 * @Description: 设置http请求的配置项
 * @FilePath: /robot-web/src/model/lib/apiOptionSet/index.js
 */

export default class ApiSetOptions {
  constructor({
    isShowLoading = true
  }) {
    this.isShowLoading = isShowLoading
  }
}
