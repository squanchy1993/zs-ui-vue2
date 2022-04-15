<template>
  <div id="app">
   <MForm />
  </div>
</template>

<script>
import MForm from './components/m-form/index.vue'

export default {
  name: 'App',
  components: {
    MForm,
    // MPageList
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
  margin-top: 60px;
}
</style>
