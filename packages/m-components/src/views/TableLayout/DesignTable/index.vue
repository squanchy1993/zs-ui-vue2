<!--
 * @Date: 2023-07-15 16:16:17
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-20 18:58:10
 * @FilePath: \m-components\src\views\TableLayout\DesignTable\index.vue
-->
<template>
  <MDesign :value="tableConfig" @save="save" />
</template>

<script>
import { MDesign } from '@m-components/index';
import { getConfig, updateConfig } from '@/api';
export default {
  components: {
    MDesign
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
      const { id } = this.$route.query;
      this.tableConfig = (await getConfig(Number(id))).data;
    },
    async save(e) {
      console.log(e);
      await updateConfig(e);
      this.$message.success('保存成功！');
      const { refresh } = this.$route.params;
      refresh();
      this.$router.back();
    }
  }
};
</script>
