<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy squanchy@yeah.net
 * @LastEditTime: 2023-08-13 20:37:06
 * @FilePath: /zs-ui-vue2/packages/m-components/src/views/config/forms/FormDialog.vue
-->
<template>
  <div class="form-design">
    <el-dialog
      fullscreen
      title="提示"
      :visible.sync="visible"
      :before-close="handleClose"
      destroy-on-close
    >
      <el-tabs v-if="visible" v-model="activeName" type="card" class="formInstance-tabs">
        <el-tab-pane label="formOptions" name="formOptions">
          <MFormDesigner
            v-if="formInstance"
            ref="formDesigner"
            :formOption.sync="formInstance.formOption"
          />
        </el-tab-pane>
        <el-tab-pane class="otherSetting" label="otherSetting" name="otherSetting">
          <el-descriptions class="margin-top" title="其他设置" :column="1" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                弹框按钮
              </template>
              <MFormFieldButton
                class="formButtons"
                v-if="formInstance"
                v-model="formInstance.formBtns"
              >
              </MFormFieldButton>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                弹框标签
              </template>
              <MFormFieldTag v-model="formInstance.formFlags" />
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                弹框类型
              </template>
              <el-select
                v-model="formInstance.windowOption.element"
                size="mini"
                placeholder="choose form's presentation"
              >
                <el-option label="el-dialog" value="el-dialog" />
                <el-option label="el-drawer" value="el-drawer" />
              </el-select>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                弹框属性
              </template>
              <MFormGenerator
                ref="form"
                v-if="containerOptions"
                class="MFormGenerator"
                :form-option.sync="containerOptions"
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button style="width: 100%" type="primary" @click="save">确 定1</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  MFormDesigner,
  MFormFieldButton,
  MFormFieldTag,
  // FormOption,
  // getItemForm,
  MFormGenerator,
  FormInstance
} from '../../../../lib/index';
import { updateForm } from '../../../api';
export default {
  name: 'BtnPopover',
  components: {
    MFormDesigner,
    MFormFieldButton,
    MFormFieldTag,
    MFormGenerator
  },
  data() {
    return {
      visible: false,
      formInstance: null,
      type: null,
      originData: null,
      resolve: null,
      reject: null,
      activeName: 'formOptions',
      containerOptions: null
    };
  },
  created() {
    // 设置默认按钮
    this.formInstance = new FormInstance({});
  },
  methods: {
    open({ type = 'create', data = {}}) {
      return new Promise((resolve, reject) => {
        if (data?.form_json) {
          const initData = JSON.parse(data.form_json);
          console.log('initData>>>>>', initData)
          this.formInstance.setOption(initData);
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
      this.formInstance = new FormInstance({});
      this.containerOptions = null;

      // 其他
      this.type = null;
      this.originData = null;
      this.resolve = null;
      this.reject = null;
      this.visible = false;
    },

    async save() {
      const data = this.formInstance.exportJson();
      this.originData['form_json'] = data;
      const res = await updateForm(this.originData);
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

      .formInstance-tabs.el-tabs {
        height: 100%;
        display: flex;
        flex-direction: column;

        .el-tabs__content {
          flex: 1;

          .el-tab-pane {
            height: 100%;
            overflow-y: hidden;
            overflow-x: hidden;
          }
        }
      }
    }
  }
}

.otherSetting {
  .formButtons {
    display: flex;
    flex-wrap: wrap;

    ::v-deep {
      .m-form-designer-popover {
        margin-right: 5px;
      }

      .el-input {
        max-width: 100px;
      }
    }
  }
}
</style>
