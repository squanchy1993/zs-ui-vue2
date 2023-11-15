import { getConfigList, createConfig, updateConfig, deleteConfig } from '@/api';
import { difference, stringify } from '@m-components/components/m-utils';

export function getLayoutConfig() {
  const listConfig = {
    loadList: true,
    pageParams: { pageIndex: 1, pageSize: 10 },
    requestFun: async ({ pageParams, searchParams }) => {
      let {
        data: { list, total }
      } = await getConfigList({ ...pageParams });
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
          prop: 'listConfig'
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
            placeholder: '输入listConfig'
          }
        }
      },
      {
        props: {
          prop: 'searchFormConfig'
        },
        itemBoxStyle: {
          width: '200px',
          paddingRight: '10px'
        },
        elemOptions: {
          type: 'registered',
          elem: 'el-input',
          props: {
            placeholder: '输入searchFormConfig'
          }
        }
      },
      {
        props: {
          prop: 'tableConfig'
        },
        itemBoxStyle: {
          width: '200px',
          paddingRight: '10px'
        },
        elemOptions: {
          type: 'registered',
          elem: 'el-input',
          props: {
            placeholder: '输入tableConfig'
          }
        }
      },
      {
        props: {
          prop: 'dialogConfig'
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
                code: async function ({ injectData: { mListCtrl, mLayoutTable } }) {
                  try {
                    let data = getConfig();
                    console.log('data');
                    await createConfig(data);
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
          elem: ({ h, injectData: { mFormCtrl } }) => {
            return <el-button onClick={() => mFormCtrl.reset()}>重置</el-button>;
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
          label: 'id',
          prop: 'id'
        }
      },
      {
        props: {
          label: 'listConfig',
          prop: 'listConfig'
        }
      },
      {
        props: {
          label: 'searchFormConfig',
          prop: 'searchFormConfig'
        }
      },
      {
        props: {
          label: 'tableConfig',
          prop: 'tableConfig'
        }
      },
      {
        props: {
          label: 'dialogConfig',
          prop: 'dialogConfig'
        }
      },
      {
        props: {
          label: 'MTableFieldButton',
          prop: 'MTableFieldButton',
          width: '310',
          fixed: 'right'
        },
        elemOptions: {
          type: 'registered',
          elem: 'MButtonOperator',
          props: {
            btns: [
              {
                name: '编辑',
                code: async function ({
                  injectData: { mListCtrl, mLayoutTable },
                  props: { data }
                }) {
                  try {
                    await mLayoutTable.dialogs.userDialog.open({ tag: 'edit', data });
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
                code: async function ({ injectData: { mListCtrl }, props: { data } }) {
                  try {
                    await deleteConfig(data.id);
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
              },
              {
                name: '查看列表',
                code: async function ({
                  injectData: { mListCtrl, mLayoutTable },
                  props: { data }
                }) {
                  try {
                    this.$router.push({ path: `/tableLayout/jsonConfigExample/${data.id}` });
                  } catch (error) {
                    console.error('查看列表', error);
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
                name: '设计',
                code: async function ({
                  injectData: { mListCtrl, mLayoutTable },
                  props: { data }
                }) {
                  try {
                    this.$router.push({ path: `/tableLayout/DesignTable` });
                  } catch (error) {
                    console.error('查看列表', error);
                  }
                },
                option: {
                  size: 'mini',
                  type: 'primary'
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
          title: '列表编辑',
          width: '80%',
          size: '30%'
        },

        scrollStyle: {
          height: '60vh'
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
          labelWidth: '140px'
        },
        boxStyle: {
          'justify-content': 'space-between'
        },
        fields: [
          {
            props: {
              prop: 'listConfig',
              label: 'listConfig',
              rules: [{ required: true, message: '请输入listConfig', trigger: 'change' }]
            },
            itemBoxStyle: {
              width: '100%'
            },
            elemOptions: {
              type: 'registered',
              elem: 'MJsonEditor',
              props: {
                showBtns: false,
                expandedOnStart: false
              }
            }
          },
          {
            props: {
              prop: 'searchFormConfig',
              label: 'searchFormConfig',
              rules: [{ required: true, message: '请输入searchFormConfig', trigger: 'change' }]
            },
            itemBoxStyle: {
              width: '100%'
            },
            elemOptions: {
              type: 'registered',
              elem: 'MJsonEditor',
              props: {
                showBtns: false,
                expandedOnStart: false
              }
            }
          },
          {
            props: {
              prop: 'tableConfig',
              label: 'tableConfig',
              rules: [{ required: true, message: '请输入tableConfig', trigger: 'change' }]
            },
            itemBoxStyle: {
              width: '100%'
            },
            elemOptions: {
              type: 'registered',
              elem: 'MJsonEditor',
              props: {
                showBtns: false,
                expandedOnStart: false
              }
            }
          },
          {
            props: {
              prop: 'dialogConfig',
              label: 'dialogConfig',
              rules: [{ required: true, message: '输入dialogConfig', trigger: 'change' }]
            },
            itemBoxStyle: {
              width: '100%'
            },
            elemOptions: {
              type: 'registered',
              elem: 'MJsonEditor',
              props: {
                showBtns: false,
                expandedOnStart: false
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
                    code: async function ({
                      injectData: { mFormCtrl, mFormDialogCtrl, mListCtrl }
                    }) {
                      try {
                        const { validateFields, formData, originData } = mFormCtrl;
                        await validateFields();

                        // only submit changed data;
                        const params = difference(formData, originData);
                        if (!Object.keys(params).length) {
                          this.$message.error('没有修改!');
                          throw new Error('没有修改!');
                        }

                        // submit data
                        let res;
                        const { id } = originData;
                        if (!id) {
                          res = await createConfig(params);
                        } else {
                          res = await updateConfig({ ...params, id });
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

export function getConfig() {
  const listConfig = {
    loadList: false,
    pageParams: { pageIndex: 1, pageSize: 10 },
    requestFun: async function ({ pageParams, searchParams }) {
      const { $importSrc } = this.componentInstance;
      const { getUserList } = await $importSrc('api.js');
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
                code: async function ({ injectData: { mListCtrl, mLayoutTable } }) {
                  try {
                    await mLayoutTable.dialogs.userDialog.open({ tag: 'create' });
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
          elem: ({ h, injectData: { mFormCtrl } }) => {
            return <el-button onClick={() => mFormCtrl.reset()}>重置</el-button>;
          }
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
                code: async function ({
                  injectData: { mListCtrl, mLayoutTable },
                  props: { data }
                }) {
                  try {
                    await mLayoutTable.dialogs.userDialog.open({ tag: 'edit', data });
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
                code: async function ({ injectData: { mListCtrl }, props: { data } }) {
                  try {
                    const { $importSrc } = mListCtrl.componentInstance;
                    const { deleteUser } = await $importSrc('api.js');
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
                          code: async function ({
                            injectData: { mFormCtrl, mFormDialogCtrl, mListCtrl }
                          }) {
                            try {
                              const { validateFields, formData, originData } = mFormCtrl;
                              await validateFields();

                              // only submit changed data;
                              const { $importSrc, $mComponent } = mListCtrl.componentInstance;
                              const {
                                MUtils: { difference }
                              } = await $mComponent('index.js');
                              const params = difference(formData, originData);
                              if (!Object.keys(params).length) {
                                this.$message.error('没有修改!');
                                throw new Error('没有修改!');
                              }

                              // submit data
                              const { createUser, updateUser } = await $importSrc('api.js');
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
              ],
              elemOptions: {
                type: 'registered',
                elem: 'MButtonOperator',
                props: {
                  btns: [
                    {
                      name: '编辑',
                      code: async function ({
                        injectData: { mListCtrl, mLayoutTable },
                        props: { data }
                      }) {
                        try {
                          await mLayoutTable.dialogs.userDialog.open({ tag: 'edit', data });
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
                      code: async function ({ injectData: { mListCtrl }, props: { data } }) {
                        try {
                          const { $importSrc } = mListCtrl.componentInstance;
                          const { deleteUser } = await $importSrc('api.js');
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
          }
        }
      }
    }
  };

  return {
    listConfig: stringify(listConfig),
    searchFormConfig: stringify(searchFormConfig),
    tableConfig: stringify(tableConfig),
    dialogConfig: stringify(dialogConfig)
  };
}
