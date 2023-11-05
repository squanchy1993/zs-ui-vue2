<!--
 * @Date: 2023-03-17 14:10:44
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-11-05 22:28:12
 * @FilePath: /zs-ui-vue2/packages/m-components/src/App.vue
-->
<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from './components/Layout.vue';
export default {
  name: 'App',
  components: {
    Layout
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style>
body {
  margin: 0;
}
</style>

<style lang="scss" scoped>
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

::v-deep {
  .tabs.el-tabs {
    height: 100vh;
    width: 100vw;
    display: flex;

    .el-tabs__content {
      flex: 1;
      height: 100%;

      .el-tab-pane {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
