import { DynamicFieldOption } from './DynamicFieldOption';
export class FormOption {
  ref = `form_${Date.parse(new Date())}`;
  formComponent = null;

  option = { labelWidth: '80px', disabled: false };
  MDynamicFields = [];

  setOption({
    option, // form options
    MDynamicFields
  }) {
    if (option) {
      this.option = option;
    }

    if (MDynamicFields) {
      this.MDynamicFields = MDynamicFields.map((item) => new DynamicFieldOption(item));
    }
  }

  resetOption() {
    this.option = { labelWidth: '80px', disabled: false };
    this.MDynamicFields = []
    this.formData = {}
  }

  exportSetting() {
    return {
      option: this.option,
      MDynamicFields: this.MDynamicFields
    };
  }
}
