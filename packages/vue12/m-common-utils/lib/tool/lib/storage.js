/*
 * @Author: your name
 * @Date: 2021-03-15 18:47:27
 * @LastEditTime: 2021-03-16 10:39:32
 * @LastEditors: Please set LastEditors
 * @Description: 本地储存的常用方法
 * @FilePath: /robot-web/src/utils/public/lib/storage.js
 */

export default class StorageUtils {
  /**
   * @func
   * @desc  获取sessionStorage里面的数据
   * @param { string } keyName
   * @returns { string }
   */
  static getStorage(keyName) {
    return window.sessionStorage.getItem(keyName)
  }

  /**
   * @func
   * @desc  设置sessionStorage里面的数据
   * @param { string } keyName
   * @param { * } data
   * @returns { string }
   */
  static setStorage(keyName, data) {
    return window.sessionStorage.setItem(keyName, JSON.stringify(data))
  }
  /**
   * @func
   * @desc  清空sessionStorage里面的数据
   * @param { string } keyName
   * @returns { string }
   */
  static removeStorage(keyName) {
    return window.sessionStorage.removeItem(keyName)
  }
}
