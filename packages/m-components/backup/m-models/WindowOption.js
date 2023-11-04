export class WindowOption {
  ref = `Window_${Date.parse(new Date())}`;
  formComponent = null;

  option = { title: 'el-dialog', width: 80 };
  element = 'el-dialog'

  setOption({
    option, // form options
    element
  }) {
    if (option) {
      this.option = option;
    }

    if (element) {
      this.element = element
    }
  }

  resetOption() {
    this.option = { title: 'el-dialog', width: 80 };
    this.element = 'el-dialog'
  }

  exportSetting() {
    return {
      option: this.option,
      element: this.element
    };
  }
}
