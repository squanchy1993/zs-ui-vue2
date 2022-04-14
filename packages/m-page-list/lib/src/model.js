
/* eslint-disable prefer-const */
/*
 * @Author: your name
 * @Date: 2021-03-15 18:47:27
 * @LastEditTime: 2022-03-08 14:24:38
 * @LastEditors: Please set LastEditors
 * @Description: 主要生成列表类
 * @FilePath: /robot-web/src/model/lib/listConstruct/index.js
 */
const _ = require('lodash')
export class MPageListModel {
  constructor({
    // api
    apiFun = null,

    // 筛选的
    query = [],

    // 列表设置
    columns = [],

    // 列表设置
    tableSetting = {},

    // 其他参数
    otherParams = null,

    // 默认筛选
    defaultSearchFormData = {},

    // 列表请求参数名和默认参数
    listSeting = new MListOptions({}),

    list = [],

    // 是否展示分页
    isShowPagination = true,

    // excel导出设置
    exportExcelOptions = new ExportExcelOptions({}),

    // 是否可选
    isSelection = false,

    // 是否自动初始化
    isAutoInit = true

  }) {
    this.apiFun = apiFun

    // 处理 query
    let searchFormData = {}
    query.map(({ prop, defaultValue }) => {
      if (prop) {
        let setValue = ''
        if (defaultValue) {
          setValue = defaultValue
        }
        _.set(searchFormData, prop, setValue)
      }
    })
    this.query = {
      formItems: query,
      searchFormData
    }

    this.columns = columns
    this.tableSetting = tableSetting
    this.otherParams = otherParams
    this.defaultSearchFormData = defaultSearchFormData
    this.listSeting = listSeting
    this.list = list
    this.totalElement = 1
    this.isShowPagination = isShowPagination
    this.exportExcelOptions = exportExcelOptions
    this.isSelection = isSelection
    this.selected = []
    this.isAutoInit = isAutoInit
  }
}

export class MListOptions {
  constructor({
    currentKeyName = 'pageIndex',
    sizeKeyName = 'pageSize',
    defalutCurrent = 1,
    defalutSize = 10
  }) {
    this.keyName = {
      currentKeyName,
      sizeKeyName
    }
    this.defaultValue = {
      current: defalutCurrent,
      size: defalutSize
    }
    this.setValue = {
      current: defalutCurrent,
      size: defalutSize
    }
  }
}

export class ExportExcelOptions {
  constructor({
    headerText = [],
    headerKey = [],
    beforeExportExcel = null
  }) {
    this.headerText = headerText
    this.headerKey = headerKey
    this.beforeExportExcel = beforeExportExcel
  }
}

