<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-03-21 20:03:31
 * @FilePath: \m-components\lib\m-form-item\src\main.vue
-->
<template>
  <div class="m-form-item">
    <div class="m-form-item__content">
      <div class="content__label">
        <span>{{ mFormItemModel.label }}</span>
      </div>
      <div class="content__body">
        <slot />
      </div>
    </div>
    <div class="m-form-item__tips-bottom">
      <span v-if="errorMsg" class="error-msg">{{ errorMsg }}</span>
      <span v-else class="warn-msg">asfdsdf</span>
    </div>
  </div>
</template>
<script>
import MFormItemModel from './model';
export default {
  props: {
    mFormItemModel: {
      type: Object,
      default: () => new MFormItemModel({})
    }
  },
  inject: ['formData'],
  data() {
    return {
      errorMsg: null
    };
  },
  computed: {},
  created() {
    console.log('this.formData', this.formData);
    // 实例赋值
    this.mFormItemModel.instance = this;
  },
  methods: {
    // 检查表单
    async validate() {
      try {
        for (const ruleItem of this.mFormItemModel.rules) {
          await ruleItem.validate(this.formData[this.props], ruleItem.message);
        }
      } catch (error) {
        this.errorMsg = error.message
      }
    }

    // valueChange(e) {
    //   const data = e.detail;
    //   this.data.componentFormData[data.prop] = data.value;
    //   this.triggerEvent('valueChange', this.data.componentFormData);
    // },

    // // 提交事件
    // async submit() {
    //   await this.checkIsVerify();
    //   return this.data.componentFormData;
    // }
  }
};
</script>
<style lang="scss" scoped>
.m-form-item {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  .m-form-item__content {
    width: 100%;
    display: flex;
    .content__label {
      width: 20%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .content__body {
      flex: 1;
    }
  }
  .m-form-item__tips-bottom {
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    padding: 3px 0 3px 20%;
    line-height: 12px;
    height: 12px;
    .error-msg{
      color: red;
    }
    .warn-msg{
      color: #e6a23c;
    }
  }
}
</style>
