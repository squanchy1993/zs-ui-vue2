<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2022-11-01 13:48:44
 * @LastEditors: DESKTOP-58041OI\zzs squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: \zs-ui-vue\packages\m-form\lib\m-form-dialog\src\mian.vue
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
      <div class="list-dialog__container">
        <el-form v-if="isShow" :ref="dialogOption.ref" class="m-form" :model="formData" size="mini">
          <m-form-item
            :form-items.sync="formItems"
            :form-data.sync="formData"
            :form-item-class="'dialogFormItem'"
          />
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { MFormItem } from '../../m-form-item/index';
import { DialogOptionModel } from './model';
import { CommonUtils } from '@zs-ui-vue/shared';

export default {
  name: 'MFormDialog',
  components: {
    MFormItem
  },
  props: {
    dialogOption: {
      type: Object,
      default: () => {
        return new DialogOptionModel({});
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
          let setValue = item.defaultValue
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
      // 手机屏幕
      @media screen and (max-width: 990px) {
        // 详情弹框的宽度
        width: 90%;
        .form-item-box {
          width: 100%;
        }
      }

      // 电脑屏幕
      @media screen and (min-width: 990px) {
        // 详情弹框的宽度
        width: 600px;
        .form-item-box {
          width: 45%;
        }
      }
    }
  }

  .list-dialog__container {
    max-height: 60vh;
    overflow: scroll;
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
