<!--
 * @Date: 2023-11-05 22:26:36
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-11-05 23:27:59
 * @FilePath: /zs-ui-vue2/packages/m-components/src/components/Layout.vue
-->
<template>
  <div class="tac">
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-submenu index="tableLayout">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">tableLayout</span>
        </template>
        <el-menu-item index="/tableLayout/basicExample">basicExample</el-menu-item>
        <el-menu-item index="/tableLayout/jsConfigExample">jsConfigExample</el-menu-item>
        <el-menu-item index="/tableLayout/setConfigExample">setConfigExample</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.tac {
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
}
.tac .content {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
}
</style>
