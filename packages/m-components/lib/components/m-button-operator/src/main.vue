<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-11-02 13:04:21
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-button-operator\src\main.vue
-->
<template>
  <div class="buttons-opeation" :style="boxStyle">
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
  name: 'MButtonOperator',
  inject: {
    mLayoutTable: { default: null },
    mListCtrl: { default: null },
    mTableCtrl: { default: null },
    mFormCtrl: { default: null },
    mFormDialogCtrl: { default: null }
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    btns: {
      type: Array,
      default: () => []
    },
    boxStyle: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async click(item) {
      try {
        const { mLayoutTable, mListCtrl, mTableCtrl, mFormCtrl, mFormDialogCtrl, row } = this;
        await item.code.call(this, {
          injectData: { mLayoutTable, mListCtrl, mTableCtrl, mFormCtrl, mFormDialogCtrl },
          row
        });
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
  padding: 0;

  ::v-deep {
    .el-button {
      height: fit-content;
    }
  }
}
</style>
