<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-13 21:36:58
 * @FilePath: /zs-ui-vue2/packages/m-components/lib/components/m-table/m-table-generator/src/main.vue
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
      v-for="(item, index) of tableController.fields"
      :key="index"
      v-bind="item.props"
    >
      <template slot-scope="{ row }">
        <div class="m-table-item">
          <div class="m-table-item__delete" @click="$emit('deleteItem', { field: item, index })">
            <i class="el-icon-delete" />
          </div>
          <div class="m-table-item__edit" @click="$emit('editItem', { field: item, index })">
            <i class="el-icon-edit" />
          </div>
          <MDynamicElem :config="item.elemOptions" :data="row" :propKey="item.props.prop" />
        </div>
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
          console.log('m-table-config')
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
  },
  methods: {}
};
</script>

<style scoped lang="scss">
    .m-table-item {
      position: relative;
      &__delete {
        position: absolute;
        right: 0;
        top: 0;
        width: 12px;
        height: 12px;
        font-size: 8px;
        line-height: 12px;
        overflow: hidden;
        background-color: #f56c6c;
        color: #fff;
        display: none;
      }

      &__edit {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        font-size: 8px;
        line-height: 12px;
        overflow: hidden;
        background-color: #409eff;
        color: #fff;
        display: none;
      }
    }
</style>
