<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-05-31 14:28:43
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-form\m-form-designer\src\designer-popover\src\mian.vue
-->
<template>
  <div class="m-form-designer-popover" :style="{ width: '100%'}">
    <slot :formData="formOption.formData" />
    <el-popover placement="bottom" width="300" trigger="click">
      <MFormGenerator ref="form" class="MFormGenerator" :form-option="formOption" />
      <div slot="reference" class="edit-btn"><i class="el-icon-edit" /></div>
    </el-popover>
    <div class="delete-btn" @click="$emit('delete')"><i class="el-icon-delete" /></div>
  </div>
</template>

<script>
/* eslint-disable */
import { FormOption } from '../../../../../m-models/index';
import { MFormGenerator, MDynamicField } from '../../../../m-form-generator/index';
export default {
  name: 'MFormDesignerPopover',
  components: {
    MFormGenerator,
    MDynamicField
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    MDynamicFields: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  created() {
    this.formOption = new FormOption({
      option: {
        size: 'mini',
        labelWidth: '100px'
      },
      formData: this.formData,
      MDynamicFields: this.MDynamicFields
    });
  },
  data() {
    return {
      visible: false
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.m-form-designer-popover {
  height: fit-content;
  min-height: 40px;
  position: relative;
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