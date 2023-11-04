export class FormPresentationOption {
  ref
  option = {}
  element = ''
  constructor({
    ref,
    option,
    element
  }) {
    // 弹框ref
    ref && (this.ref = ref)
    option && (this.option = option)
    element && (this.element = element)
  }
}