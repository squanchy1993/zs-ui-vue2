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
  ],
  MButtonOperator: [
    {
      props: {
        prop: 'elemOptions.props.btns',
        label: 'btns'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'MArrayEdit',
        props: {
          arrayType: 'Object',
          labelKey: 'name',
          formConfig: '',
          fields: [
            {
              props: {
                label: 'name:',
                prop: 'name'
              },
              itemBoxStyle: {
                width: '50%',
                paddingRight: '10px'
              },
              defaultValue: 'name....',
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
                label: 'code:',
                prop: 'code'
              },
              itemBoxStyle: {
                width: '100%',
                paddingRight: '10px'
              },
              elemOptions: {
                type: 'registered',
                elem: 'MCodeInput'
              }
            }
          ]
        }
      }
    }
  ],
  render: [
    {
      props: {
        prop: 'elemOptions.elem',
        label: 'elem'
      },
      itemBoxStyle: {
        width: '100%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'MCodeInput'
      }
    }
  ],
  mSelect: [
    {
      props: {
        prop: 'elemOptions.props.placeholder',
        label: 'placeholder:'
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
        prop: 'elemOptions.props.multiple',
        label: 'multiple:'
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
        prop: 'elemOptions.props.filterable',
        label: 'filterable:'
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
        prop: 'elemOptions.props.collapse-tags',
        label: 'collapse-tags:'
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
        prop: 'elemOptions.props.remote',
        label: 'remote:'
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
        label: 'remoteMethod:',
        prop: 'elemOptions.props.remoteMethod'
      },
      itemBoxStyle: {
        width: '100%',
        paddingRight: '10px'
      },
      elemOptions: {
        type: 'registered',
        elem: 'MCodeInput'
      }
    },
    {
      props: {
        prop: 'elemOptions.props.options',
        label: 'options'
      },
      itemBoxStyle: {
        width: '100%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'MArrayEdit',
        props: {
          arrayType: 'Object',
          formConfig: '',
          fields: [
            {
              props: {
                label: 'label:',
                prop: 'label'
              },
              itemBoxStyle: {
                width: '50%',
                paddingRight: '10px'
              },
              defaultValue: 'name....',
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
                label: 'value:',
                prop: 'value'
              },
              itemBoxStyle: {
                width: '50%',
                paddingRight: '10px'
              },
              elemOptions: {
                type: 'registered',
                elem: 'MCodeInput'
              }
            }
          ]
        }
      }
    }
  ]
};

export default MDynamicElemFields;
