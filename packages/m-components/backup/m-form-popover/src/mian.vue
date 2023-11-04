<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-09-26 16:53:09
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-form\m-form-popover\src\mian.vue
-->
<template>
  <div class="m-form-designer-popover" :style="{ width: 'fit-content' }">
    <el-popover placement="left-end" width="300" trigger="click">
      <slot slot="reference" formData="formOption.formData" />
      <!-- <slot name="editBtn" slot="reference" /> -->
      <MFormGenerator
        ref="form"
        class="MFormGenerator"
        :form-option="formOption"
        :form-data="formData"
      />
    </el-popover>
  </div>
</template>

<script>
/* eslint-disable */
import { MFormGenerator, FormOption } from '@lib/index.js'
export default {
  name: 'MFormPopover',
  components: {
    MFormGenerator
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
    this.formOption.setOption({
      option: {
        size: 'mini',
        labelWidth: '100px'
      },
      MDynamicFields: this.MDynamicFields
    });
  },
  data() {
    return {
      visible: false,
      formOption: new FormOption({})
    };
  },
  mounted() {},
  methods: {
    toggle() {
      this.visible = !this.visible;
    }
  }
};
</script>

<style lang="scss" scoped>
.m-form-designer-popover {
  height: fit-content;
  // min-height: 40px;
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
