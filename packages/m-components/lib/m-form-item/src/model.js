export default class MFormItemModel {
  prop = '' // 键名
  label = ''// 标签名称
  rules = [] // 输入框的规则
  required = false // 是否必填
  instance = null
  constructor({
    prop = null,
    label = null,
    rules = null,
    required = true
  }) {
    prop && (this.prop = prop);
    label && (this.label = label);

    if (required) {
      this.required = required
      this.rules.push({
        message: `${this.label} 不能为空！`,
        validate: async(value, message) => { if ([undefined, null, ''].includes(value)) { throw new Error(message) } }
      })
    }

    if (rules) {
      this.rules = this.rules.concat(rules)
    }
  }
}