<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-04-30 22:31:17
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-form-dialog/src/mian.vue
-->
<template>
  <div class="book-dialog">
    <el-dialog
      class="list-dialog"
      :before-close="
        () => {
          reject();
          close();
        }
      "
      :visible.sync="presentationOption.option.visible"
      v-bind="presentationOption.option"
      custom-class="m-dialog"
      center
    >
      <div class="list-dialog__container">
        <MFormGenerator ref="form" class="MFormGenerator" :form-option="presentationOption.formOption" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { MFormGenerator } from '../../m-form-generator/index';
export default {
  name: 'MFormDialog',
  components: {
    MFormGenerator
  },
  props: {
    presentationOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    // 打开对话框
    async openDialog({ type = 'create', dialogData = {} }) {
    },

    // 重置表单
    resetForm() {
 
    },

    // 清空表单
    clearForm() {

    },

    // 点击
    close() {

    },

    // 重置
    resetDialog() {

    },

    // 提交
    submit(extraData) {
  
    }
  }
};
</script>

<style lang="scss" scoped>
.list-dialog {
  ::v-deep {
    .m-dialog {
      display: flex;
      flex-direction: column;
      .el-dialog__header {
        height: 60px;
      }
      .el-dialog__body {
        max-height: calc(80vh - 60px);
        overflow: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          display: none;
        }
        .list-dialog__container {
          height: 100%;
        }
      }

      // 手机屏幕
      @media screen and (max-width: 990px) {
        width: 90vw !important;
        max-height: 90vh !important;
        margin-top: 5vh !important;
        .form-item-box {
          width: 100%;
        }
      }

      // 电脑屏幕
      @media screen and (min-width: 990px) {
        width: 80vw !important;
        max-height: 80vh !important;
        margin-top: 10vh !important;
        .form-item-box {
          width: 45%;
        }
      }
    }
  }

  .list-dialog__container {
    .m-form {
      ::v-deep {
        .title {
          height: 35px;
          background-color: #ecf8ff;
          line-height: 35px;
          background-color: #ecf8ff;
          border-radius: 4px;
          border-left: 5px solid #50bfff;
          margin: 20px 0;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
