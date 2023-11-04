<!--
 * @Author: your name
 * @Date: 2021-06-15 11:12:27
 * @LastEditTime: 2023-11-02 10:33:17
 * @LastEditors: squanchy squanchy@yeah.net
 * @Description: type 的设置 可以写在一个组件里面，可以单独拉出来，看你这个组件复杂不，复杂的话一个模块一个type
 * @FilePath: \zs-ui-vue2\packages\m-components\lib\components\m-form\m-form-generator\src\mian.vue
-->
<template>
  <div class="m-form-generator">
    <el-form v-if="formController" :model="formController.formData" v-bind="formController.props">
      <div class="m-form-generator__inner" :style="formController.boxStyle">
        <MFormField
          v-for="(field, index) of formController.fields"
          :key="index"
          :form-fields="field"
          :form-data.sync="formController.formData"
          :resetFields="formController.resetFields"
        >
          <template v-if="field.elemOptions.type == 'slot'" v-slot:[field.elemOptions.elem]>
            <slot :name="field.elemOptions.elem" />
          </template>
        </MFormField>
      </div>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
import { MFormField } from '@m-components/components/m-form/m-form-field';
import MFormController from './MFormController';
export default {
  name: 'MFormGenerator',
  provide() {
    return {
      mFormCtrl: this.formController
    };
  },
  components: {
    MFormField
  },
  props: {
    controller: {
      type: MFormController,
      default: null,
      required: false
    },
    config: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  watch: {
    // tips:
    // when controller were send from out side, if use watch use deep property and excut setOptions it will triger watch
    controller: {
      handler: function (controller) {
        if (controller && controller !== this.formController) {
          this.formController = null;
          this.$nextTick(() => {
            this.formController = controller;
            this.formController.setOptions({ componentInstance: this });
          });
        }
      }
    },
    config: {
      handler: function (config) {
        if (config) {
          this.formController.setOptions(config);
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    // tips: uauslly data gos early than watch, but if watch had immediate property it will reverse.
    const formController = this.controller ? this.controller : new MFormController();
    formController.setOptions({ componentInstance: this });
    return {
      formController
    };
  },
  methods: {
    startup(data) {
      this.formController.startup(data);
    },
    clear() {
      this.formController.clear();
    }
  }
};
</script>

<style lang="scss" scoped>
.m-form-generator {
  width: 100%;

  &__inner {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
