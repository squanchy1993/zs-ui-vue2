<!--
 * @Date: 2023-07-15 16:16:17
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-26 19:56:57
 * @FilePath: /m-components/lib/components/m-layout-table/src/main.vue
-->
<template>
  <MList v-bind="parsedData.listConfig">
    <template #search="scoped">
      <MFormGenerator v-model="scoped.searchParams" :config="parsedData.searchFormConfig" />
    </template>
    <template #table="{ list }">
      <MTableGenerator :config="parsedData.tableConfig" :list="list" />
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
      v-for="(mPopoupConfig, i) in parsedData.dialogConfig"
      :ref="setDialogRef(mPopoupConfig.key)"
      :key="i"
      :config="mPopoupConfig"
    />
  </MList>
</template>

<script>
import { MList } from '../../m-list/index';
import { MTableGenerator } from '../../m-table/m-table-generator/index';
import { MFormGenerator } from '../../m-form/m-form-generator/index';
import { MPopupGenerator } from '../../m-popup/m-popup-generator';
import { parse } from '../../m-utils/index';

export default {
  name: 'MLayoutTable',
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
  props: {
    listConfig: {
      type: [String, Object]
    },
    searchFormConfig: {
      type: [String, Object]
    },
    tableConfig: {
      type: [String, Object]
    },
    dialogConfig: {
      type: [String, Object]
    }
  },
  data() {
    return {
      parsedData: {
        listConfig: {},
        searchFormConfig: {},
        tableConfig: {},
        dialogConfig: {}
      },
      dialogs: {}
    };
  },
  watch: {
    listConfig: {
      handler: function (listConfig) {
        if (listConfig) {
          if (typeof listConfig === 'string') {
            this.parsedData.listConfig = parse(listConfig);
          } else if (listConfig instanceof Object) {
            this.parsedData.listConfig = listConfig;
          }

          this.$nextTick(() => {
            this.parsedData.listConfig.loadList = true;
          });
        }
      },
      immediate: true
    },
    searchFormConfig: {
      handler: function (searchFormConfig) {
        if (searchFormConfig) {
          if (typeof searchFormConfig === 'string') {
            this.parsedData.searchFormConfig = parse(searchFormConfig);
          } else if (searchFormConfig instanceof Object) {
            this.parsedData.searchFormConfig = searchFormConfig;
          }
        }
      },
      immediate: true
    },
    tableConfig: {
      handler: function (tableConfig) {
        if (tableConfig) {
          if (typeof tableConfig === 'string') {
            this.parsedData.tableConfig = parse(tableConfig);
          } else if (tableConfig instanceof Object) {
            this.parsedData.tableConfig = tableConfig;
          }
        }
      },
      immediate: true
    },
    dialogConfig: {
      handler: function (dialogConfig) {
        if (dialogConfig) {
          if (typeof dialogConfig === 'string') {
            this.parsedData.dialogConfig = parse(dialogConfig);
          } else if (dialogConfig instanceof Array) {
            this.parsedData.dialogConfig = dialogConfig;
          }
        }
      },
      immediate: true
    }
  },
  methods: {
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
