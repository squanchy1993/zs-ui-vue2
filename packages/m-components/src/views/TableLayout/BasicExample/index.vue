<!--
 * @Date: 2023-07-15 16:16:17
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-30 14:49:09
 * @FilePath: \m-components\src\views\TableLayout\BasicExample\index.vue
-->
<template>
  <MList :controller="listController" v-bind="listConfig">
    <!-- <template #search="{ searchParams, handleSearch, getList }"> -->
    <template #search="{ searchParams, handleSearch }">
      <MFormGenerator :form-data="searchParams" :config="searchFormConfig">
        <!-- elemOptions.type = 'slot' -->
        <template #btn1>
          <div>
            <el-button @click="handleSearch">搜索</el-button>
            <el-button @click="refrash">slot 刷新</el-button>
          </div>
        </template>

        <!-- or elemOptions.type ='scopedSlot' -->
        <template #btn2="{ props, injectData: { mListCtrl } }">
          <el-button @click="mListCtrl.getList">soltScope 刷新</el-button>
        </template>
      </MFormGenerator>
    </template>
    <template #table="{ list }">
      <MTableGenerator :config="tableConfig" :list="list" />
    </template>
    <template #pagination="{ handlePageOrSizeChange, pageParams, total }">
      <el-pagination
        :page-size="pageParams.pageSize"
        :current-page="pageParams.pageIndex"
        :total="total"
        :page-sizes="[100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="(pageSize) => handlePageOrSizeChange({ pageSize })"
        @current-change="(pageIndex) => handlePageOrSizeChange({ pageIndex })"
      />
    </template>
    <MPopupGenerator ref="userDialog" :controller="userdialogCtrl">
      <MFormGenerator :controller="userFormCtrl" />
    </MPopupGenerator>
  </MList>
</template>

<script>
/* eslint-disable */
import { getUserList, createUser, updateUser, deleteUser } from '@/api';
import {
  MList,
  ListController,
  MTableGenerator,
  MFormGenerator,
  MPopupGenerator,
  MPopupController,
  MFormController
} from '@m-components/index';
import { difference } from '@m-components/components/m-utils';

export default {
  provide() {
    return {
      mLayoutTable: this
    };
  },
  components: {
    MList,
    MTableGenerator,
    MFormGenerator,
    MPopupGenerator
  },
  data() {
    return {
      listController: new ListController(),
      listConfig: {
        loadList: true,
        pageParams: { pageIndex: 1, pageSize: 10 },
        requestFun: this.requestFun
      },
      searchFormConfig: {
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
            props: {
              prop: 'mSelect'
            },
            elemOptions: {
              type: 'registered',
              elem: 'mSelect',
              props: {
                placeholder: '输入mSelect',
                multiple: true,
                filterable: true,
                remote: true,
               'collapse-tags': true,
                options: [
                  {
                    label: 'option1-string',
                    value: 'string'
                  },
                  {
                    label: 'option2-number',
                    value: 1
                  },
                  {
                    label: 'option3-boolean',
                    value: true
                  }
                ],
                remoteMethod: async function (e) {
                  let returnData = [
                    {
                      value: 'test1',
                      label: 'test1'
                    },
                    {
                      value: 'test2',
                      label: 'test2'
                    },
                    {
                      value: 'test3',
                      label: 'test3'
                    },
                    {
                      value: 'test4',
                      label: 'test4'
                    },
                    {
                      value: 'test5',
                      label: 'test5'
                    }
                  ];
                  return e ? returnData : [];
                }
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
                    code: this.create
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
              elem: ({ h, injectData: { mFormCtrl, mListCtrl } }) => {
                return (
                  <el-button
                    onClick={async () => {
                      await mFormCtrl.reset();
                      mListCtrl.getList();
                    }}
                  >
                    重置
                  </el-button>
                );
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
      },
      tableConfig: {
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
                    code: this.editRow,
                    option: {
                      size: 'mini',
                      type: 'primary'
                    },
                    'option.size': null,
                    'option.type': null
                  },
                  {
                    name: '删除',
                    code: this.deleteRow,
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
      },
      userdialogCtrl: new MPopupController({
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
        },
        elemOptions: {
          type: 'slot',
          elem: 'default'
        }
      }),
      userFormCtrl: new MFormController({
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
                    code: this.saveRow
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
      })
    };
  },
  methods: {
    async requestFun({ pageParams, searchParams }) {
      console.log('basicExample requestFun>>>:', pageParams, searchParams);
      let {
        data: { list, total }
      } = await getUserList({ ...pageParams });
      return { list, total };
    },

    async create({ injectData: { mFormCtrl, mFormDialogCtrl, mListCtrl } }) {
      try {
        await this.userdialogCtrl.open({ tag: 'create' });
        await mListCtrl.getList();
      } catch (error) {
        console.log('create', error);
      }
    },

    async deleteRow({ injectData: { mListCtrl }, props: { data } }) {
      try {
        await deleteUser(data.id);
        await mListCtrl.getList();
      } catch (error) {
        console.log('deleteRow', error);
      }
    },

    async editRow({ injectData: { mListCtrl }, props: { data } }) {
      try {
        await this.$refs['userDialog'].open({ tag: 'edit', data });
        await mListCtrl.getList();
      } catch (error) {
        console.error('editRow', error);
      }
    },

    async saveRow({ injectData: { mFormCtrl, mFormDialogCtrl, mListCtrl } }) {
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
          res = await createUser(params);
        } else {
          res = await updateUser({ ...params, id });
        }

        mFormDialogCtrl.openResolve(res);
        mFormDialogCtrl.clear();
      } catch (error) {
        console.error('saveRow', error);
      }
    },

    async refrash() {
      this.listController.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  &__search {
    height: 100px;
    width: 100%;
    background: rgb(208, 206, 206);
  }

  &__list {
    flex: 1;
    overflow: hidden;
  }

  &__paging {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(194, 194, 193);
  }
}
</style>
