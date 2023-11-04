<!--
 * @Date: 2023-03-17 14:10:44
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-11-04 22:59:31
 * @FilePath: /m-components/src/App.vue
-->
<template>
  <div id="app">
    <el-tabs tab-position="left" v-model="activeName" class="tabs">
      <el-tab-pane label="BasicExample" name="BasicExample">
        <BasicExample />
      </el-tab-pane>
      <el-tab-pane label="JsConfigExample" name="JsConfigExample">
        <JsConfigExample />
      </el-tab-pane>
      <el-tab-pane label="JsonConfigExample" name="JsonConfigExample">
        <JsonConfigExample />
      </el-tab-pane>
      <el-tab-pane label="SetConfigExample" name="SetConfigExample">
        <SetConfigExample />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasicExample from './views/BasicExample/index';
import JsConfigExample from './views/JsConfigExample/index';
import JsonConfigExample from './views/JsonConfigExample/index';
import SetConfigExample from './views/SetConfigExample';

export default {
  name: 'App',
  components: {
    BasicExample,
    JsConfigExample,
    JsonConfigExample,
    SetConfigExample
  },
  data() {
    return {
      activeName: 'SetConfigExample'
    };
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
