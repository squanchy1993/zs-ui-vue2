/* eslint-disable */
import { DynamicFieldOption } from './DynamicFieldOption';
const publicFormItem = [
  new DynamicFieldOption({
    label: 'prop',
    prop: 'prop',
    elType: 'registered',
    element: 'el-input',
    required: true,
    defaultValue: '',
    width: '100%',
    option: {
      placeholder: '绑定的值:prop'
    }
  }),
  new DynamicFieldOption({
    label: 'width',
    prop: 'width',
    elType: 'registered',
    element: 'el-input',
    required: false,
    defaultValue: '100%',
    width: '100%',
    option: {
      placeholder: '组件宽度 100% or 100px'
    }
  }),
  new DynamicFieldOption({
    label: 'defaultValue',
    prop: 'defaultValue',
    elType: 'registered',
    element: 'el-input',
    required: false,
    defaultValue: null,
    width: '100%',
    option: {
      placeholder: '请输入defaultValue'
    }
  })
];

const tableCellPublicFormItem = [
  new DynamicFieldOption({
    label: 'label',
    prop: 'tableColumnOptions.label',
    elType: 'registered',
    element: 'el-input',
    required: false,
    defaultValue: 'el-switch',
    width: '100%',
    option: {
      placeholder: '请输入label'
    }
  }),
  new DynamicFieldOption({
    label: 'prop',
    prop: 'tableColumnOptions.prop',
    elType: 'registered',
    element: 'el-input',
    required: false,
    defaultValue: 'el-switch',
    width: '100%',
    option: {
      placeholder: '请输入prop'
    }
  }),
  new DynamicFieldOption({
    label: 'width',
    prop: 'tableColumnOptions.width',
    elType: 'registered',
    element: 'el-input',
    required: false,
    defaultValue: 'el-switch',
    width: '100%',
    option: {
      placeholder: '请输入width',
      min: 0
    }
  })
];

const itemForms = {
  'el-input': [
    new DynamicFieldOption({
      label: 'label',
      prop: 'label',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: 'input',
      width: '100%',
      option: {
        placeholder: '请输入label'
      }
    }),
    ...publicFormItem,
    new DynamicFieldOption({
      label: 'validator',
      prop: 'validator',
      elType: 'registered',
      element: 'MFormFieldRules',
      required: false,
      defaultValue: {
        fun: `(rule, value, callback) => {
          if (!value) {
            return callback(new Error('el-input不能为空'));
          }
          callback()
        }`,
        trigger: 'blur'
      },
      width: '100%',
      option: {
        placeholder: '请输入clearable'
      }
    }),
    new DynamicFieldOption({
      label: 'clearable',
      prop: 'option.clearable',
      elType: 'registered',
      element: 'el-switch',
      required: false,
      defaultValue: false,
      width: '100%',
      option: {
        placeholder: '请输入clearable'
      }
    }),
    new DynamicFieldOption({
      label: 'placeholder',
      prop: 'option.placeholder',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: null,
      width: '100%',
      option: {
        placeholder: '请输入placeholder'
      }
    }),
    new DynamicFieldOption({
      label: 'maxlength',
      prop: 'option.maxlength',
      elType: 'registered',
      element: 'el-input-number',
      required: false,
      defaultValue: null,
      width: '100%',
      option: {
        placeholder: '请输入maxlength'
      }
    }),
    new DynamicFieldOption({
      label: 'minlength',
      prop: 'option.minlength',
      elType: 'registered',
      element: 'el-input-number',
      required: false,
      defaultValue: null,
      width: '100%',
      option: {
        placeholder: '请输入maxlength'
      }
    })
  ],
  'el-switch': [
    new DynamicFieldOption({
      label: 'label',
      prop: 'label',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: 'el-switch',
      width: '100%',
      option: {
        placeholder: '请输入label'
      }
    }),
    ...publicFormItem,
    new DynamicFieldOption({
      label: 'activeText',
      prop: 'option.activeText',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: null,
      width: '100%',
      option: {
        placeholder: 'switch 打开时的文字描述'
      }
    }),
    new DynamicFieldOption({
      label: 'activeValue',
      prop: 'option.activeValue',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: null,
      width: '100%',
      option: {
        placeholder: 'switch 打开时的值'
      }
    }),
    new DynamicFieldOption({
      label: 'inactiveText',
      prop: 'option.inactiveText',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: null,
      width: '100%',
      option: {
        placeholder: 'switch 关闭时的文字描述'
      }
    }),
    new DynamicFieldOption({
      label: 'inactiveValue',
      prop: 'option.inactiveValue',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: null,
      width: '100%',
      option: {
        placeholder: 'switch 关闭时的值'
      }
    })
  ],
  MTableFieldText: [
    ...tableCellPublicFormItem,
    new DynamicFieldOption({
      label: 'defaultValue',
      prop: 'defaultValue',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: null,
      width: '100%',
      option: {
        placeholder: '请输入defaultValue'
      }
    })
  ],
  MTableFieldButton: [
    ...tableCellPublicFormItem,
    new DynamicFieldOption({
      label: 'defaultValue',
      prop: 'defaultValue',
      elType: 'registered',
      element: 'MFormFieldButton',
      required: false,
      defaultValue: [],
      width: '100%',
      option: {
        placeholder: '请输入defaultValue'
      }
    })
  ],
  'el-table': [
    new DynamicFieldOption({
      label: 'border',
      prop: 'border',
      elType: 'registered',
      element: 'el-switch',
      required: false,
      defaultValue: false,
      width: '100%',
      option: {
        placeholder: '请输入clearable',
        'active-text': 'show',
        'inactive-text': 'hide'
      }
    }),
    new DynamicFieldOption({
      label: 'stripe',
      prop: 'stripe',
      elType: 'registered',
      element: 'el-switch',
      required: false,
      defaultValue: false,
      width: '100%',
      option: {
        placeholder: '请输入clearable',
        'active-text': 'show',
        'inactive-text': 'hide'
      }
    }),
    new DynamicFieldOption({
      label: 'size',
      prop: 'size',
      elType: 'registered',
      element: 'MSelectPicker',
      required: false,
      defaultValue: [],
      option: {
        limit: 1,
        list: [{
          label: 'label1',
          value: 123
        }],
        labelValueKey: {
          label: 'label',
          value: 'value'
        }
      }
    }),
  ],
  'el-form': [
    new DynamicFieldOption({
      label: 'disabled',
      prop: 'disabled',
      elType: 'registered',
      element: 'el-switch',
      required: false,
      defaultValue: false,
      width: '100%',
      option: {
        placeholder: '请输入disabled'
      }
    }),
    new DynamicFieldOption({
      label: 'labelWidth',
      prop: 'labelWidth',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: false,
      width: '100%',
      option: {
        placeholder: '请输入label-width'
      }
    })
  ],
  'el-dialog': [
    new DynamicFieldOption({
      label: 'title',
      prop: 'title',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: 'dialog',
      width: '100%',
      option: {
        placeholder: '请输入title'
      }
    }),
    new DynamicFieldOption({
      label: 'width',
      prop: 'width',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: '100%',
      width: '100%',
      option: {
        placeholder: '组件宽度 100% or 100px'
      }
    })
  ],
  'el-drawer': [
    new DynamicFieldOption({
      label: 'title',
      prop: 'title',
      elType: 'registered',
      element: 'el-input',
      required: false,
      defaultValue: 'drawer',
      width: '100%',
      option: {
        placeholder: '请输入title'
      }
    }),
    new DynamicFieldOption({
      label: 'withHeader',
      prop: 'withHeader',
      elType: 'registered',
      element: 'el-switch',
      required: false,
      defaultValue: false,
      width: '100%',
      option: {
        placeholder: '请输入withHeader'
      }
    })
  ]
};

export function getItemForm(type) {
  let returnItemForm = [];
  if (itemForms[type]) {
    returnItemForm = itemForms[type];
  }
  return returnItemForm;
}
