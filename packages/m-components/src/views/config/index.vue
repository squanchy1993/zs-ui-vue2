<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="tables" name="tables"><Tables /></el-tab-pane>
    <el-tab-pane label="forms" name="forms"><Forms /></el-tab-pane>
  </el-tabs>
</template>
<script>
import Tables from './tables/list.vue';
import Forms from './forms/list.vue';

export default {
  components: {
    Tables,
    Forms
  },
  data() {
    return {
      activeName: 'tables'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
