/*
 * @Author: your name
 * @Date: 2021-03-16 08:58:22
 * @LastEditTime: 2021-06-14 16:29:39
 * @LastEditors: Please set LastEditors
 * @Description: 模块化导出
 * @FilePath: /robot-web/src/utils/public/index.js
 */

import CommonUtils from './lib/common'
// import NumberUtils from './lib/number'
import StorageUtils from './lib/storage'
// import OtherUtils from './lib/other'
// import TimeUtils from './lib/time'

// export default { Common, NumberUtils }  默认全部导出
export {
  CommonUtils,
  // NumberUtils,
  StorageUtils
  // OtherUtils,
  // TimeUtils
}

