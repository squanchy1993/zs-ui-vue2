<!--
 * @Date: 2023-03-17 14:10:44
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-03-21 19:23:46
 * @FilePath: \m-components\src\App.vue
-->
<template>
  <div id="app">
    <div style="width: 300px;">
      <MForm ref="form" :m-form-item-models="MFormItemModels" :form-data="formData">
        <MFormItem :m-form-item-model="MFormItemModels[0]">
          <input style="width: 100%; box-sizing: border-box;" type="text">
        </MFormItem>
        <MFormItem :m-form-item-model="MFormItemModels[1]">
          <input style="width: 100%; box-sizing: border-box;" type="text">
        </MFormItem>
      </MForm>
    </div>
    <button @click="submit">submit</button>
  </div>
</template>

<script>
import { MForm, MFormItem, MFormItemModel } from '../lib/index';

export default {
  name: 'App',
  components: {
    MForm,
    MFormItem
  },
  data() {
    return {
      formData: {
        name: ''
      },
      MFormItemModels: [
        new MFormItemModel({
          prop: 'name',
          label: 'name'
        }),
        new MFormItemModel({
          prop: 'title',
          label: 'title'
        })
      ]
    };
  },
  methods: {
    submit() {
      this.$refs.form.submit().then((res) => [console.log('res>>>>>>>>>>>', res)]);
    }
  }
};
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
