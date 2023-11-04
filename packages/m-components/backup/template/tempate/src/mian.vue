<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-06-17 15:53:21
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-form-designer/src/mian.vue
-->
<template>
  <div class="m-form-designer">
    <!-- 展示面板 -->
    <div class="m-form-designer__generated">
      <!-- // 查询表单 -->
      <div class="designer-item form-items">
        <div class="designer-title">search-form-items</div>
        <el-form
          v-if="formOption"
          :ref="formOption.ref"
          class="form-items__body"
          :model="formOption.formData"
          v-bind="formOption.option"
        >
          <div class="form-items__inner">
            <draggable
              v-model="formOption.MDynamicFields"
              class="draggable-inner"
              :group="{ name: 'people', pull: 'clone' }"
              draggable=".form-area__item"
            >
              <div
                class="form-area__item"
                v-for="(dynamicField, index) of formOption.MDynamicFields"
                :key="dynamicField.id"
                :style="{ width: dynamicField.width }"
              >
                <div class="status_bar">
                  <!-- 编辑 -->
                  <MFormPopover
                    :formData.sync="formOption.MDynamicFields[index]"
                    :MDynamicFields="getItemForm(dynamicField.element)"
                  >
                    <div class="edit-btn"><i class="el-icon-edit" /></div>
                  </MFormPopover>

                  <!-- // 删除 -->
                  <div @click="deleteFormItemsChange(index)" class="delete-btn">
                    <i class="el-icon-delete" />
                  </div>
                </div>
                <div class="content">
                  <MDynamicField :m-dynamic-field="formOption.MDynamicFields[index]" />
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
              <div class="status_bar">
                <!-- 编辑 -->
                <MFormPopover
                  :formData.sync="editFields[index]"
                  :MDynamicFields="getItemForm(dynamicField.element)"
                >
                  <div class="edit-btn"><i class="el-icon-edit" /></div>
                </MFormPopover>

                <!-- // 删除 -->
                <!-- <div @click="deleteTableListItem(index)" class="delete-btn">
                    <i class="el-icon-delete" />
                  </div> -->
              </div>
              <div class="content">
                <MDynamicField :m-dynamic-field="editFields[index]" />
              </div>
            </div>
          </draggable>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { MDynamicField } from '../../m-form/m-form-generator/index';
import draggable from 'vuedraggable';
import MDesignerFormDropDown from '../../m-form/m-form-designer/src/designer-form-dropdown/mian.vue';
import { MFormPopover } from '../../m-form-popover/index.js';
import { DynamicFieldOption, getItemForm, FormOption } from '../../m-models/index';

export default {
  name: 'MFormDesigner',
  components: {
    MDynamicField,
    draggable,
    MDesignerFormDropDown,
    MFormPopover
  },
  provide() {
    return {};
  },
  props: {
    formJsonStr: {
      type: String,
      default: ''
    }
  },
  watch: {
    formJsonStr: {
      immediate: true,
      handler(val) {
        if ([undefined, null].includes(val) || typeof val != 'string') {
          this.formOption = new FormOption({});
          return;
        }
        try {
          const formSetting = JSON.parse(val);
          this.formOption = new FormOption(formSetting);
        } catch (error) {
          console.log('解析失败');
        }
      }
    }
  },
  data() {
    return {
      // importData
      formOption: new FormOption({}),

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
      this.formOption.MDynamicFields.splice(oldIndex, 1);
    },
    exportJson() {
      return this.formOption.exportSetting();
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
      height: 100%;

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
              .status_bar {
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
      }
    }
  }

  &__pannel {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .pannel-item {
      display: flex;
      flex-direction: column;
      border: 1px dashed #409eff;
      width: 100%;

      .status_bar {
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
</style>
