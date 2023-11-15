const MDynamicElemFields = {
  'el-input': [
    {
      props: {
        prop: 'elemOptions.props.clearable',
        label: 'clearable'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-switch'
      }
    },
    {
      props: {
        prop: 'elemOptions.props.placeholder',
        label: 'placeholder'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入placeholder'
        }
      }
    },
    {
      props: {
        prop: 'elemOptions.props.minlength',
        label: 'minlength'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-input-number',
        props: {
          placeholder: '输入minlength'
        }
      }
    },
    {
      props: {
        prop: 'elemOptions.props.disabled',
        label: 'disabled'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-switch'
      }
    }
  ],
  'el-switch': [
    {
      props: {
        prop: 'elemOptions.props.activeValue',
        label: 'activeValue'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'MDynamicInput',
        props: {
          placeholder: '输入label'
        }
      }
    },
    {
      props: {
        prop: 'elemOptions.props.inactiveValue',
        label: 'inactiveValue'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'MDynamicInput',
        props: {
          placeholder: '输入label'
        }
      }
    },
    {
      props: {
        prop: 'elemOptions.props.activeText',
        label: 'activeText'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入label'
        }
      }
    },
    {
      props: {
        prop: 'elemOptions.props.inactiveText',
        label: 'inactiveText'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入label'
        }
      }
    },
    {
      props: {
        prop: 'elemOptions.props.activeColor',
        label: 'activeColor'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-color-picker',
        props: {
          placeholder: '输入label'
        }
      }
    },

    {
      props: {
        prop: 'elemOptions.props.inactiveColor',
        label: 'inactiveColor'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-color-picker',
        props: {
          placeholder: '输入label'
        }
      }
    },
    {
      props: {
        prop: 'elemOptions.props.disabled',
        label: 'disabled'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-switch'
      }
    }
  ]
};

export default MDynamicElemFields;
