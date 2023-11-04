<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-05-31 16:42:51
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-form\m-form-designer\src\designer-form-dropdown\mian.vue
-->
<template>
  <div class="m-form-designer-item">
    <div class="m-form-designer-item__header">
      <slot :formData="formOption.formData" />
    </div>
    <div class="m-form-designer-item__body">
      <el-collapse-transition>
        <MFormGenerator v-show="open" ref="form" :form-option="formOption" />
      </el-collapse-transition>
      <div class="collapse-btn" @click="open = !open">
        <i :class="[!open ? 'el-icon-caret-bottom' : 'el-icon-caret-top']" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { FormOption } from '../../../../m-models/index';
import { MFormGenerator } from '../../../../m-form/m-form-generator/index';

export default {
  name: 'MDesignerFormDropDown',
  components: {
    MFormGenerator,
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
      formOption: null,
      open: false
    };
  },
};
</script>

<style lang="scss" scoped>
.m-form-designer-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border: 1px dashed #409eff;
  box-sizing: border-box;
  &__body {
    display: flex;
    flex-direction: column;
    background-color: #fafafa;
    .collapse-btn {
      width: 100%;
      height: 10px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
