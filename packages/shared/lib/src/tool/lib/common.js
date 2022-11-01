/*
 * @Author: your name
 * @Date: 2021-03-15 15:18:54
 * @LastEditTime: 2022-02-03 12:55:38
 * @LastEditors: Please set LastEditors
 * @Description: 常用数据处理
 * @FilePath: /robot-web/src/utils/public/lib/common.js
 */

export default class CommonUtils {
  /**
   * @func
   * @desc  判断是否为空
   * @param { * } val - 参数val一般数据类型
   * @returns {boolean}
   */
  static isEmpty(val) {
    // null
    if (val === null) return true

    // undefined
    if (val === undefined) return true

    if (typeof val === 'boolean') return false

    if (typeof val === 'number') return false

    switch (Object.prototype.toString.call(val)) {
      // String or Array
      case '[object String]':
      case '[object Array]':
        return !val.length

      // Map or Set or File
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return !val.size
      }
      // Plain Object
      case '[object Object]': {
        return !Object.keys(val).length
      }
    }

    return false
  }

  /**
   * @func
   * @todo  这个函数需要优化
   * @desc  图片字符串数组转src
   * @param { String } strArr - 参数strArr 图片字符串
   * @param { String } imageDomain - 参数imageDomain图片的域名
   * @returns {boolean}
   */
  static imageTokenToSrc(strArr, imageDomain) {
    const imageArr = []
    if (this.isEmpty(strArr)) {
      return imageArr
    }
    strArr.split(',').forEach(item => {
      imageArr.push(`${imageDomain}/${item}`)
    })
    return imageArr
  }

  /**
   * @func
   * @desc  图片字符串数组转src
   * @param { String } strArr - 参数strArr 图片字符串
   * @param { String } imageDomain - 参数imageDomain图片的域名
   * @returns {boolean}
   */
  static imageTokenToUploadArr({ strArr, imageDomain, otherDataSet }) {
    const imageArr = []
    const domain = imageDomain ? `${imageDomain}` : ''
    if (this.isEmpty(strArr)) {
      return imageArr
    }
    strArr.split(',').forEach(item => {
      const arrItem = {
        token: item,
        url: domain + item,
        uid: item
      }

      if (otherDataSet) {
        arrItem['otherData'] = otherDataSet(item)
      }
      imageArr.push(arrItem)
    })
    return imageArr
  }

  /**
   * @func
   * @desc  图片数组转字符串
   * @param { Array } imageUploadArr - 参数strArr 图片上传数组
   * @returns {boolean}
   */
  static imageUploadArrToStr({ imageUploadArr, imageDomain = '' }) {
    let imageArr = ''
    if (this.isEmpty(imageUploadArr)) {
      return imageArr
    }
    imageArr = imageUploadArr.map(item => {
      return imageDomain + item.token
    }).join(',')
    return imageArr
  }

  /**
   * @func
   * @desc  获取16位颜色
   * @returns { String }
   */
  static randomColor() {
    var str = '#'
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    for (var i = 0; i < 6; i++) {
      var num = parseInt(Math.random() * 16)
      str += arr[num]
    }
    return str
  }

  static getValueByObjPath(obj, path) {
    const paths = path.split('.')
    let res = obj
    let tempPath
    // 此处本来可以写成 while (tempPath = paths.shift()) ，但是eslint 报错：不能在判断的地方赋值
    // eslint-disable-next-line no-cond-assign
    while (tempPath = paths.shift()) {
      res = res[tempPath]
    }
    return res
  }

  static setDeepValue(obj, path, value) {
    if (path.indexOf('.') === -1) {
      obj[path] = value
      return
    }

    var dotIndex = path.indexOf('.')
    const newPath = path.substr(0, dotIndex)
    !obj[newPath] && (obj[newPath] = {})
    obj = obj[newPath]
    return this.setDeepValue(obj, path.substr(dotIndex + 1), value)
  }
}
