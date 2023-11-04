export default class MFormItemModel {
  instance = null // 实例
  prop = '' // 键名
  label = ''// 标签名称
  rules = [] // 输入框的规则
  required = false // 是否必填
  tipsMsg = null
  disabled = false
  constructor({
    prop = null,
    label = null,
    rules = null,
    required = true,
    tipsMsg = null,
    disabled = null
  }) {
    prop && (this.prop = prop);
    label && (this.label = label);

    if (required) {
      this.required = required
      this.rules.push({
        validate: async({ value }) => {
          if ([undefined, null, ''].includes(value)) {
            throw new Error(`${this.label} is required`)
          } else {
            return true
          }
        }
      })
    }

    if (rules) {
      this.rules = this.rules.concat(rules)
      console.log('this.rules', this.rules)
    }

    tipsMsg && (this.tipsMsg = tipsMsg);

    disabled != null && (this.disabled = disabled)
  }
}