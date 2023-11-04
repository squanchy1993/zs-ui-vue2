<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-07-15 18:54:05
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-list/m-list-designer/src/index/src/mian.vue
-->
<template>
  <div class="m-form-designer">
    <!-- 展示面板 -->
    <div class="m-form-designer__generated">
      <!-- // 查询表单 -->
      <div class="designer-item form-items">
        <div class="designer-title">search-form-items1</div>
        <el-form
          v-if="tableFormOption"
          :ref="tableFormOption.ref"
          class="form-items__body"
          :model="tableFormOption.formData"
          v-bind="tableFormOption.option"
        >
          <div class="form-items__inner">
            <draggable
              v-model="tableFormOption.MDynamicFields"
              class="draggable-inner"
              :group="{ name: 'people', pull: 'clone' }"
              draggable=".form-area__item"
            >
              <div
                class="form-area__item"
                v-for="(dynamicField, index) of tableFormOption.MDynamicFields"
                :key="dynamicField.id"
                :style="{width: dynamicField.width}"
              >
                <div class="status_bar">
                  <!-- 编辑 -->
                  <MFormPopover
                    :formData.sync="tableFormOption.MDynamicFields[index]"
                    :MDynamicFields="getItemForm(dynamicField.element)"
                  >
                    <div class="edit-btn"><i class="el-icon-edit" /></div>
                  </MFormPopover>

                  <!-- // 删除 -->
                  <div @click="deleteTableListItem(index)" class="delete-btn">
                    <i class="el-icon-delete" />
                  </div>
                </div>
                <div class="content">
                  <MDynamicField :m-dynamic-field="tableFormOption.MDynamicFields[index]" />
                </div>
              </div>
            </draggable>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 设置面板 -->
    <div class="m-form-designer__pannel">
      <!-- 表单设置 -->
      <div class="designer-item form-items">
        <div class="designer-title">form-items</div>
        <el-form class="form-items-area" :model="{}" size="mini" label-width="80px">
          <draggable
            class="list-group"
            :list="editFields"
            :group="{ name: 'people', pull: 'clone', put: false }"
            :clone="DynamicFieldClone"
          >
            <div
              v-for="(dynamicField, index) of editFields"
              :key="dynamicField.id"
              class="pannel-item"
            >
              <MDesignerFormDropDown
                :formData.sync="editFields[index]"
                :MDynamicFields="getItemForm(dynamicField.element)"
              >
                <template slot-scope="{ formData }">
                  <MDynamicField :m-dynamic-field="formData" />
                </template>
              </MDesignerFormDropDown>
            </div>
          </draggable>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { MDynamicField } from '../../../../../m-form/m-form-generator/index';
import draggable from 'vuedraggable';
import { MTableField } from '../../../../m-table-field/index';
import MDesignerFormDropDown from '../../../../../m-form/m-form-designer/src/designer-form-dropdown/mian.vue';
import MFormDesignerPopover from '../../../../../m-form/m-form-designer/src/designer-form-popover/mian.vue';
import { MFormPopover } from '../../../../../m-form-popover/index.js';

import { DynamicFieldOption, getItemForm, FormOption } from '../../../../../m-models/index';

export default {
  name: 'MListDesigner',
  components: {
    MDynamicField,
    draggable,
    MTableField,
    MDesignerFormDropDown,
    MFormPopover,
    MFormDesignerPopover
  },
  provide() {
    return {
      listPresentationOption: this.listPresentationOption
    };
  },
  props: {
    tableFormJsonStr: {
      type: String,
      default: null
    }
    // tableListJsonStr: {
    //   type: String,
    //   default: null
    // },
  },
  watch: {
    tableFormJsonStr: {
      handler(val) {
        if ([undefined, null].includes(val) || typeof val != string) {
          return;
        }
        this.tableFormOption = new FormOption(val);
      }
    }
  },
  data() {
    return {
      // importData
      tableFormOption: new FormOption({}),

      // formItem
      editFields: [
        new DynamicFieldOption({
          label: 'el-input',
          prop: 'el-input',
          elType: 'registered',
          element: 'el-input',
          required: false,
          defaultValue: 'label',
          width: '100%',
          option: {
            placeholder: ''
          }
        }),
        new DynamicFieldOption({
          label: 'el-switch',
          prop: 'props',
          elType: 'registered',
          element: 'el-switch',
          required: false,
          defaultValue: 'label',
          width: '100%',
          option: {
            placeholder: ''
          }
        })
      ],

      deleteList: [],
      generatedDragging: false,
      flagValue: [],
      getItemForm
    };
  },
  methods: {
    DynamicFieldClone(el) {
      let { id, ...others } = el;
      return new DynamicFieldOption(JSON.parse(JSON.stringify(others)));
    },
    deleteFormItemsChange(oldIndex) {
      this.tableFormOption.MDynamicFields.splice(oldIndex, 1);
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
    }
  }

  &__generated {
    width: 70%;
    display: flex;
    flex-direction: column;

    .form-items {
      display: flex;
      flex-direction: column;
      height: 65%;

      &__body {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;

        .form-items__inner {
          width: 100%;
          height: 100%;
          overflow: scroll;

          &::-webkit-scrollbar {
            display: none;
          }

          .draggable-inner {
            width: 100%;
            height: 300px;
            display: flex;
            justify-content: flex-start;
            align-content: flex-start;
            flex-wrap: wrap;

            .form-area__item {
              width: 100%;
              height: fit-content;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              border: 1px dashed #409eff;
              position: relative;
              box-sizing: border-box;
              user-select: none;
              .status_bar{
                width: 100%;
                height: 14px;
                display: flex;
                justify-content: flex-end;
                align-content: flex-end;
                background: #c2e4e2;
    border: 1px solid #34e8cd;
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
              }
            }
          }
        }

        .delete-area {
          width: 100%;
          height: 50px;

          .delete-area__inner {
            width: 100%;
            height: 100%;
            background: #f56c6c;

            .draggable-inner {
              width: 100%;
              height: 100%;
              font-size: 24px;
              position: relative;

              .icon {
                position: absolute;
                top: calc(50% - 12px);
                color: #fff;
              }
            }
          }
        }
      }
    }

    .table-items {
      width: 100%;
      height: 35%;

      .draggable-inner {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;

        .draggable-item {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 50px;
          border: 1px dotted rgb(50, 90, 151);

          .draggable-item__inner {
            user-select: none;
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;

            .left {
              width: 90%;

              .title {
                width: 100%;
                line-height: 14px;
                font-size: 12px;
                text-align: left;
              }
            }

            .right {
              height: 100%;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .edit-btn,
              .delete-btn {
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
              }

              .edit-btn {
                background: #4182d7;
              }

              .delete-btn {
                background: #f56c6c;
              }
            }
          }
        }
      }
    }

    .form-buttons {
      width: 100%;
      height: 100px;

      // background: red;
      &__body {
        // height: 54px;
        height: 100%;

        .draggable-inner {
          height: 100%;
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
  }

  &__pannel {
    width: 30%;
    display: flex;
    flex-direction: column;

    .pannel-item {
      display: flex;
      flex-direction: column;
    }

    // .dialog-setting {
    //   width: 100%;
    // }

    // .form-setting {
    //   width: 100%;

    //   ::v-deep {
    //     .el-select {
    //       width: 100%;
    //     }
    //   }
    // }

    .form-items {
      height: 65%;

      .form-items-area {
        height: 100%;
        overflow: scroll;

        .title {
          font-size: 12px;
          text-align: left;
        }
      }
    }

    .table-items {
      height: 35%;

      .table-items-area {
        height: 100%;
        overflow: scroll;

        .title {
          font-size: 12px;
          text-align: left;
        }
      }
    }
  }
}
</style>
