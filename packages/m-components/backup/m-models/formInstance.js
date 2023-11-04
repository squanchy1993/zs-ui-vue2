import { FormOption } from './formOption';
import { WindowOption } from './WindowOption';
import { FormInstanceLogic } from './formInstnceLogic';

export class FormInstance extends FormInstanceLogic {
  ref;
  formComponent = null;

  // 配置项
  formOption = new FormOption({});
  windowOption = new WindowOption({});
  formFlags = ['create', 'edit'];
  formBtns = [
    {
      name: '创建',
      code: "() => {\n\t      this.formInstance.formOption.formComponent.validate((valid) => {\n        if (valid) {\n          console.log('valid>>>>', valid)\n          this.$indexedDB.add('users', this.formInstance.formData).then(res => {\n            this.formInstance.close()\n            }\n          )\n        } else {\n          console.log('error submit!!');\n          return false;\n        }\n      })\n\n}",
      option: {
        size: 'mini',
        type: 'primary'
      },
      'option.size': null,
      'option.type': null
    },
    {
      name: '编辑',
      code: "() => {\n\t      this.formInstance.formOption.formComponent.validate((valid) => {\n        if (valid) {\n          console.log('valid>>>>', valid)\n          const params = {id: this.formInstance.formDataCache.id, ...this.formInstance.formData }\n          this.$indexedDB.update('users', params).then(async res => {\n            this.formInstance.resolve(res)\n            this.formInstance.reset()\n            }\n          )\n        } else {\n          console.log('error submit!!');\n          return false;\n        }\n      })\n\n}",
      option: {
        size: 'mini',
        type: 'primary'
      },
      'option.size': null,
      'option.type': null
    }
  ];

  // 配置处理
  setOption({ formOption, windowOption, formFlags, formBtns }) {
    if (formOption) {
      this.formOption.setOption(formOption);
      this.formDataDefault = this.setFormDataDefault({});
    }

    if (windowOption) {
      this.windowOption.setOption(windowOption);
    }

    formFlags && (this.formFlags = formFlags);

    // 按钮列表
    formBtns && (this.formBtns = formBtns);
  }

  resetOption() {
    this.formOption.resetOption();
    this.windowOption.resetOption();
    this.formFlags = ['create', 'edit'];
    this.formBtns = [];
  }

  // 导出配置
  exportJson() {
    const option = {
      formOption: this.formOption.exportSetting(),
      windowOption: this.windowOption.exportSetting(),
      formFlags: this.formFlags,
      formBtns: this.formBtns
    };
    return JSON.stringify(option);
  }
}
