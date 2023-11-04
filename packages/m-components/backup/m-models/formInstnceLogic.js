export class FormInstanceLogic {
  resolve = null;
  reject = null;
  visible = false;
  tag = null;
  formData = {};
  formDataCache = {}
  formDataDefault = {}

  // 打开
  open({ data, tag }) {
    return new Promise((resolve, reject) => {
      const newDate = this.setFormData(data)
      console.log('newDate>>>', newDate)
      this.formData = JSON.parse(JSON.stringify(newDate))
      this.formDataCache = JSON.parse(JSON.stringify(data))

      // 设置标签
      this.tag = tag
      this.resolve = resolve;
      this.reject = reject;
      this.visible = true;
    });
  }

  // 关闭
  close() {
    this.reject && this.reject('form closed')
    this.reset();
  }

  reset() {
    this.formOption.formComponent.clearValidate()
    this.formData = {}
    this.resolve = null;
    this.reject = null;
    this.visible = false;
  }

  // 有传入值就传入值，没有的话默认
  setFormData(data = {}) {
    const newFormData = {};
    for (const [key, value] of Object.entries(this.formDataDefault)) {
      if (key) {
        newFormData[key] = data[key] || value;
      }
    }
    return newFormData
  }

  setFormDataDefault() {
    const newFormData = {};
    for (const dynamicField of this.formOption.MDynamicFields) {
      const { prop } = dynamicField;
      if (prop) {
        newFormData[prop] = dynamicField.defaultValue;
      }
    }
    return newFormData
  }
}
