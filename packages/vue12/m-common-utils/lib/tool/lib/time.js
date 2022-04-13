/*
 * @Author: your name
 * @Date: 2021-03-15 18:47:27
 * @LastEditTime: 2021-03-19 10:07:05
 * @LastEditors: Please set LastEditors
 * @Description: 日期的处理
 * @FilePath: /robot-web/src/utils/public/lib/time.js
 */

import dayjs from 'dayjs'
export default class TimeUtils {
  /**
   * @func
   * @desc  获取今天开始
   * @returns { String }
   */
  static getTodayStart() {
    const startTime = dayjs().format('YYYY-MM-DD') + ' 00:00:00'
    return startTime
  }

  /**
   * @func
   * @desc  获取今天结束
   * @returns { String }
   */
  static getTodayEnd() {
    const EndTime = dayjs().format('YYYY-MM-DD') + ' 23:59:59'
    return EndTime
  }
}
