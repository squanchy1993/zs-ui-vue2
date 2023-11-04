<!--
 * @Date: 2023-05-26 14:06:39
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-08-06 14:18:37
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-form/m-form-generator/src/form-operation-buttons/src/mian.vue
-->
<template>
  <div class="m-form-opreation-button">
    <el-button
      v-show="item.isShowItem.includes(presentationOption.formFlag)"
      @click="click(item)"
      :key="index"
      v-for="(item, index) in presentationOption.formBtns"
      >{{ item.name }}</el-button
    >
  </div>
</template>

<script>
/* eslint-disable */
export default {
  provide() {
    return {
      mFormGenerator: this
    };
  },
  name: 'MFormOpreationButton',
  props: {
    presentationOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    click(item) {
      console.log(this.presentationOption.formFlag);
      try {
        eval(item.code);
      } catch (error) {
        console.error(error);
        this.$confirm(`${error}`, `表单 按钮代码执行失败 详情请查看控制台`, { type: 'warning' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m-form-opreation-button {
  width: 100%;
  &__inner {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
