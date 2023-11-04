<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-05-31 16:50:13
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-form\m-form-designer\src\index\src\mian.vue
-->
<template>
  <div class="m-form-designer">
    <!-- 展示面板 -->
    <div class="m-form-designer__generated">
      <div class="designer-item form-items">
        <div class="designer-title">form-items</div>
        <el-form
          v-if="presentationOption.formOption"
          :ref="presentationOption.formOption.ref"
          class="form-items__body"
          :model="presentationOption.formOption.formData"
          v-bind="presentationOption.formOption.option"
        >
          <div class="form-items__inner">
            <draggable
              v-model="presentationOption.formOption.MDynamicFields"
              class="draggable-inner"
              :group="{ name: 'people', pull: 'clone' }"
              draggable=".form-area__item"
            >
              <MFormDesignerPopover
                v-for="(dynamicField, index) of presentationOption.formOption.MDynamicFields"
                :key="dynamicField.id"
                class="form-area__item"
                :formData.sync="presentationOption.formOption.MDynamicFields[index]"
                :MDynamicFields="getItemForm(dynamicField.element)"
                @delete="deleteFormItemsChange(index)"
              >
                <template slot-scope="{ formData }">
                  <MDynamicField :m-dynamic-field="formData" />
                </template>
              </MFormDesignerPopover>
            </draggable>
          </div>
        </el-form>
      </div>
      <div class="designer-item form-buttons">
        <div class="designer-title">form-buttons</div>
        <div class="form-buttons__body">
          <draggable
            v-model="presentationOption.formBtns"
            class="draggable-inner"
            :group="{ name: 'buttons', pull: 'clone' }"
            draggable=".form-area__item"
          >
            <MFormDesignerBotton
              v-for="(dynamicField, index) of presentationOption.formBtns"
              :key="index"
              class="form-area__item"
              :show-delete="true"
              :buttonOption.sync="presentationOption.formBtns[index]"
              @delete="deleteFormBtnsChange(index)"
            ></MFormDesignerBotton>
          </draggable>
        </div>
      </div>
    </div>

    <!-- 设置面板 -->
    <div class="m-form-designer__pannel">
      <!-- 弹框设置 -->
      <div class="designer-item dialog-setting">
        <div class="designer-title">dialog-settings</div>
        <div class="designer-body dialog-setting">
          <MFormDesignerPresentation :presentation-option.sync="presentationOption" />
        </div>
      </div>
      <!-- 标签设置 -->
      <div class="designer-item form-setting">
        <div class="designer-title">flag-settings</div>
        <div class="designer-body">
          <MFormDesignerFlag v-model="presentationOption.formFlags" />
        </div>
      </div>
      <!-- 表单设置 -->
      <div class="designer-item form-items">
        <div class="designer-title">form-items</div>
        <el-form class="form-items form-area" :model="{}" size="mini" label-width="80px">
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

      <!-- 按钮 -->
      <div class="designer-item form-buttons">
        <div class="designer-title">form-buttons</div>
        <div class="form-buttons__body">
          <draggable
            class="buttons-group"
            :list="buttonFields"
            :group="{ name: 'buttons', pull: 'clone', put: false }"
            :clone="
              (val) => {
                return JSON.parse(JSON.stringify(val));
              }
            "
          >
            <div v-for="(item, index) of buttonFields" :key="index" class="pannel-item">
              <MFormDesignerBotton
                :showDelete="false"
                :buttonOption.sync="buttonFields[index]"
              ></MFormDesignerBotton>
            </div>
          </draggable>
        </div>
      </div>

      <!-- <div class="title">showForm</div> -->
      <!-- <el-button @click="exprotJson">exprotJson</el-button>
      <el-button @click="open">showForm</el-button> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { MDynamicField } from '../../../../m-form-generator/index';
import { MFormDesignerPopover } from '../../designer-popover/index';
import { MFormDesignerPresentation } from '../../designer-presentation/index';
import MFormDesignerBotton from '../../designer-button/mian.vue';
import { MFormDialog } from '../../../../m-form-dialog/index';
import MFormDesignerFlag from '../../designer-flag/mian.vue';
import MDesignerFormDropDown from '../../designer-form-dropdown/mian.vue';

import { PresentationOption, DynamicFieldOption, getItemForm } from '../../../../../m-models/index';

import draggable from 'vuedraggable';

export default {
  provide() {
    return {
      presentationOption: this.presentationOption
    };
  },
  name: 'MFormDesigner',
  components: {
    MDynamicField,
    draggable,
    MFormDesignerPopover,
    MFormDesignerPresentation,
    MFormDialog,
    MFormDesignerBotton,
    MFormDesignerFlag,
    MDesignerFormDropDown
  },
  data() {
    return {
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
      buttonFields: [
        {
          name: '创建',
          code: '',
          flag: ['create']
        },
        {
          name: '修改',
          code: '',
          flag: ['edit']
        }
      ],
      deleteList: [],
      generatedDragging: false,
      flagValue: [],
      getItemForm
    };
  },
  props: {
    presentationOption: {
      type: Object,
      default: () => {
        return new PresentationOption({});
      }
    }
  },
  methods: {
    DynamicFieldClone(el) {
      let { id, ...others } = el;
      return new DynamicFieldOption(JSON.parse(JSON.stringify(others)));
    },
    deleteFormItemsChange(oldIndex) {
      this.presentationOption.formOption.MDynamicFields.splice(oldIndex, 1);
    },
    deleteFormBtnsChange(oldIndex) {
      this.presentationOption.formBtns.splice(oldIndex, 1);
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
      height: calc(100% - 100px);

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
            height: 500px;
            display: flex;
            justify-content: flex-start;
            align-content: flex-start;
            flex-wrap: wrap;

            .form-area__item {
              border: 1px dashed #409eff;
              height: fit-content;
              position: relative;
              box-sizing: border-box;

              .item-bottons {
                position: absolute;
                right: 0;
                top: 0;
                z-index: 999;
              }

              .item-inner {
                width: 100% !important;
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

    .dialog-setting {
      width: 100%;
    }

    .form-setting {
      width: 100%;

      ::v-deep {
        .el-select {
          width: 100%;
        }
      }
    }

    .form-items {
      flex: 1;
    }

    .form-buttons {
      height: 100px;

      &__body {
        .buttons-group {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
  }
}
</style>
