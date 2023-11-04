<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-11-01 15:10:41
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-table\m-table-generator\src\main.vue
-->
<template>
  <el-table
    :data="tableController.list"
    style="width: 100%"
    v-bind="tableController.props"
    height="100%"
  >
    <el-table-column
      v-for="(tableFieldItem, index) of tableController.fields"
      :key="index"
      v-bind="tableFieldItem.props"
    >
      <template slot-scope="{ row }">
        <m-table-field :row="row" :mTableFieldOption="tableController.fields[index]" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { MTableField } from '../../m-table-field';
import MTableController from './MTableController';
export default {
  name: 'MTableGenerator',
  provide() {
    return {
      mTableCtrl: this.tableController
    };
  },
  components: {
    MTableField
  },
  props: {
    controller: {
      type: MTableController,
      required: false
    },
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    controller: {
      handler: function (controller) {
        if (controller && controller !== this.tableController) {
          this.tableController = null;
          this.$nextTick(() => {
            this.tableController = controller;
            this.tableController.setOptions({ componentInstance: this });
          });
        }
      }
    },
    config: {
      handler: function (config) {
        if (config) {
          this.tableController.setOptions(config);
        }
      },
      immediate: true,
      deep: true
    },
    list: {
      handler: function (list) {
        this.tableController.setOptions({ list });
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    const tableController = this.controller ? this.controller : new MTableController();
    tableController.setOptions({ componentInstance: this });
    return {
      tableController
    };
  }
};
</script>

<style lang="scss" scoped></style>
