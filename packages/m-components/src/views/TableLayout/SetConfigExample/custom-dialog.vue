<!--
 * @Date: 2023-11-21 14:27:08
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-11-26 18:25:21
 * @FilePath: /m-components/src/views/TableLayout/SetConfigExample/custom-dialog.vue
-->

<template>
  <el-dialog title="提示" :visible.sync="dialogController.visible" width="80%">
    <el-form ref="form" :model="dialogController.formData" label-width="0">
      <el-tabs v-model="activeName">
        <el-tab-pane label="listConfig" name="listConfig">
          <el-form-item prop="listConfig" :rules="[{ validator: validateCode, trigger: 'change' }]">
            <el-scrollbar class="scroll-content">
              <MCodeInput v-model="dialogController.formData.listConfig" />
            </el-scrollbar>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="searchFormConfig" name="searchFormConfig">
          <el-form-item
            prop="searchFormConfig"
            :rules="[{ validator: validateCode, trigger: 'change' }]"
          >
            <el-scrollbar class="scroll-content">
              <MCodeInput v-model="dialogController.formData.searchFormConfig" />
            </el-scrollbar>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="tableConfig" name="tableConfig">
          <el-form-item
            prop="tableConfig"
            :rules="[{ validator: validateCode, trigger: 'change' }]"
          >
            <el-scrollbar class="scroll-content">
              <MCodeInput v-model="dialogController.formData.tableConfig" />
            </el-scrollbar>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="dialogConfig" name="dialogConfig">
          <el-form-item
            prop="dialogConfig"
            :rules="[{ validator: validateCode, trigger: 'change' }]"
          >
            <el-scrollbar class="scroll-content">
              <MCodeInput v-model="dialogController.formData.dialogConfig" />
            </el-scrollbar>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogController.close()">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { MController, MCodeInput } from '@m-components/index';
import { stringify, parse } from '@m-components/components/m-utils';
import { updateConfig } from '@/api';

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
      clearValidate: async () => this.$refs.form?.clearValidate(),
      validate: async () => this.$refs.form?.validate()
    });
  },
  methods: {
    async open({ tag, data }) {
      const params = Object.entries(data).reduce((state, [key, value]) => {
        state[key] = parse(value);
        return state;
      }, {});
      return this.dialogController.open({ tag, data: params });
    },
    async submit() {
      try {
        await this.dialogController.validate();
        const { formData, originData } = this.dialogController;

        // submit data
        let params = Object.entries(formData).reduce((state, [key, value]) => {
          state[key] = stringify(value);
          return state;
        }, {});

        const { id } = originData;
        const res = await updateConfig({ ...params, id });
        this.dialogController.openResolve(res);
        this.dialogController.clear();
      } catch (error) {
        console.error('saveRow', error);
      }
    },
    validateCode(rule, value, callback) {
      const { field } = rule;
      if (!this.dialogController.formData[field]) {
        callback(new Error('must input code'));
      } else {
        callback();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.scroll-content {
  height: 50vh;
}
</style>
