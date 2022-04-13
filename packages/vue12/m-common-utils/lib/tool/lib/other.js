/**
 * @Author: your name
 * @Date: 2021-03-15 18:47:27
 * @LastEditTime: 2021-03-16 10:22:43
 * @LastEditors: Please set LastEditors
 * @Description: 其他公用方法
 * @FilePath: /robot-web/src/utils/public/lib/other.js
 */

export default class OtherUtils {
  /**
     * @func
     * @desc  获取页面元素的的大小
     * @param { * } that - 指针当前页面
     * @param { Function } callBack - 监听对象变化的回调方法
     * @param { string } name - 监听对象的名字
     */
  static getElementSize(that, callBack, name = 'bodybox') {
    var elementResizeDetectorMaker = require('element-resize-detector')
    var erd = elementResizeDetectorMaker()
    erd.listenTo(document.getElementById(name), function(element) {
      var width = element.offsetWidth
      var height = element.offsetHeight
      that.$nextTick(function() {
        callBack({
          'width': width,
          'height': height
        })
        // console.log('Size: ' + width + 'x' + height)
        // // 使echarts尺寸重置
        // that.$echarts.init(document.getElementById('eChart')).resize()
      })
    })
  }
  /**
     * @func
     * @desc  获取唯一id
     * @returns { number }
     */
  static getId() {
    return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36)
  }
}
