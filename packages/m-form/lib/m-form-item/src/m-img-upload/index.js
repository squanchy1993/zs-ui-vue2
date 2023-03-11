
/*
 * @Author: your name
 * @Date: 2022-04-11 18:19:55
 * @LastEditTime: 2022-04-11 18:19:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zs-ui-vue/packages/m-form/m-img-upload/index.js
 */
import MImgUpload from './src/main'

/* istanbul ignore next */
MImgUpload.install = function(Vue) {
  Vue.component(MImgUpload.name, MImgUpload)
}

export default MImgUpload
