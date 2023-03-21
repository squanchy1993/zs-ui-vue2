<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-03-21 18:47:53
 * @FilePath: \m-components\lib\m-form\src\main.vue
-->
<template>
  <div><slot /></div>
</template>
<script>
export default {
  props: {
    mFormItemModels: {
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
  provide() {
    return {
      formData: this.formData
    };
  },
  computed: {},
  methods: {
    // 检查表单
    async validate() {
      for (const formItem of this.mFormItemModels) {
        await formItem.instance.validate()
      }
    },

    valueChange(e) {
      // const data = e.detail;
      // this.data.componentFormData[data.prop] = data.value;
      // this.triggerEvent('valueChange', this.data.componentFormData);
    },

    // 提交事件
    async submit() {
      await this.validate();
      return this.formData
      // return this.data.componentFormData;
    }
  }
};
</script>

