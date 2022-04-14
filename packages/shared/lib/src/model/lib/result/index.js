/*
 * @Author: your name
 * @Date: 2021-03-15 15:18:54
 * @LastEditTime: 2021-03-16 10:31:41
 * @LastEditors: Please set LastEditors
 * @Description: 生成固定格式的返回数据
 * @FilePath: /robot-web/src/model/lib/responseConstruct/index.js
 */
export default class ResultModel {
  constructor({ success, message, data = null, code = null }) {
    this.success = success
    this.message = message
    this.data = data
    this.code = code
  }
}
