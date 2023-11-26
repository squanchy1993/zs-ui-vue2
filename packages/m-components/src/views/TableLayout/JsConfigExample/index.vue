<!--
 * @Date: 2023-07-15 16:16:17
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-26 20:52:59
 * @FilePath: /m-components/src/views/TableLayout/JsConfigExample/index.vue
-->
<template>
  <MList v-bind="listConfig">
    <template #search="{ searchParams, handleSearch, getList }">
      <MFormGenerator :form-data="searchParams" :config="searchFormConfig">
        <!-- elemOptions.type = 'slot' -->
        <template #btn1>
          <div>
            <el-button @click="handleSearch">搜索</el-button>
            <el-button @click="getList">slot 刷新</el-button>
          </div>
        </template>

        <!-- or elemOptions.type ='scopedSlot' -->
        <template #btn2="{ props, injectData: { mListCtrl } }">
          <el-button @click="mListCtrl.getList">soltScope 刷新</el-button>
        </template>
      </MFormGenerator>
    </template>
    <template #table="{ list }">
      <MTableGenerator :config="tableConfig" :list="list" />
    </template>
    <template #pagination="{ handlePageOrSizeChange, pageParams, total }">
      <el-pagination
        :page-size="pageParams.pageSize"
        :current-page="pageParams.pageIndex"
        :total="total"
        :page-sizes="[10, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="(pageSize) => handlePageOrSizeChange({ pageSize })"
        @current-change="(pageIndex) => handlePageOrSizeChange({ pageIndex })"
      />
    </template>
    <MPopupGenerator
      v-for="({ mPopoupConfig, mFormGeneratorConfig }, key, i) in dialogConfig"
      :ref="setDialogRef(key)"
      :key="i"
      :config="mPopoupConfig"
    >
      <MFormGenerator :config="mFormGeneratorConfig" />
    </MPopupGenerator>
  </MList>
</template>

<script>
import { MList, MTableGenerator, MFormGenerator, MPopupGenerator } from '@m-components/index';

import { getLayoutConfig } from './config.js';

export default {
  provide() {
    return {
      mLayoutTable: this
    };
  },
  components: {
    MList,
    MTableGenerator,
    MFormGenerator,
    MPopupGenerator
  },
  data() {
    return {
      listConfig: {},
      searchFormConfig: {},
      tableConfig: {},
      dialogConfig: {},
      dialogs: {}
    };
  },
  created() {
    const layoutConfig = getLayoutConfig.apply(this);
    this.setupTableLayout(layoutConfig);
  },
  methods: {
    setupTableLayout({ listConfig, searchFormConfig, tableConfig, dialogConfig }) {
      // set list
      if (listConfig) {
        this.listConfig = listConfig;
      }

      // set searchForm
      if (searchFormConfig) {
        this.searchFormConfig = searchFormConfig;
      }

      // set table
      if (tableConfig) {
        this.tableConfig = tableConfig;
      }

      // set dialog
      if (dialogConfig) {
        this.dialogConfig = Object.entries(dialogConfig).reduce((state, [k, v]) => {
          state[k] = v;
          return state;
        }, {});
      }
    },

    setDialogRef(k) {
      this.$nextTick(() => {
        this.dialogs[k] = this.$refs[k][0];
      });
      return k;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  &__search {
    height: 100px;
    width: 100%;
    background: rgb(208, 206, 206);
  }

  &__list {
    flex: 1;
    overflow: hidden;
  }

  &__paging {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(194, 194, 193);
  }
}
</style>
