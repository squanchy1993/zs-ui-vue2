/* eslint-disable */
export class DynamicFieldOption {
  constructor({
    label = null,
    prop = null, // 键名
    elType = 'elementUI', // registered, asyn, render, null
    element = null, // 承载组件
    change = new Function(), // 改变的回调
    isShowItem = true, // 是否展示，value会记录
    isIgnore = false, // 是否忽略，value不计入
    itemBoxStyle = null, // 盒子的style
    itemBoxClass = null, // 盒子自定义class
    disabled = false, // 是否禁用
    defaultValue = null, // 默认值
    width = '100%', // 宽度
    isFormItemChild = true, // 是否添加formItem
    option = {}, // 各个类型输入框的配置项
    id = null,
    validator,
  }) {
    // const requiredRules = [{ required: true, message: label + '不能为空' }];
    this.label = label;
    this.prop = prop;
    this.elType = elType;
    this.element = element;
    this.change = change;
    this.isShowItem = isShowItem;
    // this.required = required;
    this.isIgnore = isIgnore;
    this.itemBoxStyle = itemBoxStyle;
    this.itemBoxClass = itemBoxClass;
    this.disabled = disabled;
    this.defaultValue = defaultValue;
    this.width = width;
    this.isFormItemChild = isFormItemChild;
    this.option = option;
    if (validator) {
      this.validator = validator
    } else {
      this.validator = {
        trigger: 'blur',
        fun: `(rule, value, callback) => {
              callback()
        }`
      }
    }
    this.rules = [
      {
        validator: (rule, value, callback) => {
          try {
            const func = eval(validator.fun)
            func(rule, value, callback)
          } catch (error) {
            console.error('validator fail:', validator)
          }
        },
        trigger: validator?.trigger || 'asdf'
      }
    ]

    this.id = !id ? this._generateUUID() : id;
  }

  _generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    // eslint-disable-next-line space-before-function-paren
    var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
}
