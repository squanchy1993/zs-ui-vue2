<!--
 * @Date: 2023-03-17 14:10:44
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-08-13 20:24:32
 * @FilePath: /zs-ui-vue2/packages/m-components/src/views/config/tables/list.vue
-->
<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column align="right" label="table_list_config" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-link size="mini">{{ scope.row.table_json || '设置搜索' }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="right" label="search_form_config" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-link size="mini">{{ scope.row.search_form_json || '设置搜索' }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <el-button @click="createList">创建</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editTableCellConfig(scope.row)">edit table config</el-button>
          <el-button size="mini" type="primary" @click="editSearchFormConfig(scope.row)">edit search form
            config</el-button>
          <el-button size="mini" type="danger" @click="deleteList(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑列表列 -->
    <TableCellDialog ref="TableCellDialog" />
    <SearchFormDialog ref="SearchFormDialog" />
  </div>
</template>

<script>
import { createTable, deleteTable, getTableList } from '../../../api';
import TableCellDialog from './TableCellDialog.vue';
import SearchFormDialog from './SearchFormDialog.vue';

export default {
  name: 'App',
  components: {
    TableCellDialog,
    SearchFormDialog
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
    async getList() {
      this.list = (await getTableList()).data.list;
    },
    createList() {
      createTable({
        table_json: '',
        search_form_json: ''
      });
      this.getList();
    },

    async deleteList(id) {
      try {
        await deleteTable(id);
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    async editSearchFormConfig(data) {
      try {
        await this.$refs.SearchFormDialog.open({ type: 'edit', data });
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    async editTableCellConfig(data) {
      try {
        await this.$refs.TableCellDialog.open({ type: 'edit', data });
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
