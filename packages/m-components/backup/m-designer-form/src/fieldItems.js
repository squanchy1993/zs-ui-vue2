import { DynamicFieldOption } from '../../../m-models/index';
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
  ]
};

export function getItemForm(type) {
  let returnItemForm = [];
  if (itemForms[type]) {
    returnItemForm = itemForms[type];
  }
  return returnItemForm;
}
