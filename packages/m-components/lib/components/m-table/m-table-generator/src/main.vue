<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-09 19:18:13
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-table\m-table-generator\src\main.vue
-->
<template>
  <el-table
    :data="tableController.list"
    style="width: 100%"
    v-bind="tableController.props"
    v-on="tableController.on"
    height="100%"
  >
    <el-table-column
      v-for="({ props, elemOptions }, index) of tableController.fields"
      :key="index"
      v-bind="props"
    >
      <template slot-scope="{ row }">
        <MDynamicElem  :config="elemOptions" :data="row" :propKey="props.prop" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { MTableController } from './MTableController';
import { MDynamicElem } from '../../../m-dynamic-elem';
export default {
  name: 'MTableGenerator',
  provide() {
    return {
      mTableCtrl: this.tableController
    };
  },
  components: {
    MDynamicElem
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
