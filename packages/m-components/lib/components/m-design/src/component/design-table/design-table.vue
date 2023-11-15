<template>
  <el-tabs type="border-card">
    <el-tab-pane label="元素">
      <div class="design-table">
        <div class="design-table__drop-in">
          <MList v-bind="config.listConfig">
            <template #search>
              <MFormGenerator
                :config="config.searchFormConfig"
                @deleteItem="deleteFormItem"
                @editItem="editFormItem"
              />
            </template>
            <template #table="{ list }">
              <MTableGenerator
                :config="config.tableConfig"
                :list="list"
                @deleteItem="deleteTableItem"
                @editItem="editTableItem"
              />
            </template>
            <template #pagination="{ handlePageOrSizeChange, pageParams, total }">
              <el-pagination
                :page-size="pageParams.pageSize"
                :current-page="pageParams.pageIndex"
                :total="total"
                :page-sizes="[10, 30, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="(pageSize) => handlePageOrSizeChange({ pageSize })"
                @current-change="(pageIndex) => handlePageOrSizeChange({ pageIndex })"
              />
            </template>
            <MPopupGenerator
              v-for="(config, key, i) in config.dialogConfig"
              :ref="setDialogRef(key)"
              :key="i"
              :config="config"
            />
          </MList>
        </div>
        <div class="design-table__dragge-out">
          <el-tabs type="border-card">
            <el-tab-pane label="元素">
              <designTableDraggeOut :fields="besicData.elemFields" />
            </el-tab-pane>
            <el-tab-pane label="列表设置"> </el-tab-pane>
          </el-tabs>
        </div>

        <MPopupGenerator
          v-for="(config, key, i) in besicData.dialogConfig"
          :ref="setDialogRef(key)"
          :key="i"
          :config="config"
        />
      </div>
    </el-tab-pane>
    <el-tab-pane label="列表设置">
      <MFormGenerator v-model="config.listConfig" :config="besicData.mListSettingForm" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Sortable from 'sortablejs';
import { cloneDeep, uniqueId } from 'lodash-es';
import designTableDraggeOut from './design-table-dragge-out';
import { MList } from '../../../../m-list/index';
import { MTableGenerator } from '../../../../m-table/m-table-generator/index';
import { MFormGenerator } from '../../../../m-form/m-form-generator/index';
import { MPopupGenerator } from '../../../../m-popup/m-popup-generator';
import { deepMerge } from '../../../../m-utils';
import { getTableColumnFields, getFormItemFields, besicData } from './config';

export default {
  components: {
    designTableDraggeOut,
    MList,
    MTableGenerator,
    MFormGenerator,
    MPopupGenerator
  },
  data() {
    return {
      besicData,
      config: {
        listConfig: {
          loadList: true,
          pageParams: { pageIndex: 1, pageSize: 10 },
          requestFun: async ({ pageParams, searchParams }) => {
            const list = [{}];
            const total = 1;
            return { list, total };
          }
        },
        searchFormConfig: {
          props: {
            ref: 'form',
            size: 'mini',
            labelWidth: '80px'
          },
          fields: [
            {
              props: {
                label: 'name:',
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
                labelWidth: '0px'
              },
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
                    },
                    {
                      name: '重置',
                      code: async ({ injectData: { mFormCtrl } }) => {
                        try {
                          mFormCtrl.reset();
                        } catch (error) {
                          console.log('重置', error);
                        }
                      }
                    },
                    {
                      name: '搜索',
                      code: async ({ injectData: { mListCtrl } }) => {
                        try {
                          mListCtrl.handleSearch();
                        } catch (error) {
                          console.log('搜索', error);
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        },
        tableConfig: {
          props: {
            border: true,
            height: '200px'
          },
          on: {
            'cell-dblclick': (row, column, cell, event) => {
              const index = Array.prototype.indexOf.call(cell.parentNode.children, cell);
              console.log(this.config.tableConfig.fields[index]);
            }
          },
          fields: [
            {
              props: {
                label: 'gender',
                prop: 'gender'
              },
              elemOptions: {
                type: 'registered',
                elem: 'el-switch',
                props: {
                  disabled: true,
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
                label: 'address',
                prop: 'address'
              }
            }
          ]
        }
      },
      dialogs: {}
    };
  },
  mounted() {
    this.initColumnDrop();
    this.initFormDrop();
  },
  methods: {
    // 列拖动
    initColumnDrop() {
      // 接受列表
      const wrapperTr = document.querySelector('.design-table .el-table__header-wrapper tr');
      Sortable.create(wrapperTr, {
        group: 'shared',
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;
          let tempList = cloneDeep(this.config.tableConfig.fields);
          const oldItem = tempList.splice(oldIndex, 1)[0];
          tempList.splice(newIndex, 0, oldItem);
          this.config.tableConfig.fields = [];
          this.$nextTick(() => {
            this.config.tableConfig.fields = tempList;
          });
        },
        onAdd: (evt) => {
          // same properties as onEnd
          const { newDraggableIndex, oldDraggableIndex } = evt;
          let tempList = cloneDeep(this.config.tableConfig.fields);
          let {
            elemOptions,
            props: { label, prop = uniqueId('prop_') }
          } = cloneDeep(this.besicData.elemFields[oldDraggableIndex]);

          const insertItem = {
            props: {
              label,
              prop
            },
            elemOptions
          };
          tempList.splice(newDraggableIndex, 0, insertItem);
          wrapperTr.removeChild(evt.item);

          this.config.tableConfig.fields = [];
          this.$nextTick(() => {
            this.config.tableConfig.fields = tempList;
          });
        }
      });
    },

    initFormDrop() {
      // 接受列表
      const wrapperTr = document.querySelector(
        '.design-table .design-table__drop-in .m-form-generator__inner'
      );
      Sortable.create(wrapperTr, {
        group: 'shared',
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          console.log('onEnd>>', evt);
          const { oldIndex, newIndex } = evt;
          let tempList = cloneDeep(this.config.searchFormConfig.fields);
          const oldItem = tempList.splice(oldIndex, 1)[0];
          tempList.splice(newIndex, 0, oldItem);
          this.config.searchFormConfig.fields = [];
          this.$nextTick(() => {
            this.config.searchFormConfig.fields = tempList;
          });
        },
        onAdd: (evt) => {
          // same properties as onEnd
          const { newDraggableIndex, oldDraggableIndex } = evt;
          let tempList = cloneDeep(this.config.searchFormConfig.fields);
          let {
            elemOptions,
            props: { prop = uniqueId('prop_'), label }
          } = cloneDeep(this.besicData.elemFields[oldDraggableIndex]);

          const insertItem = {
            props: {
              label,
              prop
            },
            itemBoxStyle: {
              width: '200px',
              paddingRight: '10px'
            },
            elemOptions
          };
          tempList.splice(newDraggableIndex, 0, insertItem);
          wrapperTr.removeChild(evt.item);

          this.config.searchFormConfig.fields = [];
          this.$nextTick(() => {
            this.config.searchFormConfig.fields = tempList;
          });
        }
      });
    },

    setDialogRef(k) {
      this.$nextTick(() => {
        this.dialogs[k] = this.$refs[k][0];
      });
      return k;
    },

    // table-column
    deleteTableItem({ index }) {
      this.config.tableConfig.fields.splice(index, 1);
    },

    async editTableItem({ index, field }) {
      this.besicData.dialogConfig.tableColumn.elemOptions.props.config.fields =
        getTableColumnFields(field.elemOptions.elem);
      await this.$nextTick();

      const changedField = await this.dialogs.tableColumn.open({ tag: 'edit', data: field });
      let tempList = cloneDeep(this.config.tableConfig.fields);
      deepMerge(tempList[index], changedField);
      this.config.tableConfig.fields = [];
      await this.$nextTick();
      this.config.tableConfig.fields = tempList;
    },

    // form-item
    deleteFormItem({ index }) {
      this.config.searchFormConfig.fields.splice(index, 1);
    },

    async editFormItem({ index, field }) {
      this.besicData.dialogConfig.formItem.elemOptions.props.config.fields = getFormItemFields(
        field.elemOptions.elem
      );
      await this.$nextTick();

      const changedField = await this.dialogs.formItem.open({ tag: 'edit', data: field });
      let tempList = cloneDeep(this.config.searchFormConfig.fields);
      deepMerge(tempList[index], changedField);
      this.config.searchFormConfig.fields = [];
      await this.$nextTick();
      this.config.searchFormConfig.fields = tempList;
    }
  }
};
</script>

<style scoped lang="scss">
.design-table {
  display: flex;
  height: 400px;
  width: 100%;
  &__drop-in {
    width: 80%;
    .dragge-out__item {
      height: 20px !important;
    }
    ::v-deep {
      .m-table-item,
      .m-form-item {
        &__delete,
        &__edit {
          display: block;
        }
      }
    }
  }

  &__dragge-out {
    width: 20%;
  }
}
</style>

<style>
.design-table__drop-in .sortable-ghost {
  height: 20px !important;
}
</style>
