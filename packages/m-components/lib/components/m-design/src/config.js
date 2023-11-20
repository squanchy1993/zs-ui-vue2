import { difference } from '../../m-utils';
import { MDynamicElemFields } from '../../m-dynamic-elem/';
export const getTableColumnFields = (elem) => {
  const tableColumnProps = [
    {
      props: {
        prop: 'props.label',
        label: 'label'
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
        prop: 'props.prop',
        label: 'prop'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入prop'
        }
      }
    },
    {
      props: {
        prop: 'props.width',
        label: 'width'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入width'
        }
      }
    },
    {
      // props: {
      //   prop: 'as'
      // },
      itemBoxStyle: {
        width: '100%'
      },
      elemOptions: {
        type: 'render',
        elem: ({ h, injectData: { mFormCtrl } }) => {
          return <el-divider></el-divider>;
        }
      }
    },
    ...(MDynamicElemFields?.[elem] || []),
    {
      defaultValue: '',
      itemBoxStyle: {
        width: '100%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'MButtonOperator',
        props: {
          btns: [
            {
              name: '保存',
              code: async function ({ injectData: { mFormCtrl, mFormDialogCtrl, mListCtrl } }) {
                try {
                  const { validateFields, formData, originData } = mFormCtrl;
                  await validateFields();

                  // // only submit changed data;
                  const params = difference(formData, originData);
                  if (!Object.keys(params).length) {
                    this.$message.error('没有修改!');
                    throw new Error('没有修改!');
                  }
                  mFormDialogCtrl.openResolve(params);
                  mFormDialogCtrl.clear();
                } catch (error) {
                  console.log('提交失败', error);
                }
              }
            },
            {
              name: '重置',
              code: ({ injectData: { mFormCtrl } }) => mFormCtrl.reset()
            },
            {
              name: '测试',
              code: ({ injectData: { mFormCtrl } }) => mFormCtrl.formData.elemOptions.props.test()
            }
          ],
          boxStyle: {
            'justify-content': 'flex-end'
          }
        }
      }
    }
  ];

  return tableColumnProps;
};

export const getFormItemFields = (elem) => {
  const tableColumnProps = [
    {
      props: {
        prop: 'props.label',
        label: 'label'
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
        prop: 'props.prop',
        label: 'prop'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入prop'
        }
      }
    },
    {
      props: {
        prop: 'defaultValue',
        label: 'defaultValue'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入defaultValue'
        }
      }
    },
    {
      props: {
        prop: 'itemBoxStyle.width',
        label: 'width'
      },
      itemBoxStyle: {
        width: '50%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'el-input',
        props: {
          placeholder: '输入width'
        }
      }
    },
    {
      // props: {
      //   prop: 'as'
      // },
      itemBoxStyle: {
        width: '100%'
      },
      elemOptions: {
        type: 'render',
        elem: ({ h, injectData: { mFormCtrl } }) => {
          return <el-divider></el-divider>;
        }
      }
    },
    ...(MDynamicElemFields?.[elem] || []),
    {
      defaultValue: '',
      itemBoxStyle: {
        width: '100%'
      },
      elemOptions: {
        type: 'registered',
        elem: 'MButtonOperator',
        props: {
          btns: [
            {
              name: '保存',
              code: async function ({ injectData: { mFormCtrl, mFormDialogCtrl, mListCtrl } }) {
                try {
                  const { validateFields, formData, originData } = mFormCtrl;
                  await validateFields();

                  // // only submit changed data;
                  const params = difference(formData, originData);
                  if (!Object.keys(params).length) {
                    this.$message.error('没有修改!');
                    throw new Error('没有修改!');
                  }
                  mFormDialogCtrl.openResolve(params);
                  mFormDialogCtrl.clear();
                } catch (error) {
                  console.log('提交失败', error);
                }
              }
            },
            {
              name: '重置',
              code: ({ injectData: { mFormCtrl } }) => mFormCtrl.reset()
            }
          ],
          boxStyle: {
            'justify-content': 'flex-end'
          }
        }
      }
    }
  ];

  return tableColumnProps;
};

// baseData
export const besicData = {
  mListSettingForm: {
    props: {
      ref: 'form',
      size: 'mini',
      labelWidth: '80px'
    },
    fields: [
      {
        props: {
          label: 'loadList:',
          prop: 'loadList'
        },
        itemBoxStyle: {
          width: '50%',
          paddingRight: '10px'
        },
        defaultValue: true,
        elemOptions: {
          type: 'registered',
          elem: 'el-switch',
          props: {
            activeValue: true,
            inactiveValue: false
          }
        }
      },
      {
        props: {
          label: 'pageIndex:',
          prop: 'pageParams.pageIndex'
        },
        itemBoxStyle: {
          width: '50%',
          paddingRight: '10px'
        },
        defaultValue: 0,
        elemOptions: {
          type: 'registered',
          elem: 'el-input-number',
          props: {
            placeholder: '输入name'
          }
        }
      },
      {
        props: {
          label: 'pageSize:',
          prop: 'pageParams.pageSize'
        },
        itemBoxStyle: {
          width: '50%',
          paddingRight: '10px'
        },
        defaultValue: 0,
        elemOptions: {
          type: 'registered',
          elem: 'el-input-number',
          props: {
            placeholder: '输入name'
          }
        }
      },
      {
        props: {
          label: 'requestFun:',
          prop: 'requestFun'
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
        defaultValue: '',
        itemBoxStyle: {
          width: '100%'
        },
        elemOptions: {
          type: 'registered',
          elem: 'MButtonOperator',
          props: {
            btns: [
              {
                name: '重置',
                code: ({ injectData: { mFormCtrl } }) => mFormCtrl.reset()
              }
            ],
            boxStyle: {
              'justify-content': 'flex-end'
            }
          }
        }
      }
    ]
  },
  elemFields: [
    {
      props: {
        label: 'text',
        prop: null
      }
    },
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
  ],

  // edit tableColumn dialog
  tableColumn: {
    elem: 'el-dialog',
    props: {
      title: 'el-table-column',
      width: '60%',
      size: '60%'
    },

    scrollStyle: {
      height: '60vh'
    },
    on: ({ mTableCtrl }) => {
      return {
        close: mTableCtrl.close
      };
    },
    elemOptions: {
      type: 'registered',
      elem: 'MFormGenerator',
      props: {
        config: {
          props: {
            ref: 'form',
            size: 'mini',
            labelPosition: 'right',
            labelWidth: '140px'
          },
          boxStyle: {
            'justify-content': 'space-between'
          },
          fields: []
        }
      }
    }
  },

  // edit formItem dialog
  formItem: {
    elem: 'el-dialog',
    props: {
      title: 'el-form-item',
      width: '60%',
      size: '60%',
      'append-to-body': true
    },

    scrollStyle: {
      height: '60vh'
    },
    on: ({ mTableCtrl }) => {
      return {
        close: mTableCtrl.close
      };
    },
    elemOptions: {
      type: 'registered',
      elem: 'MFormGenerator',
      props: {
        config: {
          props: {
            ref: 'form',
            size: 'mini',
            labelPosition: 'right',
            labelWidth: '140px'
          },
          boxStyle: {
            'justify-content': 'space-between'
          },
          fields: []
        }
      }
    }
  }
};
