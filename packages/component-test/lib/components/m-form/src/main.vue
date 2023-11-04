<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-03-26 18:40:23
 * @FilePath: /m-components/lib/components/m-form/src/main.vue
-->
<template>
  <div class="m-form"><slot /></div>
</template>
<script>
export default {
  name: 'MForm',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    initialFormData: {
      type: Object,
      default: () => {
        return null;
      }
    },
    disabled: {
      type: Boolean,
      default: null
    },
    size: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      formItems: [],
      formDataStashed: {}
    };
  },
  watch: {
    initialFormData: {
      handler: function(value) {
        if (!value) return;
        this.formDataStashed = JSON.parse(JSON.stringify(this.initialFormData));
      }
    }
  },
  created() {
    this.formDataStashed = JSON.parse(JSON.stringify(this.initialFormData || this.formData));
  },
  provide() {
    return {
      elForm: this,
      mForm: this
    };
  },
  methods: {
    // For add or remove FormItem-instance provide the method to FormItem
    formItemRemoveOrAdd(instance) {
      if (!this.formItems.includes(instance)) {
        this.formItems.push(instance);
      } else {
        this.formItems.splice(this.formItems.indexOf(instance), 1);
      }
    },

    // execute form-item validate methods
    async validate() {
      const validateArray = [];
      for (const formItem of this.formItems) {
        validateArray.push(formItem.validate());
      }
      await Promise.all(validateArray);
      return this.formData;
    },

    // reset
    // may need requet orgin to reset so use promise
    async resetField() {
      const resetArray = [];
      for (const formItem of this.formItems) {
        resetArray.push(formItem.resetField());
      }
      return Promise.all(resetArray);
    }
  }
};
</script>

<style lang="scss" scoped>
.m-form {
  display: flex;
  flex-wrap: wrap;
  justify-items: flex-start;
  width: 100%;
}
</style>