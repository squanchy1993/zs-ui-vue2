<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-03-31 16:55:35
 * @FilePath: \m-components\src\m-form-button\BtnPopover.vue
-->
<template>
  <div>
    <el-dialog :visible="visible" placement="top" width="90%">
      <el-form
        v-if="visible"
        ref="ruleForm"
        :rules="rules"
        :model="componentValue"
        status-icon
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="label">
          <el-input
            v-model="componentValue['label']"
            type="text"
            placeholder="label not allow empty"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="fun">
          <el-input
            v-model="componentValue['fun']"
            type="textarea"
            placeholder="fun not allow empty"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="cancel">取消</el-button>
        <el-button size="mini" type="text" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const defaultVal = {
  label: null,
  fun: null
};
export default {
  data() {
    return {
      componentValue: {},
      visible: false,
      rules: {
        label: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        fun: [{ required: true, message: '请输入方法', trigger: 'blur' }]
      }
    };
  },
  methods: {
    openDailog(originFormData) {
      return new Promise((resolve, reject) => {
        this.componentValue = JSON.parse(JSON.stringify(originFormData || defaultVal))
        this.resolve = resolve
        this.reject = reject
        this.visible = true
      })
    },

    submit() {
      this.$refs.ruleForm.validate().then((res) => {
        this.resolve(JSON.parse(JSON.stringify(this.componentValue)))
        this.close()
      }).catch(err => {
        this.reject(err)
      });
    },

    cancel() {
      this.close()
      this.reject()
    },

    close() {
      this.visible = false;
      this.componentValue = JSON.parse(JSON.stringify(defaultVal))
    }
  }
};
</script>

  <style lang="scss" scoped>
</style>