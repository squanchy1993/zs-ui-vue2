<!--
 * @Date: 2023-11-21 14:27:08
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-21 15:47:17
 * @FilePath: \m-components\src\views\TableLayout\SetConfigExample\custom-dialog.vue
-->

<template>
  <el-dialog title="提示" :visible.sync="dialogController.visible" width="60%">
    <el-form ref="form" :model="dialogController.formData" label-width="80px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="listConfig" name="listConfig">
          <el-form-item label="listConfig">
            <MCodeInput v-model="dialogController.formData.listConfig" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="searchFormConfig" name="searchFormConfig">
          <el-form-item label="searchFormConfig">
            <el-input v-model="dialogController.formData.searchFormConfig" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="tableConfig" name="tableConfig">
          <el-form-item label="tableConfig">
            <el-input v-model="dialogController.formData.tableConfig" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="dialogConfig" name="dialogConfig">
          <el-form-item label="dialogConfig">
            <el-input v-model="dialogController.formData.dialogConfig" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="() => dialogController.close()">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { MController, MCodeInput } from '@m-components/index';
const { DialogController } = MController;
export default {
  name: 'CustomDialog',
  components: {
    MCodeInput
  },
  data() {
    return {
      dialogController: new DialogController({}),
      activeName: 'listConfig'
    };
  },
  created() {
    this.dialogController.setOptions({
      formDataDefault: {
        listConfig: null,
        searchFormConfig: null,
        tableConfig: null,
        dialogConfig: null
      },
      clearValidate: () => {},
      validate: () => {}
    });
  },
  methods: {
    open(data) {
      this.dialogController.open(data);
    }
  }
};
</script>
