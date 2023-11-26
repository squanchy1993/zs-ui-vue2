import { getUserList, createUser, updateUser, deleteUser } from '@/api';
export function getLayoutConfig() {
  const listConfig = {
    loadList: true,
    pageParams: { pageIndex: 1, pageSize: 10 },
    requestFun: async function ({ pageParams, searchParams }) {
      console.log('jsConfigExample requestFun>>>:', pageParams, searchParams);
      let {
        data: { list, total }
      } = await getUserList({ ...pageParams });
      return { list, total };
    }
  };

  const searchFormConfig = {
    props: {
      ref: 'form',
      size: 'mini'
    },
    fields: [
      {
        props: {
          prop: 'name'
        },
        itemBoxStyle: {
          width: '200px',
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
          prop: 'age'
        },
        itemBoxStyle: {
          width: '200px',
          paddingRight: '10px'
        },
        elemOptions: {
          type: 'registered',
          elem: 'el-input',
          props: {
            placeholder: '输入age'
          }
        }
      },
      {
        props: {
          prop: 'address'
        },
        itemBoxStyle: {
          width: '200px',
          paddingRight: '10px'
        },
        elemOptions: {
          type: 'registered',
          elem: 'el-input',
          props: {
            placeholder: '输入address'
          }
        }
      },
      {
        itemBoxStyle: {
          width: 'fit-content',
          paddingRight: '10px'
        },
        elemOptions: {
          type: 'registered',
          elem: 'MButtonOperator',
          props: {
            btns: [
              {
                name: '创建',
                code: async ({ injectData: { mListCtrl } }) => {
                  try {
                    await this.dialogs.userDialog.open({ tag: 'create' });
                    await mListCtrl.getList();
                  } catch (error) {
                    console.log('创建', error);
                  }
                }
              }
            ]
          }
        }
      },
      {
        itemBoxStyle: {
          width: 'fit-content',
          paddingRight: '10px'
        },
        elemOptions: {
          type: 'render',
          elem: ({h, injectData: { mFormCtrl, mListCtrl } }) => {
            return <el-button
              onClick={async () => {
                await mFormCtrl.reset();
                mListCtrl.getList();
              }}
            >
            重置
            </el-button>
          }
        }
      },
      {
        itemBoxStyle: {
          width: 'fit-content',
          paddingRight: '10px'
        },
        elemOptions: {
          type: 'slot',
          elem: 'btn1'
        }
      },
      {
        itemBoxStyle: {
          width: 'fit-content',
          paddingRight: '10px'
        },
        elemOptions: {
          type: 'scopedSlot',
          elem: 'btn2'
        }
      }
    ]
  };

  const tableConfig = {
    props: {
      border: true
    },
    fields: [
      {
        props: {
          label: 'name',
          prop: 'name'
        }
      },
      {
        props: {
          label: 'age',
          prop: 'age'
        }
      },
      {
        props: {
          label: 'gender',
          prop: 'gender'
        },
        elemOptions: {
          type: 'registered',
          elem: 'el-switch',
          props: {
            placeholder: '输入gender',
            activeValue: 0,
            activeText: '女',
            activeColor: 'pink',
            inactiveValue: 1,
            inactiveText: '男',
            inactiveColor: 'green',
            disabled: true
          }
        }
      },
      {
        props: {
          label: 'membership',
          prop: 'membership'
        },
        elemOptions: {
          type: 'registered',
          elem: 'el-switch',
          props: {
            'active-value': true,
            'inactive-value': false,
            disabled: true
          }
        }
      },
      {
        props: {
          label: 'address',
          prop: 'address'
        }
      },
      {
        props: {
          label: 'MTableFieldButton',
          prop: 'MTableFieldButton',
          width: '180'
        },
        elemOptions: {
          type: 'registered',
          elem: 'MButtonOperator',
          props: {
            btns: [
              {
                name: '编辑',
                code: async ({ injectData: { mListCtrl }, props: { data } }) => {
                  try {
                    await this.dialogs.userDialog.open({ tag: 'edit', data });
                    await mListCtrl.getList();
                  } catch (error) {
                    console.error('编辑失败', error);
                  }
                },
                option: {
                  size: 'mini',
                  type: 'primary'
                },
                'option.size': null,
                'option.type': null
              },
              {
                name: '删除',
                code: async ({ injectData: { mListCtrl }, props: { data } }) => {
                  try {
                    await deleteUser(data.id);
                    await mListCtrl.getList();
                  } catch (error) {
                    console.error('删除失败', error);
                  }
                },
                option: {
                  size: 'mini',
                  type: 'danger'
                },
                'option.size': null,
                'option.type': null
              }
            ]
          }
        }
      }
    ]
  };

  const dialogConfig = {
    userDialog: {
      mPopoupConfig: {
        elem: 'el-dialog',
        props: {
          title: '会员编辑',
          width: '30%',
          size: '30%'
        },
        on: ({ mTableCtrl }) => {
          return {
            close: mTableCtrl.close
          };
        }
      },
      mFormGeneratorConfig: {
        props: {
          ref: 'form',
          size: 'mini',
          labelPosition: 'right',
          labelWidth: '80px'
        },
        boxStyle: {
          'justify-content': 'space-between'
        },
        fields: [
          {
            props: {
              prop: 'name',
              label: '名字',
              rules: [{ required: true, message: '请输入name', trigger: 'change' }]
            },
            itemBoxStyle: {
              width: '50%'
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
              prop: 'age',
              label: '年龄',
              rules: [{ required: true, message: '请输入age', trigger: 'change' }]
            },
            defaultValue: 0,
            itemBoxStyle: {
              width: '50%'
            },
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
              prop: 'gender',
              label: '性别',
              rules: [{ required: true, message: '请输入gender', trigger: 'change' }]
            },
            defaultValue: 0,
            itemBoxStyle: {
              width: '50%'
            },
            elemOptions: {
              type: 'registered',
              elem: 'el-switch',
              props: {
                placeholder: '输入gender',
                activeValue: 0,
                activeText: '女',
                activeColor: 'pink',
                inactiveValue: 1,
                inactiveText: '男',
                inactiveColor: 'green'
              }
            }
          },

          {
            props: {
              prop: 'membership',
              label: '会员',
              rules: [{ required: true, message: '输入membership', trigger: 'change' }]
            },
            defaultValue: false,
            itemBoxStyle: {
              width: '50%'
            },
            elemOptions: {
              type: 'registered',
              elem: 'el-switch',
              props: {
                placeholder: '输入membership'
              }
            }
          },

          {
            props: {
              prop: 'address',
              label: '地址',
              rules: [{ required: true, message: '请输入address', trigger: 'change' }]
            },
            defaultValue: '',
            itemBoxStyle: {
              width: '50%'
            },
            elemOptions: {
              type: 'registered',
              elem: 'el-input',
              props: {
                placeholder: '请输入address'
              }
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
                    name: '保存',
                    code: async ({ injectData: { mFormCtrl, mFormDialogCtrl, mListCtrl } }) => {
                      try {
                        const { validateFields, formData, originData } = mFormCtrl;
                        await validateFields();

                        // only submit changed data;
                        const { difference } = await import('@m-components/components/m-utils');
                        const params = difference(formData, originData);
                        if (!Object.keys(params).length) {
                          this.$message.error('没有修改!');
                          throw new Error('没有修改!');
                        }

                        // submit data
                        console.log('params>>>>>>>>', params);
                        let res;
                        const { id } = originData;
                        if (!id) {
                          res = await createUser(params);
                        } else {
                          res = await updateUser({ ...params, id });
                        }

                        mFormDialogCtrl.openResolve(res);
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
        ]
      }
    }
  };

  return {
    listConfig,
    searchFormConfig,
    tableConfig,
    dialogConfig
  };
}
