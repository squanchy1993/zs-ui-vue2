<!--
 * @Date: 2023-11-02 19:26:05
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-11-05 23:05:56
 * @FilePath: /zs-ui-vue2/packages/m-components/src/views/TableLayout/JsonConfigExample/index.vue
-->
<template>
  <MLayoutTable v-bind="tableConfig"></MLayoutTable>
</template>

<script>
import { MLayoutTable } from '@m-components/index';
import { getConfig } from '@/api';

export default {
  components: {
    MLayoutTable
  },
  data() {
    return {
      tableConfig: {}
    };
  },
  created() {
    this.getPageConfig();
  },
  methods: {
    async getPageConfig() {
      const { id } = this.$route.params;
      this.tableConfig = (await getConfig(Number(id))).data
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
