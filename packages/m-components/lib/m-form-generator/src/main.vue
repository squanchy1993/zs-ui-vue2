<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-03-21 13:34:38
 * @FilePath: \m-components\lib\m-form\src\main.vue
-->
<template>
  <div>asdfasasdfsdfdf</div>
</template>
<script>
export default {
  props: {
    dynamicItemModels: {
      type: Array,
      default: () => {
        return [];
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      componentFormData: {}
    };
  },
  computed: {},
  methods: {
    // 检查表单
    async checkIsVerify() {
      // eslint-disable-next-line no-useless-catch
      try {
        for (const item of this.data.formItems) {
          const that = this.selectOwnerComponent();
          await that.selectComponent(`#formItem-${item.prop}`).verifed(item.prop);
        }
      } catch (error) {
        throw error;
      }
    },

    valueChange(e) {
      const data = e.detail;
      this.data.componentFormData[data.prop] = data.value;
      this.triggerEvent('valueChange', this.data.componentFormData);
    },

    // 提交事件
    async submit() {
      await this.checkIsVerify();
      return this.data.componentFormData;
    }
  }
};
</script>

