<!--
 * @Date: 2023-05-29 11:24:04
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-10-25 09:13:15
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-form\m-form-dialog\src\mian copy.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-04-30 10:26:04
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
      :visible.sync="isShow"
      v-bind="dialogOption.dialogAtter"
      custom-class="m-dialog"
      center
    >
      <div class="list-dialog__container" />
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { FormOption } from '../../m-form-generator/index';

export default {
  name: 'MFormDialog',
  components: {
  },
  props: {
    dialogForm: {
      type: Object,
      default: () => {
        return new FormOption({});
      }
    }
  },
  data() {
    return {
      formItems: [],
      formData: {},
      formOriginData: null,
      formStatus: 'create', // create、 edit
      resolve: null,
      reject: null,
      isShow: false
    };
  },
  methods: {
    // 打开对话框
    async openDialog({ type = 'create', dialogData = {} }) {
      const promise = new Promise((resolve, reject) => {
        // eslint-disable-next-line prefer-const
        let { originFormItems, originFormData } = this.dialogOption.generateFormItems({
          that: this,
          openDialogData: dialogData
        });

        for (let item of originFormItems) {
          if (item.prop) {
            if (['auth', 'check'].includes(type)) {
              item.disabled = true;
            }

            // 当dialogData的模型和formitems的一致时可以取巧，不一致的时候还是要一个个设置
            const dialogDataValue = this._.get(dialogData, item.prop);
            let setValue = !CommonUtils.isEmpty(dialogDataValue)
              ? dialogDataValue
              : item.defaultValue;
            this._.set(originFormData, item.prop, setValue);
          }
        }

        this.formItems = originFormItems;
        this.formData = originFormData;
        this.formOriginData = { ...dialogData };
        this.formStatus = type;
        this.resolve = resolve;
        this.reject = reject;
        this.isShow = true;
      });
      return promise;
    },

    // 重置表单
    resetForm() {
      for (let item of this.formItems) {
        if (item.prop) {
          // 当dialogData的模型和formitems的一致时可以取巧，不一致的时候还是要一个个设置
          const dialogDataValue = this._.get(this.formOriginData, item.prop);
          let setValue = !CommonUtils.isEmpty(dialogDataValue)
            ? dialogDataValue
            : item.defaultValue;
          this._.set(this.formData, item.prop, setValue);
        }
      }
    },

    // 清空表单
    clearForm() {
      for (let item of this.formItems) {
        if (item.prop) {
          // 当dialogData的模型和formitems的一致时可以取巧，不一致的时候还是要一个个设置
          let setValue = item.defaultValue;
          this._.set(this.formData, item.prop, setValue);
        }
      }
    },

    // 点击
    close() {
      this.$nextTick(() => {
        this.resetDialog();
      });
    },

    // 重置
    resetDialog() {
      this.formItems = [];
      this.formData = {};
      this.formOriginData = {};
      this.formStatus = 'create';
      this.resolve = null;
      this.reject = null;
      this.isShow = false;
    },

    // 提交
    submit(extraData) {
      this.$refs[this.dialogOption.ref]
        .validate()
        .then(async (res) => {
          let submitInterceptor;
          switch (this.formStatus) {
            case 'create':
              submitInterceptor = this.dialogOption.createInterceptor;
              break;
            case 'edit':
              submitInterceptor = this.dialogOption.editInterceptor;
              break;
            case 'auth':
              submitInterceptor = this.dialogOption.authInterceptor;
              break;
          }
          // eslint-disable-next-line prefer-const
          let {
            params,
            api,
            message,
            resolveData = {}
          } = submitInterceptor(this.formOriginData, this.formData, extraData);
          if (api) {
            resolveData = await api(params);
            message && this.$message.success(message);
          }
          this.resolve(resolveData);
          this.dialogOption.submitSuccess();
          this.close();
        })
        .catch((err) => {
          console.log('表单检验失败', err);
          this.$message.error(`提交失败: ${err.message}`);
        });
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
