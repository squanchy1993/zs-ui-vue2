export class MFormItemModel {
    constructor({
      label = '',
      prop = '', // 键名
      defaultValue = null, //  键值
      el_type = 'MInput', // 表单输入框类型
      options = {}, // 各个类型输入框的配置项
      change = new Function(), // 改变的回调
      rules = [], // 输入框的规则
      isShowItem = true, // 是否展示，value会记录
      required = true, // 是否必填
      isIgnore = false, // 是否忽略，value不计入
      itemBoxStyle = null, // 盒子的style
      itemBoxClass = null, // 盒子自定义class
      render = null, // 进行render的函数
      disabled = false
    }) {
      const requiredRules = [{ required: true, message: label + '不能为空' }]
      this.label = label
      this.prop = prop
      this.defaultValue = defaultValue
      this.el_type = el_type
      this.options = options
      this.change = change
      this.rules = !required ? rules : rules.concat(requiredRules)
      this.isShowItem = isShowItem
      this.required = required
      this.isIgnore = isIgnore
      this.itemBoxStyle = itemBoxStyle
      this.itemBoxClass = itemBoxClass
      this.render = render
      this.disabled = disabled
    }
  }