export class FormOption {
  option
  showFlags = ['create'] // create edit read  // 控制按钮显示 // 自定义的dynamic field 也可以监听展示
  formData = {}
  MDynamicFields = []
  formOriginData = {}
  flags = []

  // presentation
  presentationOption = {
    option: {
      visible: true
    },
    element: 'el-dialog'
  }

  constructor({
    ref,
    option, // form options
    showFlags,
    MDynamicFields,
    flags,
    formData
    // formOriginData
  }) {
    // 弹框ref
    ref && (this.ref = ref)
    option && (this.option = option)
    showFlags && (this.showFlags = showFlags)
    MDynamicFields && (this.MDynamicFields = MDynamicFields)
    flags && (this.flags = flags)
    // formOriginData && (this.formOriginData = formOriginData)
    formData && (this.formData = formData)
    this.formDataGenerator()
  }

  // 把默认值设置到formData 当中
  async formDataGenerator() {
    for (const dynamicField of this.MDynamicFields) {
      const { prop } = dynamicField
      if (prop) {
        this.formData[prop] = dynamicField.defaultValue
      }
    }
  }
}