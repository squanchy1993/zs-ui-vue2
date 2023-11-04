<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-10-24 16:37:37
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-table\m-table-field-button\src\main.vue
-->
<template>
  <div class="buttons-opeation">
    <el-button
      v-for="(item, index) in btns"
      :key="index"
      v-bind="item.option"
      @click="click(item)"
      >{{ item.name }}</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'MTableFieldButton',
  inject: {
    pageInstance: { default: null },
    mListController: { default: null },
    mTableGenerator: { default: null }
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    btns: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async click(item) {
      try {
        // eslint-disable-next-line no-eval
        const func = eval(item.code);
        const { pageInstance, mListController, mTableGenerator, row } = this;
        await func({ injectData: { pageInstance, mListController, mTableGenerator }, row });
      } catch (error) {
        console.error(error);
        this.$confirm(`${error}`, `列表按钮代码执行失败 详情请查看控制台`, { type: 'warning' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.buttons-opeation {
  width: 100%;
  display: flex;
  padding: 5px 0;

  ::v-deep {
    .el-button {
      height: fit-content;
    }
  }
}
</style>
