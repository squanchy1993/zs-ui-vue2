<!--
 * @Date: 2023-03-17 14:10:44
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-08-06 19:53:23
 * @FilePath: /zs-ui-vue2/packages/m-components/src/views/config/forms/list.vue
-->
<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="form_json" prop="form_json" show-overflow-tooltip />

      <el-table-column align="right">
        <template slot="header">
          <el-button @click="open">创建</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="EditPresentationOption(scope.row)">eidt</el-button>
        </template>
      </el-table-column>
    </el-table>

    <FormDialog ref="FormDialog" />
  </div>
</template>

<script>
import { deleteForm, getFormList } from '../../../api';
import FormDialog from './FormDialog';

export default {
  name: 'App',
  components: {
    FormDialog
  },
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async open() {
      try {
        await this.$refs.FormDialog.open({});
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    async getList() {
      this.list = (await getFormList()).data.list;
    },

    async deleteList(id) {
      try {
        await deleteForm(id);
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    async EditPresentationOption(data) {
      try {
        await this.$refs.FormDialog.open({ type: 'edit', data });
        this.getList();
      } catch (error) {
        console.log(error);
      }
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
