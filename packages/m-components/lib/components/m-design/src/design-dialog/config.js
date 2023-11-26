// elemList
export const elemList = [
  {
    props: {
      label: 'el-input',
      prop: 'name'
    },
    elemOptions: {
      type: 'registered',
      elem: 'el-input',
      props: {
        placeholder: '输入name'
      }
    }
  },
  {
    props: {
      label: 'el-switch',
      prop: null
    },
    elemOptions: {
      type: 'registered',
      elem: 'el-switch',
      props: {
        activeValue: 0,
        activeText: '女',
        activeColor: 'pink',
        inactiveValue: 1,
        inactiveText: '男',
        inactiveColor: 'green',
        disabled: true
      }
    }
  }
];

export const popupDialogConfig = {
  props: {
    ref: 'form',
    size: 'mini',
    labelPosition: 'right',
    labelWidth: '190px'
  },
  boxStyle: {
    justifyContent: 'space-between'
  },
  fields: [
    {
      itemBoxStyle: {
        width: '100%'
      },
      elemOptions: {
        type: 'render',
        elem: ({ h, injectData: { mFormCtrl } }) => {
          return <el-divider>popup setting</el-divider>;
        }
      }
    },
    {
      props: {
        label: 'key:',
        prop: 'key',
        rules: [{ required: true, message: '请输入key', trigger: 'change' }]
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入key'
        }
      }
    },
    {
      props: {
        label: 'elem:',
        prop: 'elem',
        rules: [{ required: true, message: '请输入elem', trigger: 'change' }]
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入elem'
        }
      }
    },
    {
      props: {
        label: 'props.title:',
        prop: 'props.title'
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入title'
        }
      }
    },
    {
      props: {
        label: 'props.width:',
        prop: 'props.width',
        rules: [{ required: true, message: '请输入width', trigger: 'change' }]
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入width'
        }
      }
    },
    {
      props: {
        label: 'props.size:',
        prop: 'props.size'
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入size'
        }
      }
    },
    {
      props: {
        label: 'scrollStyle.height:',
        prop: 'scrollStyle.height',
        rules: [{ required: true, message: '请输入height', trigger: 'change' }]
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入height'
        }
      }
    },
    {
      itemBoxStyle: {
        width: '100%'
      },
      elemOptions: {
        type: 'render',
        elem: ({ h, injectData: { mFormCtrl } }) => {
          return <el-divider>form setting</el-divider>;
        }
      }
    },
    {
      props: {
        label: 'props.size:',
        prop: 'elemOptions.props.config.props.size'
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入size'
        }
      }
    },
    {
      props: {
        label: 'props.labelPosition:',
        prop: 'elemOptions.props.config.props.labelPosition'
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入labelPosition'
        }
      }
    },
    {
      props: {
        label: 'props.labelWidth:',
        prop: 'elemOptions.props.config.props.labelWidth'
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入labelWidth'
        }
      }
    },
    {
      props: {
        label: 'boxStyle.justifyContent:',
        prop: 'elemOptions.props.config.boxStyle.justifyContent'
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入justifyContent'
        }
      }
    },
    {
      props: {
        label: 'props.ref:',
        prop: 'elemOptions.props.config.props.ref'
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: '',
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入ref'
        }
      }
    },
    {
      props: {
        label: 'props.fields:',
        prop: 'elemOptions.props.config.fields'
      },
      itemBoxStyle: {
        width: '50%'
      },
      defaultValue: []
    }
  ]
}