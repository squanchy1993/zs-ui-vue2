<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-06-04 19:48:20
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-form/m-form-designer/src/designer-button/mian.vue
-->
<template>
  <div class="m-form-designer-button">
    <el-popover placement="top" width="500" trigger="click">
      <el-button slot="reference">{{ buttonOption.name }}</el-button>
      <MFormGenerator class="MFormGenerator" :form-option.sync="formOption" />
    </el-popover>
    <div v-show="showDelete" class="delete-btn" @click="$emit('delete')">
      <i class="el-icon-delete" />
    </div>
  </div>
</template>

<script>
import { FormOption, DynamicFieldOption } from '../../../../m-models/index';
import { MFormGenerator } from '../../../m-form-generator/index';
import DesigerCodeEdit from '../desinger-code-edit/index.vue';
/* eslint-disable */
export default {
  inject: ['presentationOption'],
  name: 'MFormDesignerBotton',
  components: {
    MFormGenerator,
    DesigerCodeEdit
  },
  props: {
    buttonOption: {
      type: Object,
      default: () => {
        return {};
      }
    },
    showDelete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      formOption: new FormOption({
        option: {
          size: 'mini',
          labelWidth: '100px'
        },
        formData: this.buttonOption,
        MDynamicFields: [
        new DynamicFieldOption({
            label: 'name',
            prop: 'name',
            elType: 'registered',
            element: 'el-input',
            required: false,
            defaultValue: null,
            width: '100%',
            option: {
              placeholder: '请输入name'
            }
          }),
          new DynamicFieldOption({
            label: 'code',
            prop: 'code',
            elType: 'registered',
            element: DesigerCodeEdit,
            required: false,
            defaultValue: null,
            width: '100%',
            option: {
              placeholder: '请输入name'
            }
          }),
        ]
      })
    };
  },
  computed: {
    formFlagOptions() {
      return this.presentationOption.formFlags.map((item) => ({ label: item, value: item }));
    }
  },
  watch: {
    formFlagOptions: {
      immediate: true,
      handler(val) {
        this.formOption.MDynamicFields[2].option.list = val;
        this.formOption.MDynamicFields[3].option.list = val;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m-form-designer-button {
  position: relative;
  margin-right: 5px;
  .edit-btn,
  .delete-btn {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: absolute;
  }
  .edit-btn {
    background: #4182d7;
    right: 0;
    bottom: 0;
  }

  .delete-btn {
    background: #f56c6c;
    right: 0;
    top: 0;
  }
  .MFormGenerator {
    :v-deep {
      .el-form-item {
        font-size: 12px;
      }
    }
  }
}
</style>
