<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-07-22 22:34:42
 * @FilePath: /zs-ui-vue2/packages/m-components/src/views/config/tables/TableCellDialog.vue
-->
<template>
  <div class="form-design">
    <el-dialog fullscreen title="列表列编辑" :visible.sync="visible" :before-close="handleClose">
      <!-- <el-scrollbar class="scrollInner"> -->
      <MTableDesignerCell ref="MTableDesignerCell" :tableOption.sync="tableInstance.tableOption" />
      <!-- </el-scrollbar> -->

      <span slot="footer" class="dialog-footer">
        <el-button style="width: 100%" type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { MTableDesignerCell, TableInstance } from '../../../../lib/index';
import { updateTable } from '../../../api';
export default {
  name: 'TableCellDialog',
  components: {
    MTableDesignerCell
  },
  data() {
    return {
      visible: false,
      tableInstance: null,
      type: null,
      originData: null,
      resolve: null,
      reject: null
    };
  },
  created() {
    this.tableInstance = new TableInstance({});
  },
  methods: {
    open({ type = 'create', data = null }) {
      return new Promise((resolve, reject) => {
        if (data?.table_json) {
          const initData = JSON.parse(data.table_json);
          this.tableInstance.setOption(initData);
        }
        this.originData = data;
        this.type = type;
        this.visible = true;
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    async handleClose() {
      this.reject('dialog close');
      this.reset();
    },

    reset() {
      // 调用清空 clear
      this.tableInstance = new TableInstance({});

      // 其他
      this.type = null;
      this.originData = null;
      this.resolve = null;
      this.reject = null;
      this.visible = false;
    },

    async save() {
      const data = this.tableInstance.exportJson();
      this.originData['table_json'] = data;
      const res = await updateTable(this.originData);
      this.resolve(res);
      this.$message.success('操作成功');
      this.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.scrollInner {
  height: 100%;
}

::v-deep {
  .el-dialog {
    width: 100vw !important;
    height: 100vh !important;
    display: flex;
    flex-direction: column;

    .el-dialog__body {
      flex: 1;
      height: 100%;
      padding: 0;
      overflow: scroll;
    }
  }
}
</style>
