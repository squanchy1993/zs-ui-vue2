<!--
 * @Date: 2023-03-17 12:44:19
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-03-17 13:16:26
 * @FilePath: \m-directives\src\App.vue
-->
<template>
  <div id="app">
    <button
      v-longPress="{delay:1000 ,interval: 1000 }"
      class="el-icon-arrow-up"
      button
      @longPressStart="()=> longPressStart()"
      @longPressEnd="()=> longPressEnd()"
      @longPressInterval="()=> longPressInterval()"
    >longPress</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    longPressStart() {
      console.log('longPressStart')
    },
    longPressEnd() {
      console.log('longPressEnd')
    },
    longPressInterval() {
      console.log('longPressInterval')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
