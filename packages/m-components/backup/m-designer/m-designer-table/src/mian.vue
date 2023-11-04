<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-08-20 17:57:13
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-table-designer-cell/src/mian.vue
-->
<template>
  <div class="m-form-designer">
    <!-- 展示面板 -->
    <div class="m-form-designer__generated">
      <!-- // 查询表单 -->
      <!-- 列表 -->
      <div class="designer-item table-items">
        <div class="designer-title">table-items</div>
        <div class="designer-body">
          <el-table :data="showTableData" style="width: 100%" v-bind="tableOption.option">
            <el-table-column
              v-for="(mTableFieldOption, index) of tableOption.fields"
              :key="index"
              v-bind="mTableFieldOption.tableColumnOptions"
            >
              <template slot-scope="{ row }">
                <m-table-field :row="row" :tableFieldOptions="tableOption.fields[index]" />
              </template>
            </el-table-column>
          </el-table>
          <!-- 列表拖拽 -->
          <div class="table-set">
            <draggable
              style="height: 100px"
              class="draggable-inner"
              v-model="tableOption.fields"
              :group="{ name: 'table-item', pull: 'clone' }"
              draggable=".draggable-item"
            >
              <div
                class="draggable-item"
                v-for="(mTableFieldOption, index) of tableOption.fields"
                :key="mTableFieldOption.id"
              >
                <MFormPopover
                  style="width: 100%"
                  :formData.sync="tableOption.fields[index]"
                  :MDynamicFields="getItemForm(mTableFieldOption.element)"
                >
                  <el-tag size="small" @close="deleteTableListItem(index)" closable>{{
                    mTableFieldOption.tableColumnOptions.label
                  }}</el-tag>
                </MFormPopover>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>

    <!-- 设置面板 -->
    <div class="m-form-designer__pannel">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="tableCell" name="first">
          <div class="designer-item table-items">
            <el-form class="form-items table-items-area" :model="{}" size="mini" label-width="80px">
              <draggable
                class="list-group"
                :list="editTableFields"
                :group="{ name: 'table-item', pull: 'clone', put: false }"
                :clone="tableCellFieldClone"
              >
                <div
                  v-for="(mTableFieldOption, index) of editTableFields"
                  :key="index"
                  class="pannel-item"
                >
                  <div class="status_bar">
                    <span class="status_bar__title">{{ mTableFieldOption.element }}</span>
                    <!-- 编辑 -->
                    <MFormPopover
                      :formData.sync="editTableFields[index]"
                      :MDynamicFields="getItemForm(mTableFieldOption.element)"
                    >
                      <div class="edit-btn"><i class="el-icon-edit" /></div>
                    </MFormPopover>
                  </div>
                  <div class="content">
                    <m-table-field
                      :key="index"
                      :row="pannelTableData"
                      :tableFieldOptions="editTableFields[index]"
                    />
                  </div>
                </div>
              </draggable>
            </el-form></div
        ></el-tab-pane>
        <el-tab-pane label="tableOptions" name="second">
          <MFormGenerator ref="form" class="MFormGenerator" :form-option.sync="tableSetOption" />
          <div style="width: 100%; display: flex; flex-direction: start">
            <span style="width: 200px">setListFunc:</span> <MFormFieldCodeInput v-model="tableOption.requestFun"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { MDynamicField } from '../../m-form/m-form-generator/index';
import draggable from 'vuedraggable';
import { MTableField } from '../../m-table-field/index';
import MDesignerFormDropDown from '../../m-form/m-form-designer/src/designer-form-dropdown/mian.vue';
import { MFormPopover } from '../../m-form-popover/index.js';
import { MTableFieldModel, getItemForm, FormOption } from '../../m-models/index';
import { MFormGenerator } from '../../m-form/m-form-generator/index';
import { MTableGenerator } from '../../m-table-generator/index';
import { MFormFieldCodeButton } from '../../m-form-item-code-button/index';
import { MFormFieldCodeInput } from '../../m-form-item-code-input/index';

export default {
  name: 'MTableDesignerCell',
  components: {
    MDynamicField,
    draggable,
    MTableField,
    MDesignerFormDropDown,
    MFormPopover,
    MFormGenerator,
    MTableGenerator,
    MFormFieldCodeButton,
    MFormFieldCodeInput
  },
  provide() {
    return {};
  },
  props: {
    tableOption: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    // 编辑table其他项目
    this.tableSetOption.setOption({
      option: {
        size: 'mini',
        labelWidth: '100px'
      },
      formData: this.tableOption.option,
      MDynamicFields: getItemForm('el-table')
    });
  },
  data() {
    return {
      // tabelItem
      editTableFields: [
        new MTableFieldModel({
          elType: 'registered',
          element: 'MTableFieldText',
          defaultValue: 'text',
          tableColumnOptions: {
            label: 'MTableFieldText',
            prop: 'MTableFieldText'
          }
        }),
        new MTableFieldModel({
          elType: 'registered',
          element: 'MTableFieldButton',
          defaultValue: [
            {
              name: '编辑',
              code: "async (pageInstance, row) => {\n\ttry {\n  \tawait pageInstance.formInstance.open({ tag: 'edit', data: row });\n    pageInstance.tableInstance.getList();\n  } catch(error){\n    console.log('table button error>>', error)\n  \tconsole.error('table button error>> ', error)\n  }\n}",
              option: {
                size: 'mini',
                type: 'primary'
              },
              'option.size': null,
              'option.type': null
            },
            {
              name: '删除',
              code: "async (pageInstance, row) => {\n\ttry {\n    await this.$indexedDB.delete('users', row.id);\n    pageInstance.tableInstance.getList();\n  } catch(error){\n    console.log('table button error>>', error)\n  \tconsole.error('table button error>> ', error)\n  }\n}",
              option: {
                size: 'mini',
                type: 'danger'
              },
              'option.size': null,
              'option.type': null
            }
          ],
          tableColumnOptions: {
            label: 'MTableFieldButton',
            prop: 'MTableFieldButton'
          }
        })
      ],
      getItemForm,
      activeName: 'first',
      // 其他设置
      tableSetOption: new FormOption({}),
      test: {
        name: 'test',
        code: 'asdf',
        option: ''
      }
    };
  },
  computed: {
    showTableData() {
      let data = this.tableOption.fields.reduce((previse, cur) => {
        previse[cur.tableColumnOptions.prop] = cur.defaultValue || null;
        return previse;
      }, {});
      return [data];
    },
    pannelTableData() {
      let data = this.editTableFields.reduce((previse, cur) => {
        previse[cur.tableColumnOptions.prop] = cur.defaultValue || null;
        return previse;
      }, {});
      console.log(this.editTableFields);
      return data;
    }
  },
  methods: {
    tableCellFieldClone(el) {
      let { id, ...others } = el;
      return new MTableFieldModel(JSON.parse(JSON.stringify(others)));
    },
    deleteTableListItem(oldIndex) {
      this.tableOption.fields.splice(oldIndex, 1);
    },
    exportJson() {
      return this.tableOption.exportSetting();
    }
  }
};
</script>

<style lang="scss" scoped>
.m-form-designer {
  width: 100%;
  display: flex;
  height: 100%;

  &__generated,
  &__pannel {
    border: 1px solid #eee;
    height: 100%;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .designer-item {
      display: flex;
      flex-direction: column;
      position: relative;

      .designer-title {
        padding: 5px 10px;
        text-align: left;
        background: #eee;
      }
      .designer-body {
        padding: 16px;
      }
    }
  }

  &__generated {
    width: 70%;
    display: flex;
    flex-direction: column;
    ::v-deep {
      .el-table__append-wrapper {
        width: max-content;
      }
    }

    .table-items {
      width: 100%;
      height: 35%;
      display: flex;
      flex-direction: column;
      .designer-body {
        display: flex;
        flex-direction: column;
      }
      .table-set {
        height: 50px;
        width: 100%;
        margin-top: 20px;
        background-color: #eee;
        display: flex;
        .draggable-inner {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;

          .draggable-item {
            display: flex;
            align-items: center;
            height: 50px;
            margin-right: 5px;
          }
        }
      }
    }
  }

  &__pannel {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    ::v-deep {
      .el-tabs {
        height: 100%;
        display: flex;
        flex-direction: column;
        .el-tabs__content {
          flex: 1;
          .el-tab-pane {
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
          }
        }
      }
    }
    .pannel-item {
      display: flex;
      flex-direction: column;
      border: 1px dashed #409eff;
      width: 100%;

      .status_bar {
        width: calc(100% - 10px);
        height: 14px;
        display: flex;
        justify-content: space-between;
        align-content: flex-end;
        background: #c2e4e2;
        border: 1px solid #34e8cd;
        padding: 0 5px;
        &__title {
          line-height: 14px;
          font-size: 12px;
        }
        .edit-btn,
        .delete-btn {
          width: 14px;
          height: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          margin-left: 3px;
        }

        .edit-btn {
          background: #4182d7;
          font-size: 12px;
        }

        .delete-btn {
          background: #f56c6c;
          font-size: 12px;
        }
      }

      .content {
        width: 100%;
        padding: 5px;
      }
    }
  }
}
</style>
